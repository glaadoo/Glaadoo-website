
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Check if we're on the home page before doing smooth scroll
    if (window.location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on home page, navigate to home page with hash
      navigate(`/#${id}`);
    }
  };

  const handleLogoClick = () => {
    // Force a refresh when clicking on the logo if already on home page
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={handleLogoClick}
            className="text-2xl font-bold text-primary cursor-pointer"
          >
            GLAADOO
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#about" 
              className="text-secondary hover:text-primary transition-colors"
              onClick={(e) => handleNavLinkClick(e, 'about')}
            >
              About
            </a>
            <a 
              href="#stories" 
              className="text-secondary hover:text-primary transition-colors"
              onClick={(e) => handleNavLinkClick(e, 'stories')}
            >
              Stories
            </a>
            <a 
              href="#faq" 
              className="text-secondary hover:text-primary transition-colors"
              onClick={(e) => handleNavLinkClick(e, 'faq')}
            >
              FAQ
            </a>
            <a 
              href="#contact" 
              className="text-secondary hover:text-primary transition-colors"
              onClick={(e) => handleNavLinkClick(e, 'contact')}
            >
              Contact
            </a>
            
            {/* Sign In Button - Kept this but removed the user profile avatar */}
            <Button asChild variant="outline" size="sm" className="ml-4">
              <Link to="/sign-in">Sign In</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              className="p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-secondary" />
              ) : (
                <Menu className="h-6 w-6 text-secondary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slideIn">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a
              href="#about"
              className="block text-secondary hover:text-primary transition-colors"
              onClick={(e) => handleNavLinkClick(e, 'about')}
            >
              About
            </a>
            <a
              href="#stories"
              className="block text-secondary hover:text-primary transition-colors"
              onClick={(e) => handleNavLinkClick(e, 'stories')}
            >
              Stories
            </a>
            <a
              href="#faq"
              className="block text-secondary hover:text-primary transition-colors"
              onClick={(e) => handleNavLinkClick(e, 'faq')}
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="block text-secondary hover:text-primary transition-colors"
              onClick={(e) => handleNavLinkClick(e, 'contact')}
            >
              Contact
            </a>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
