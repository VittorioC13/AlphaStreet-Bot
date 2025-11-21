import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SampleReport from "@/components/SampleReport";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Hero />
      <Features />
      <SampleReport />
      <Pricing />
      <Testimonials />
      <div className="py-20 gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to gain the competitive edge?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of professionals who trust TMT Daily Brief for market intelligence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/api/login'}
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
              data-testid="button-start-trial"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => document.getElementById('sample')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-200"
              data-testid="button-schedule-demo"
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
