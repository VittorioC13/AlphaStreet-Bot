import { BarChart3, Handshake, Bot, Clock, Video, Shield } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Market Analysis",
    description: "Comprehensive TMT sector analysis with actionable insights and trend identification for strategic decision making.",
    gradient: "from-primary to-accent"
  },
  {
    icon: Handshake,
    title: "M&A Intelligence", 
    description: "Stay ahead with exclusive merger and acquisition insights, deal flow analysis, and valuation multiples.",
    gradient: "from-accent to-secondary"
  },
  {
    icon: Bot,
    title: "AI-Powered Dictionary",
    description: "Access our intelligent industry dictionary with AI-powered explanations of complex financial and tech terms.",
    gradient: "from-secondary to-primary"
  },
  {
    icon: Clock,
    title: "Daily Updates",
    description: "Receive timely market updates and breaking news analysis delivered straight to your inbox.",
    gradient: "from-primary to-accent"
  },
  {
    icon: Video,
    title: "Expert Mentorship",
    description: "Get personalized guidance from investment banking professionals with our premium mentorship program.",
    gradient: "from-accent to-secondary"
  },
  {
    icon: Shield,
    title: "Exclusive Access",
    description: "Join an elite community of professionals with access to confidential market intelligence and insider perspectives.",
    gradient: "from-secondary to-primary"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4" data-testid="text-features-title">
            Why choose TMT Daily Brief?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-features-subtitle">
            Get the competitive edge with our comprehensive market intelligence and expert analysis
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-muted/20 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group animate-fade-in border border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`card-feature-${index}`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-4" data-testid={`text-feature-title-${index}`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground" data-testid={`text-feature-description-${index}`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
