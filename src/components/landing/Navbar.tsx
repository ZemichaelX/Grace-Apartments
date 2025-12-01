import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brandmark } from "@/components/Brandmark";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Apartments", path: "/listings" },
    { name: "About", path: "/#about" },
    { name: "Contact", path: "/#contact" },
  ];

  if (user) {
    navLinks.push({ name: "Dashboard", path: "/dashboard" });
  }

  // Handle smooth scrolling for hash links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith("/#")) {
      e.preventDefault();
      const sectionId = path.substring(2); // Remove "/#"

      // If we're not on the home page, navigate there first
      if (location.pathname !== "/") {
        window.location.href = path;
        return;
      }

      // Smooth scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80; // Height of fixed navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }

      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <Brandmark className="scale-75 md:scale-100 origin-left" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? "text-primary" : "text-foreground/80"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <Button variant="ghost" size="sm" asChild className="gap-2">
                <Link to="/dashboard">
                  <User className="w-4 h-4" />
                  {user.firstName}
                </Link>
              </Button>
            ) : (
              <Button variant="hero" size="sm" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-border p-4 animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-foreground/80 hover:text-primary transition-colors"
                onClick={(e) => {
                  handleNavClick(e, link.path);
                  if (!link.path.startsWith("/#")) {
                    setIsMobileMenuOpen(false);
                  }
                }}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <Link
                to="/dashboard"
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Account ({user.firstName})
              </Link>
            ) : (
              <Button variant="hero" className="w-full" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
