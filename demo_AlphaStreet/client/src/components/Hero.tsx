import { Button } from "@/components/ui/button";
import { Users, Star } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden gradient-primary">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-hero-title">
              Exclusive insights into{" "}
              <span className="text-accent">TMT markets</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-white/90" data-testid="text-hero-subtitle">
              Get comprehensive Technology, Media, and Telecommunications market analysis delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => window.location.href = '/api/login'}
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                size="lg"
                data-testid="button-start-free-trial"
              >
                Start Free Trial
              </Button>
              <Button 
                onClick={() => document.getElementById('sample')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-200"
                size="lg"
                data-testid="button-view-sample"
              >
                View Sample Report
              </Button>
            </div>
            <div className="mt-8 flex items-center space-x-6 text-white/80">
              <div className="flex items-center" data-testid="stat-subscribers">
                <Users className="w-5 h-5 mr-2" />
                <span>2,500+ subscribers</span>
              </div>
              <div className="flex items-center" data-testid="stat-rating">
                <Star className="w-5 h-5 mr-2 fill-current" />
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>
          <div className="lg:pl-8 animate-fade-in">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Business analytics dashboard showing financial data" 
                className="rounded-2xl shadow-2xl w-full h-auto"
                data-testid="img-hero-analytics"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
