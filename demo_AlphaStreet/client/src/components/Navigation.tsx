import { useState } from "react";
import { BarChart3, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
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
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-features"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-pricing"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('sample')}
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-sample"
              >
                Sample Report
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={() => window.location.href = '/api/login'}
              className="text-muted-foreground hover:text-primary transition-colors"
              data-testid="button-login"
            >
              Login
            </Button>
            <Button 
              onClick={() => window.location.href = '/api/login'}
              className="bg-primary hover:bg-accent text-white transition-all duration-200 transform hover:scale-105"
              data-testid="button-register"
            >
              Register
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <button
                onClick={() => scrollToSection('home')}
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors w-full text-left"
                data-testid="link-mobile-home"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors w-full text-left"
                data-testid="link-mobile-features"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors w-full text-left"
                data-testid="link-mobile-pricing"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('sample')}
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors w-full text-left"
                data-testid="link-mobile-sample"
              >
                Sample Report
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
