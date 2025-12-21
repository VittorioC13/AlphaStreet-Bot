# TMT Bot - Multi-Industry Financial Market Analysis Platform

## Overview

TMT Bot is a comprehensive financial market analysis platform covering three key industries: Technology, Media, and Telecommunications (TMT), Healthcare, and Energy sectors. The application provides exclusive market insights, M&A intelligence, AI-powered industry dictionary, and expert mentorship services through a subscription-based model. Built as a full-stack web application, it features both public landing pages for marketing and authenticated user dashboards for premium content access.

## Recent Changes (January 2025)

### GitHub Templates Sync
- **Date**: October 11, 2025
- **Changes Made**:
  - Synced all HTML template files from GitHub repository (VittorioC13/tmtbot/api/templates)
  - Updated core pages: index.html, dashboard.html, chat.html, pricing.html, payment.html
  - Added additional templates: login.html, features.html, contacts.html, map.html
  - Added LLM demo pages: LLM_Chat_Demo.html, LLM_Pitch_Demo.html, LLM_chat.html, ai_chat_select.html
  - Added error pages: 404.html, 500.html
  - Total of 26 HTML files now in static folder, combining GitHub templates with local deck-viewer files

### Complete Website Redesign with Static HTML Implementation
- **Date**: January 12, 2025
- **Changes Made**:
  - **Product Rebranding**: Updated from "TMT Daily Brief" to "TMT Bot" throughout all pages
  - **Industry Expansion**: Extended coverage from TMT-only to TMT, Healthcare, and Energy sectors
  - Created static HTML pages that connect to existing Express server endpoints
  - Replaced React-based UI with traditional HTML/CSS/JavaScript approach
  - Implemented Stripe-inspired design with beautiful color themes and gradients
  - Added comprehensive landing page with hero section, features, pricing, and testimonials
  - Built authenticated dashboard for logged-in users
  - Created dedicated reports page with filtering and modal viewing (now includes Healthcare filter)
  - Added automatic user authentication flow and redirects
  - Populated database with sample subscription plans and market reports across all three industries
  - Updated subscription plan descriptions to reflect multi-industry coverage
  - Added Healthcare sample reports to database (Healthcare Technology Investment Trends, Pharmaceutical M&A Market Analysis)
  - **Data Integrity Update**: Removed fake statistics and testimonials to maintain authenticity (removed subscriber count, rating, and client testimonials section)
  
### Static HTML Pages Structure
- **Landing Page** (`/static/index.html`): Marketing homepage with Stripe-inspired design
- **Dashboard** (`/static/dashboard.html`): User home page with subscription status and reports overview  
- **Reports Page** (`/static/reports.html`): Full reports listing with sector filtering
- **Server Integration**: All pages connect to existing Express API endpoints
- **Authentication Flow**: Seamless login/logout with Replit OIDC integration

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, utilizing Vite for build tooling and development
- **Routing**: Wouter for client-side routing with authentication-based route protection
- **UI Framework**: Radix UI components with shadcn/ui design system for consistent, accessible interface
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript with ES modules for type safety and modern JavaScript features
- **Development**: tsx for TypeScript execution in development environment
- **Production Build**: esbuild for fast, optimized server-side bundling

### Authentication & Session Management
- **Provider**: Replit OIDC authentication system with OpenID Connect integration
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple middleware
- **Security**: Passport.js strategy with secure HTTP-only cookies and CSRF protection
- **User Management**: Automatic user provisioning and profile synchronization with Replit identity

### Data Storage Solutions
- **Primary Database**: PostgreSQL with connection pooling via Neon serverless driver
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Migration System**: Drizzle Kit for database schema versioning and deployment
- **Schema Design**: Normalized relational structure with users, subscriptions, plans, and reports entities

### API Architecture
- **Design Pattern**: RESTful API with conventional HTTP methods and status codes
- **Data Validation**: Zod schemas for runtime type checking and API contract enforcement
- **Error Handling**: Centralized error middleware with proper HTTP status codes and client-friendly messages
- **Middleware Chain**: Request logging, JSON parsing, authentication guards, and CORS handling

### Development & Build System
- **Frontend Build**: Vite with React plugin for fast development and optimized production builds
- **Backend Build**: esbuild for Node.js bundle with external package optimization
- **TypeScript**: Strict type checking with path mapping for clean import statements
- **Asset Management**: Vite handles static assets with automatic optimization and CDN-ready output

## External Dependencies

### Database Services
- **Neon PostgreSQL**: Serverless PostgreSQL hosting with connection pooling and automatic scaling
- **Database Drivers**: @neondatabase/serverless for optimized serverless database connections

### Authentication Services
- **Replit OIDC**: Integrated authentication provider for seamless user onboarding
- **OpenID Connect**: Standard protocol implementation with passport strategy integration

### UI Component Libraries
- **Radix UI**: Headless component primitives for accessibility and customization
- **shadcn/ui**: Pre-built component library with Tailwind CSS integration
- **Lucide React**: Icon library for consistent visual elements

### Development Tools
- **Vite Plugins**: Runtime error overlay and Replit-specific development enhancements
- **Build Tools**: PostCSS with autoprefixer for cross-browser CSS compatibility
- **Type Safety**: Comprehensive TypeScript configuration with strict mode enabled

### Utility Libraries
- **Class Management**: clsx and tailwind-merge for conditional CSS class handling
- **Date Handling**: date-fns for date manipulation and formatting
- **Form Validation**: Hookform resolvers with Zod integration for type-safe forms