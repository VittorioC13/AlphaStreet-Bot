import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

export default function SampleReport() {
  return (
    <section id="sample" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4" data-testid="text-sample-title">
            Sample Report Preview
          </h2>
          <p className="text-xl text-muted-foreground" data-testid="text-sample-subtitle">
            Get a taste of our comprehensive market analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Detailed financial charts showing market trends and analytics" 
              className="rounded-2xl shadow-lg w-full h-auto"
              data-testid="img-sample-charts"
            />
          </div>
          
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-white shadow-sm border border-border">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-secondary" data-testid="text-report-title">
                  TMT Sector M&A Valuation Brief - 2025-01-12
                </CardTitle>
                <p className="text-muted-foreground" data-testid="text-report-sector">Technology, Media & Telecommunications Sector</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-secondary" data-testid="text-activity-title">Recent TMT M&A Activity</h4>
                      <p className="text-muted-foreground text-sm" data-testid="text-activity-description">Revolutionary funding round: Deal Size: Not specified in news</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-secondary" data-testid="text-valuation-title">Valuation Multiples</h4>
                      <p className="text-muted-foreground text-sm" data-testid="text-valuation-description">$65 billion valuation across key sector metrics</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium text-secondary" data-testid="text-commentary-title">Market Commentary</h4>
                      <p className="text-muted-foreground text-sm" data-testid="text-commentary-description">Revolutionary growth amid expansion in operations and offerings...</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/20 rounded-lg border border-border">
                  <div className="flex items-center mb-3">
                    <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground" data-testid="text-subscribe-prompt">Subscribe to access the full report including:</p>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li data-testid="text-feature-1">• Complete valuation analysis and comps</li>
                    <li data-testid="text-feature-2">• Market outlook and strategic recommendations</li>
                    <li data-testid="text-feature-3">• Exclusive deal commentary and insights</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="w-full gradient-primary text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              size="lg"
              data-testid="button-view-full-sample"
            >
              View Full Sample Report
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
