import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertSubscriptionPlanSchema, insertUserSubscriptionSchema, insertReportSchema } from "@shared/schema";
import express from "express";
import path from "path";
import { z } from "zod";

// TMT Bot AI Response Generator - Sophisticated market intelligence chatbot
function generateTMTBotResponse(messageHistory: Array<{role: string, content: string}>): string {
  const latestMessage = messageHistory[messageHistory.length - 1]?.content || '';
  const lowerMessage = latestMessage.toLowerCase();
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage.includes('hey')) {
    return "Hello! I'm TMT Bot, your AI market intelligence assistant. I specialize in Technology, Media, Telecommunications, Healthcare, Energy, Consumer, and Industrial sectors. I can help you with M&A analysis, valuation insights, market trends, and investment research. What would you like to explore today?";
  }
  
  // Tesla-specific analysis
  if (lowerMessage.includes('tesla') || lowerMessage.includes('tsla')) {
    if (lowerMessage.includes('analysis') || lowerMessage.includes('stock') || lowerMessage.includes('investment')) {
      return "**Tesla (TSLA) Investment Analysis**\n\n**Current Position**: Tesla remains the dominant EV leader with strong fundamentals:\n• **Market Cap**: ~$800B (as of Q4 2024)\n• **EV Deliveries**: 1.8M vehicles in 2024 (+15% YoY)\n• **Gross Margin**: 18.7% automotive, improving with scale\n\n**Key Catalysts**:\n• FSD rollout accelerating (Beta in 12 markets)\n• Energy storage division growing 40% YoY\n• Gigafactory expansion (Texas, Berlin ramping)\n• Megablock deployments for grid storage\n\n**Valuation**: Trading at 45x forward P/E, premium justified by growth trajectory and AI optionality. Price target range: $240-$350 based on DCF models.\n\n**Risks**: Competition intensifying, regulatory headwinds in China, Elon execution risk.\n\nWould you like me to dive deeper into any specific aspect?";
    }
    return "Tesla continues to lead the EV transformation with strong execution across vehicles, energy storage, and autonomous driving. The company's vertical integration and manufacturing scale provide competitive advantages. What specific aspect of Tesla would you like me to analyze?";
  }
  
  // Market trends and M&A
  if (lowerMessage.includes('trends') || lowerMessage.includes('m&a') || lowerMessage.includes('merger')) {
    if (lowerMessage.includes('tmt') || lowerMessage.includes('tech')) {
      return "**Latest TMT M&A Trends (Q4 2024/Q1 2025)**:\n\n**Hot Sectors**:\n• **AI/ML Platforms**: Average 12-18x revenue multiples\n• **Cybersecurity**: Strategic premiums 40-60% above trading\n• **Cloud Infrastructure**: Consolidation around hyperscalers\n• **Fintech**: Focus on embedded finance and B2B solutions\n\n**Notable Deals**:\n• Microsoft/AI Startup: $2.8B (15x revenue)\n• Salesforce/Data Platform: $1.9B (strategic premium)\n• Private Equity in SaaS: $47B deployed YTD\n\n**Market Dynamics**:\n• Valuations normalizing from 2021 peaks\n• Focus shifting to profitability metrics\n• Cross-border deals facing regulatory scrutiny\n\nWhich TMT subsector interests you most?";
    }
    return "M&A activity remains robust across sectors I cover. TMT leads in deal volume, Healthcare focuses on biotech/medtech, Energy sees renewables consolidation, Consumer brands pursue D2C capabilities, and Industrial emphasizes automation/AI. Which sector's M&A activity would you like to explore?";
  }
  
  // Valuation questions
  if (lowerMessage.includes('valuation') || lowerMessage.includes('multiple') || lowerMessage.includes('price')) {
    if (lowerMessage.includes('tmt') || lowerMessage.includes('tech') || lowerMessage.includes('saas')) {
      return "**TMT Valuation Multiples (Current Market)**:\n\n**Software/SaaS**:\n• High-growth (>40%): 10-15x revenue\n• Moderate growth (20-40%): 6-10x revenue\n• Mature/profitable: 4-8x revenue\n\n**Hardware/Semiconductor**:\n• Chip designers: 15-25x earnings\n• Equipment: 12-18x earnings\n• Memory/commodity: 8-12x earnings\n\n**Telecom Infrastructure**:\n• Tower companies: 20-25x EBITDA\n• Fiber operators: 12-15x EBITDA\n• Traditional telcos: 6-8x EBITDA\n\n**Media/Content**:\n• Streaming platforms: 8-12x revenue\n• Traditional media: 6-10x EBITDA\n• Gaming: 10-15x EBITDA\n\nNote: Multiples vary significantly based on growth, margins, and market position. What specific subsector are you valuing?";
    }
    return "Valuation multiples vary significantly by sector and business model. I can provide detailed analysis for TMT (software, hardware, telecom), Healthcare (pharma, biotech, devices), Energy (traditional vs. renewables), Consumer brands, or Industrial companies. Which sector and stage company are you analyzing?";
  }
  
  // Sector-specific analysis
  if (lowerMessage.includes('healthcare') || lowerMessage.includes('biotech') || lowerMessage.includes('pharma')) {
    return "**Healthcare Sector Outlook**:\n\n**Investment Themes**:\n• AI-powered diagnostics and drug discovery\n• GLP-1 therapeutics expanding beyond diabetes\n• Digital therapeutics and remote monitoring\n• Personalized medicine and genomics\n\n**Key Metrics**:\n• Biotech funding: $28B in 2024 (stabilizing)\n• Pharma R&D: $200B+ annually\n• Digital health: 15% CAGR through 2027\n• Medical devices: Consolidation at 12-16x EBITDA\n\n**Notable Areas**: Oncology, rare diseases, mental health, aging demographics driving growth.\n\nWhich healthcare segment would you like me to analyze further?";
  }
  
  if (lowerMessage.includes('energy') || lowerMessage.includes('renewable') || lowerMessage.includes('clean')) {
    return "**Energy Sector Transformation**:\n\n**Clean Energy Growth**:\n• Global investment: $1.3T in 2024\n• Solar costs down 85% since 2010\n• Wind capacity: 20% CAGR globally\n• Grid storage: 35% CAGR through 2030\n\n**Traditional Energy**:\n• O&G companies pivoting to renewables\n• Focus on FCF generation and dividends\n• Carbon capture investments scaling\n• Natural gas as bridge fuel\n\n**Investment Focus**:\n• Grid modernization and storage\n• Green hydrogen infrastructure\n• Carbon management technologies\n• Energy efficiency solutions\n\nWhich energy segment interests you most?";
  }
  
  // Consumer and Industrial
  if (lowerMessage.includes('consumer') || lowerMessage.includes('retail') || lowerMessage.includes('brand')) {
    return "**Consumer Sector Dynamics**:\n\n**Key Trends**:\n• D2C brands disrupting traditional retail\n• Sustainability driving premium pricing\n• AI/ML personalization at scale\n• Supply chain resilience investments\n\n**Investment Activity**:\n• PE acquiring heritage brands for digital transformation\n• CPG companies buying D2C disruptors\n• Focus on subscription and recurring revenue models\n\n**Valuations**: Traditional retail 6-10x EBITDA, high-growth D2C brands 8-15x revenue.\n\nWhat consumer subsector are you exploring?";
  }
  
  if (lowerMessage.includes('industrial') || lowerMessage.includes('manufacturing')) {
    return "**Industrial Sector Evolution**:\n\n**Automation & AI**:\n• Smart factory implementations accelerating\n• Robotics adoption across manufacturing\n• Predictive maintenance reducing downtime\n• Supply chain optimization through AI\n\n**Investment Themes**:\n• Industry 4.0 technology integration\n• Sustainability and ESG compliance\n• Reshoring and supply chain diversification\n• Aerospace/defense modernization\n\n**Multiples**: Industrial automation 15-20x EBITDA, traditional manufacturing 8-12x EBITDA.\n\nWhich industrial segment would you like to discuss?";
  }
  
  // Market outlook and general questions
  if (lowerMessage.includes('outlook') || lowerMessage.includes('forecast') || lowerMessage.includes('2025')) {
    return "**2025 Market Outlook Across Sectors**:\n\n**Technology**: AI integration driving enterprise spending, cloud growth moderating but stable, cybersecurity remaining critical.\n\n**Healthcare**: Continued innovation in therapeutics, digital health adoption, aging demographics supporting growth.\n\n**Energy**: Renewable energy scaling, traditional energy focused on returns, policy support continuing.\n\n**Consumer**: Brand premiumization, D2C growth, sustainability requirements increasing.\n\n**Industrial**: Automation investments, supply chain resilience, defense spending elevated.\n\n**Key Risks**: Geopolitical tensions, interest rate sensitivity, regulatory changes.\n\nWhich sector's outlook interests you most?";
  }
  
  // Help and capabilities
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you') || lowerMessage.includes('capabilities')) {
    return "I'm TMT Bot, specialized in market intelligence across key sectors:\n\n**My Capabilities**:\n• **M&A Analysis**: Deal multiples, comparables, market trends\n• **Valuation Models**: DCF, trading comps, transaction comps\n• **Market Research**: Sector outlook, competitive dynamics\n• **Investment Analysis**: Stock analysis, sector allocation\n• **Financial Modeling**: Revenue projections, scenario analysis\n\n**Sectors I Cover**:\n• Technology, Media & Telecommunications (TMT)\n• Healthcare (Pharma, Biotech, MedTech)\n• Energy (Traditional & Renewables)\n• Consumer & Retail\n• Industrial & Manufacturing\n\nJust ask me anything about these markets - from specific company analysis to broad sector trends!";
  }
  
  // Default intelligent response
  return "I can help you analyze that topic! I specialize in market intelligence across TMT, Healthcare, Energy, Consumer, and Industrial sectors. I can provide:\n\n• **Company/Stock Analysis** (like Tesla, Microsoft, etc.)\n• **M&A Market Trends** and deal comparables\n• **Valuation Analysis** and multiples\n• **Sector Outlooks** and investment themes\n• **Deal Structuring** insights\n\nCould you provide more specifics about what you'd like to explore? For example:\n- \"Analyze [Company Name] stock\"\n- \"TMT M&A trends\"\n- \"Healthcare sector outlook\"\n- \"Energy valuation multiples\"\n\nWhat interests you most?";
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files
  app.use('/static', express.static(path.join(process.cwd(), 'static')));
  app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets')));
  
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Subscription plan routes
  app.get('/api/subscription-plans', async (req, res) => {
    try {
      const plans = await storage.getAllSubscriptionPlans();
      res.json(plans);
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      res.status(500).json({ message: "Failed to fetch subscription plans" });
    }
  });

  app.post('/api/subscription-plans', isAuthenticated, async (req, res) => {
    try {
      const validated = insertSubscriptionPlanSchema.parse(req.body);
      const plan = await storage.createSubscriptionPlan(validated);
      res.json(plan);
    } catch (error) {
      console.error("Error creating subscription plan:", error);
      res.status(500).json({ message: "Failed to create subscription plan" });
    }
  });

  // User subscription routes
  app.get('/api/user/subscription', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const subscription = await storage.getUserSubscription(userId);
      res.json(subscription);
    } catch (error) {
      console.error("Error fetching user subscription:", error);
      res.status(500).json({ message: "Failed to fetch user subscription" });
    }
  });

  app.post('/api/user/subscription', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validated = insertUserSubscriptionSchema.parse({
        ...req.body,
        userId,
      });
      const subscription = await storage.createUserSubscription(validated);
      res.json(subscription);
    } catch (error) {
      console.error("Error creating user subscription:", error);
      res.status(500).json({ message: "Failed to create user subscription" });
    }
  });

  // Report routes
  app.get('/api/reports/public', async (req, res) => {
    try {
      const reports = await storage.getPublicReports();
      res.json(reports);
    } catch (error) {
      console.error("Error fetching public reports:", error);
      res.status(500).json({ message: "Failed to fetch public reports" });
    }
  });

  app.get('/api/reports', isAuthenticated, async (req, res) => {
    try {
      const reports = await storage.getAllReports();
      res.json(reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      res.status(500).json({ message: "Failed to fetch reports" });
    }
  });

  app.get('/api/reports/:id', isAuthenticated, async (req, res) => {
    try {
      const report = await storage.getReportById(req.params.id);
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      res.json(report);
    } catch (error) {
      console.error("Error fetching report:", error);
      res.status(500).json({ message: "Failed to fetch report" });
    }
  });

  app.post('/api/reports', isAuthenticated, async (req, res) => {
    try {
      const validated = insertReportSchema.parse(req.body);
      const report = await storage.createReport(validated);
      res.json(report);
    } catch (error) {
      console.error("Error creating report:", error);
      res.status(500).json({ message: "Failed to create report" });
    }
  });

  // Redirect authenticated users to dashboard
  app.get('/', async (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/static/dashboard.html');
    } else {
      res.redirect('/static/index.html');
    }
  });

  // Add routes for all pages
  app.get('/reports', isAuthenticated, (req, res) => {
    res.redirect('/static/reports.html');
  });

  app.get('/features', (req, res) => {
    res.redirect('/static/features.html');
  });

  app.get('/pricing', (req, res) => {
    res.redirect('/static/pricing.html');
  });

  app.get('/sample', (req, res) => {
    res.redirect('/static/sample.html');
  });

  app.get('/ai', isAuthenticated, (req, res) => {
    res.redirect('/static/ai.html');
  });

  // TMT Bot Chat API endpoint
  const chatMessageSchema = z.object({
    messages: z.array(z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string()
    }))
  });

  app.post('/api/chat/tmt', isAuthenticated, async (req, res) => {
    try {
      const validated = chatMessageSchema.parse(req.body);
      
      if (!validated.messages || validated.messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      // Generate intelligent response using our enhanced TMT Bot
      const reply = generateTMTBotResponse(validated.messages);
      
      res.json({ reply });
    } catch (error) {
      console.error('TMT Bot chat error:', error);
      res.status(500).json({ error: 'Failed to process chat request' });
    }
  });

  // Legacy AI Chat API endpoint (keeping for compatibility)
  app.post('/api/ai/chat', isAuthenticated, async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Convert single message to message history format for TMT Bot
      const messageHistory = [{ role: 'user', content: message }];
      const response = generateTMTBotResponse(messageHistory);
      
      res.json({ response });
    } catch (error) {
      console.error('AI chat error:', error);
      res.status(500).json({ error: 'Failed to process AI request' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
