import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic Plan",
    priceYen: "¥28",
    priceUsd: "$4",
    period: "per month",
    features: [
      "Weekly TMT or Energy industry report",
      "Choose your preferred sector each week", 
      "Comprehensive market analysis",
      "M&A deal insights",
      "Technology trends coverage"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Premium Plan",
    priceYen: "¥140", 
    priceUsd: "$20",
    period: "per month",
    features: [
      "Everything in Basic Plan",
      "Access to both TMT & Energy reports",
      "Daily report access (newest releases)",
      "Online news report viewing",
      "AI-powered industry dictionary"
    ],
    buttonText: "Start Premium",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Max Plan",
    priceYen: "¥350",
    priceUsd: "$50", 
    period: "per month",
    features: [
      "Everything in Premium Plan",
      "30-minute monthly video call",
      "Professional investment banking tutors",
      "Personalized guidance",
      "Exclusive mentorship access"
    ],
    buttonText: "Get Max Plan",
    buttonVariant: "default" as const,
    popular: false
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4" data-testid="text-pricing-title">
            Choose Your Plan
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-pricing-subtitle">
            Flexible pricing designed for professionals at every level
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular 
                  ? 'gradient-primary text-white scale-105 hover:scale-110 shadow-xl transform' 
                  : 'bg-muted/20 hover:shadow-lg border border-border'
              } animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`card-plan-${index}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent text-white px-4 py-1 font-semibold" data-testid="badge-most-popular">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-secondary'}`} data-testid={`text-plan-name-${index}`}>
                  {plan.name}
                </h3>
                <div className={`text-4xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-secondary'}`}>
                  {plan.priceYen}{" "}
                  <span className={`text-lg font-normal ${plan.popular ? 'opacity-80' : 'text-muted-foreground'}`}>
                    / {plan.priceUsd}
                  </span>
                </div>
                <p className={plan.popular ? 'opacity-80' : 'text-muted-foreground'} data-testid={`text-plan-period-${index}`}>
                  {plan.period}
                </p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`mr-3 w-5 h-5 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                    <span className={plan.popular ? 'text-white' : 'text-foreground'} data-testid={`text-plan-feature-${index}-${featureIndex}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => window.location.href = '/api/login'}
                variant={plan.popular ? "secondary" : plan.buttonVariant}
                className={`w-full py-3 font-semibold transition-all duration-200 ${
                  plan.popular 
                    ? 'bg-white text-primary hover:bg-gray-100' 
                    : plan.buttonVariant === 'outline'
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    : 'gradient-primary text-white hover:shadow-lg'
                }`}
                data-testid={`button-plan-${index}`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
