import { db } from "../server/db";
import { subscriptionPlans, reports } from "../shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Add subscription plans
  const plans = [
    {
      name: "Basic Plan",
      description: "Weekly industry reports across TMT, Healthcare, or Energy",
      priceYen: 28,
      priceUsd: 4,
      features: [
        "Weekly industry report (TMT, Healthcare, or Energy)",
        "Choose your preferred sector each week",
        "Comprehensive market analysis",
        "M&A deal insights",
        "Technology and healthcare trends coverage"
      ],
      isPopular: false
    },
    {
      name: "Premium Plan", 
      description: "Full access to TMT, Healthcare & Energy reports",
      priceYen: 140,
      priceUsd: 20,
      features: [
        "Everything in Basic Plan",
        "Access to all TMT, Healthcare & Energy reports",
        "Daily report access (newest releases)",
        "Online news report viewing",
        "AI-powered industry dictionary"
      ],
      isPopular: true
    },
    {
      name: "Max Plan",
      description: "Premium access plus mentorship",
      priceYen: 350,
      priceUsd: 50,
      features: [
        "Everything in Premium Plan",
        "30-minute monthly video call",
        "Professional investment banking tutors",
        "Personalized guidance across all industries",
        "Exclusive mentorship access"
      ],
      isPopular: false
    }
  ];

  for (const plan of plans) {
    try {
      await db.insert(subscriptionPlans).values(plan).onConflictDoNothing();
      console.log(`Added plan: ${plan.name}`);
    } catch (error) {
      console.log(`Plan ${plan.name} already exists or error:`, error);
    }
  }

  // Add sample reports
  const sampleReports = [
    {
      title: "TMT Sector M&A Valuation Brief - 2025-01-12",
      sector: "TMT",
      description: "Comprehensive analysis of recent TMT mergers and acquisitions with valuation multiples and market commentary.",
      content: `
# TMT Sector M&A Valuation Brief

## Executive Summary
This week's TMT sector analysis reveals continued consolidation activity across technology, media, and telecommunications industries. Key highlights include significant funding rounds and strategic acquisitions.

## Recent M&A Activity
- **Revolutionary Funding Round**: Major technology company secures funding for expansion
- **Deal Size**: $65 billion valuation reported across multiple transactions
- **Geographic Focus**: North American and European markets showing highest activity

## Valuation Analysis
Current valuation multiples in the TMT sector:
- Enterprise Value/Revenue: 8.5x - 12.3x
- Price/Earnings: 18.2x - 24.7x
- EV/EBITDA: 15.4x - 21.1x

## Market Commentary
The TMT sector continues to demonstrate resilience amid market volatility. Key drivers include:
- Digital transformation acceleration
- Cloud infrastructure investments
- 5G network deployments
- AI and machine learning integration

## Investment Recommendations
Based on current market conditions and valuation metrics, we recommend:
1. Focus on companies with strong recurring revenue models
2. Prioritize businesses with defensible technology moats
3. Consider geographic diversification opportunities
      `,
      publishDate: new Date('2025-01-12'),
      isPublic: true
    },
    {
      title: "Energy Sector Outlook - Q1 2025",
      sector: "Energy", 
      description: "Quarterly outlook on energy markets including renewable trends and traditional energy valuations.",
      content: `
# Energy Sector Outlook - Q1 2025

## Market Overview
The energy sector is experiencing a transformative period with renewable energy investments reaching record highs while traditional energy companies adapt their strategies.

## Renewable Energy Trends
- Solar and wind capacity additions exceed projections
- Energy storage technology improvements driving adoption
- Government incentives supporting clean energy transition

## Traditional Energy Analysis
- Oil and gas companies focusing on efficiency improvements
- Strategic investments in carbon capture technology
- Dividend sustainability across major energy producers

## Investment Outlook
Key investment themes for Q1 2025:
1. Renewable energy infrastructure plays
2. Energy transition technology companies
3. Traditional energy companies with strong ESG credentials
      `,
      publishDate: new Date('2025-01-10'),
      isPublic: true
    },
    {
      title: "TMT Infrastructure Investment Analysis",
      sector: "TMT",
      description: "Deep dive into telecommunications infrastructure investments and 5G deployment economics.",
      content: `
# TMT Infrastructure Investment Analysis

## 5G Deployment Economics
Analysis of capital expenditure requirements and return on investment for major telecommunications infrastructure projects.

## Key Findings
- Infrastructure sharing agreements reducing deployment costs
- Private equity interest in tower and fiber assets
- Government funding supporting rural connectivity initiatives

## Investment Implications
Strategic considerations for infrastructure investments in the TMT space.
      `,
      publishDate: new Date('2025-01-08'),
      isPublic: false
    },
    {
      title: "Digital Media Transformation Report",
      sector: "TMT",
      description: "Analysis of streaming platforms, content creation economics, and advertising technology trends.",
      content: `
# Digital Media Transformation Report

## Streaming Platform Analysis
Comprehensive review of major streaming platforms including subscriber growth, content spend, and competitive positioning.

## Content Economics
- Original content production costs and returns
- International expansion strategies
- Advertising-supported tier adoption rates

## Technology Trends
- AI-powered content recommendation systems
- Live streaming and interactive media growth
- Virtual and augmented reality content initiatives
      `,
      publishDate: new Date('2025-01-05'),
      isPublic: true
    },
    {
      title: "Clean Energy M&A Activity Review",
      sector: "Energy",
      description: "Monthly review of mergers and acquisitions in the clean energy sector with deal valuations and strategic rationale.",
      content: `
# Clean Energy M&A Activity Review

## Deal Overview
Review of significant transactions in the renewable energy sector including solar, wind, and energy storage companies.

## Valuation Metrics
- Premium multiples for high-growth renewable developers
- Strategic value of development pipelines
- Geographic and technology diversification premiums

## Market Dynamics
- Utility company acquisition strategies
- Private equity involvement in renewable assets
- Cross-border transaction activity
      `,
      publishDate: new Date('2025-01-03'),
      isPublic: false
    },
    {
      title: "Healthcare Technology Investment Trends",
      sector: "Healthcare",
      description: "Analysis of digital health investments, telemedicine growth, and healthcare AI adoption trends.",
      content: `
# Healthcare Technology Investment Trends

## Digital Health Investment Overview
Comprehensive analysis of venture capital and private equity investments in healthcare technology companies.

## Key Investment Themes
- Telemedicine platform expansion
- AI-powered diagnostic tools
- Remote patient monitoring solutions
- Digital therapeutics development

## Market Dynamics
- Regulatory approval pathways for digital health solutions
- Healthcare system integration challenges
- Reimbursement model evolution

## Investment Outlook
Strategic considerations for healthcare technology investments including regulatory risk assessment and market adoption timelines.
      `,
      publishDate: new Date('2025-01-07'),
      isPublic: true
    },
    {
      title: "Pharmaceutical M&A Market Analysis",
      sector: "Healthcare",
      description: "Review of recent pharmaceutical industry consolidation with focus on biotech acquisitions and pipeline valuations.",
      content: `
# Pharmaceutical M&A Market Analysis

## Transaction Overview
Analysis of major pharmaceutical and biotech mergers and acquisitions including deal rationale and valuation multiples.

## Pipeline Valuation
- Risk-adjusted NPV models for drug development programs
- Phase-based valuation premiums
- Therapeutic area concentration trends

## Strategic Considerations
- Patent cliff mitigation strategies
- Specialty vs. generics positioning
- Geographic market expansion through acquisition
      `,
      publishDate: new Date('2025-01-01'),
      isPublic: false
    }
  ];

  for (const report of sampleReports) {
    try {
      await db.insert(reports).values(report).onConflictDoNothing();
      console.log(`Added report: ${report.title}`);
    } catch (error) {
      console.log(`Report ${report.title} already exists or error:`, error);
    }
  }

  console.log("Database seeding completed!");
}

seed().catch(console.error);