import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isUnauthorizedError } from "@/lib/authUtils";
import { BarChart3, FileText, Settings, User } from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: subscription, isLoading: subscriptionLoading } = useQuery({
    queryKey: ["/api/user/subscription"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: reports, isLoading: reportsLoading } = useQuery({
    queryKey: ["/api/reports"],
    enabled: isAuthenticated,
    retry: false,
  });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <BarChart3 className="text-white w-4 h-4" />
                </div>
                <span className="text-xl font-semibold text-secondary" data-testid="text-logo">TMT Daily Brief</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground" data-testid="text-welcome">
                Welcome, {user?.firstName || user?.email}
              </span>
              <Button 
                onClick={() => window.location.href = '/api/logout'}
                variant="outline"
                data-testid="button-logout"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2" data-testid="text-dashboard-title">
            Dashboard
          </h1>
          <p className="text-muted-foreground" data-testid="text-dashboard-subtitle">
            Welcome to your TMT Daily Brief dashboard
          </p>
        </div>

        {/* Subscription Status */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {subscriptionLoading ? (
                <div className="animate-pulse h-6 bg-gray-200 rounded"></div>
              ) : subscription ? (
                <div>
                  <div className="text-2xl font-bold" data-testid="text-subscription-status">Active</div>
                  <Badge variant="default" className="mt-2" data-testid="badge-subscription-plan">
                    {subscription.planId}
                  </Badge>
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-bold text-gray-500" data-testid="text-no-subscription">No Active Plan</div>
                  <Button className="mt-2" size="sm" data-testid="button-subscribe">
                    Subscribe Now
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-reports-count">
                {reportsLoading ? "..." : reports?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                TMT & Energy reports
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Type</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-account-type">Professional</div>
              <p className="text-xs text-muted-foreground">
                Premium access enabled
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            {reportsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            ) : reports && reports.length > 0 ? (
              <div className="space-y-4">
                {reports.slice(0, 5).map((report) => (
                  <div 
                    key={report.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    data-testid={`card-report-${report.id}`}
                  >
                    <div>
                      <h3 className="font-medium" data-testid={`text-report-title-${report.id}`}>
                        {report.title}
                      </h3>
                      <p className="text-sm text-gray-600" data-testid={`text-report-sector-${report.id}`}>
                        {report.sector} • {new Date(report.publishDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" data-testid={`button-view-report-${report.id}`}>
                      View Report
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2" data-testid="text-no-reports-title">
                  No reports available
                </h3>
                <p className="text-gray-600" data-testid="text-no-reports-description">
                  Subscribe to a plan to access our exclusive market reports
                </p>
                <Button className="mt-4" data-testid="button-subscribe-reports">
                  Browse Plans
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
