import { BarChart3 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-semibold" data-testid="text-footer-logo">TMT Daily Brief</span>
            </div>
            <p className="text-white/70" data-testid="text-footer-description">
              Exclusive insights into Technology, Media, and Telecommunications markets.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4" data-testid="text-footer-product-title">Product</h3>
            <ul className="space-y-2 text-white/70">
              <li><a href="#features" className="hover:text-white transition-colors" data-testid="link-footer-features">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors" data-testid="link-footer-pricing">Pricing</a></li>
              <li><a href="#sample" className="hover:text-white transition-colors" data-testid="link-footer-sample">Sample Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-footer-api">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4" data-testid="text-footer-company-title">Company</h3>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-footer-about">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-footer-blog">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-footer-careers">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-footer-contact">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4" data-testid="text-footer-legal-title">Legal</h3>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-footer-privacy">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-footer-terms">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors" data-testid="link-footer-cookies">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/70">
          <p data-testid="text-footer-copyright">&copy; 2025 TMT Daily Brief. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
