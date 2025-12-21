import * as client from "openid-client";
import { Strategy, type VerifyFunction } from "openid-client/passport";

import passport from "passport";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}

const getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID!
    );
  },
  { maxAge: 3600 * 1000 }
);

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  
  // Create session store with better error handling
  let sessionStore;
  if (process.env.DATABASE_URL) {
    const pgStore = connectPg(session);
    sessionStore = new pgStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true, // Auto-create sessions table
      ttl: sessionTtl,
      tableName: "sessions",
    });
    console.log("[Auth] Using PostgreSQL session store");
  } else {
    // Fallback to memory store for development
    console.log("[Auth] Using memory session store (development)");
    sessionStore = new session.MemoryStore();
  }
  
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: 'none', // Required for iframe/embedded OAuth flows
      maxAge: sessionTtl,
    },
  });
}

function updateUserSession(
  user: any,
  tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers
) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}

async function upsertUser(
  claims: any,
) {
  await storage.upsertUser({
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"],
  });
}

// Helper function to resolve the correct domain for authentication
function resolveDomain(req: any): string {
  const domains = process.env.REPLIT_DOMAINS!.split(",").map(d => d.trim());
  const incomingHost = (req.get("x-forwarded-host") ?? req.hostname).split(",")[0].trim();
  const domain = domains.includes(incomingHost) ? incomingHost : domains[0];
  return domain;
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  const config = await getOidcConfig();

  const verify: VerifyFunction = async (
    tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
    verified: passport.AuthenticateCallback
  ) => {
    const user = {};
    updateUserSession(user, tokens);
    await upsertUser(tokens.claims());
    verified(null, user);
  };

  for (const domain of process.env
    .REPLIT_DOMAINS!.split(",")) {
    const strategy = new Strategy(
      {
        name: `replitauth:${domain}`,
        config,
        scope: "openid email profile offline_access",
        callbackURL: `https://${domain}/api/callback`,
      },
      verify,
    );
    passport.use(strategy);
  }

  passport.serializeUser((user: Express.User, cb) => cb(null, user));
  passport.deserializeUser((user: Express.User, cb) => cb(null, user));

  app.get("/api/login", (req, res, next) => {
    // Redirect to dev login when auth bypass is enabled
    if (process.env.AUTH_BYPASS === "1") {
      return res.redirect("/api/dev-login");
    }
    
    const domain = resolveDomain(req);
    console.log(`[Auth] Login attempt - incoming host: ${req.get("x-forwarded-host") ?? req.hostname}, resolved domain: ${domain}`);
    passport.authenticate(`replitauth:${domain}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"],
    })(req, res, next);
  });

  app.get("/api/callback", (req, res, next) => {
    const domain = resolveDomain(req);
    console.log(`[Auth] Callback attempt - domain: ${domain}, query:`, req.query);
    passport.authenticate(`replitauth:${domain}`, {
      successReturnToOrRedirect: "/",
      failureRedirect: "/api/login",
    })(req, res, next);
  });

  // Development bypass for testing when OIDC provider is blocked
  if (process.env.AUTH_BYPASS === "1") {
    console.log("[Auth] WARNING: Authentication bypass enabled for development");
    app.get("/api/dev-login", (req, res) => {
      // Create a mock user session
      const mockUser = {
        claims: {
          sub: "dev-user-123",
          email: "dev@example.com",
          first_name: "Dev",
          last_name: "User",
          exp: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
        },
        access_token: "dev-token",
        refresh_token: "dev-refresh",
        expires_at: Math.floor(Date.now() / 1000) + 3600
      };
      
      // Create the user in database
      upsertUser(mockUser.claims).then(() => {
        req.login(mockUser, (err) => {
          if (err) {
            console.error("[Auth] Dev login error:", err);
            return res.status(500).send("Dev login failed");
          }
          console.log("[Auth] Dev login successful");
          res.redirect("/");
        });
      }).catch(err => {
        console.error("[Auth] Dev user creation error:", err);
        res.status(500).send("Dev user creation failed");
      });
    });
  }

  app.get("/api/logout", (req, res) => {
    const domain = resolveDomain(req);
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID!,
          post_logout_redirect_uri: `https://${domain}`,
        }).href
      );
    });
  });
}

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const user = req.user as any;

  if (!req.isAuthenticated() || !user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const now = Math.floor(Date.now() / 1000);
  if (now <= user.expires_at) {
    return next();
  }

  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};
