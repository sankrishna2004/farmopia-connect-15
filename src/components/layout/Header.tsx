
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Menu, 
  Search, 
  ShoppingBasket, 
  MapPin, 
  MessageSquare, 
  LogIn,
  User,
  Package,
  LogOut,
  Plus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logged out successfully");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Farmers", path: "/farmers" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-primary font-medium animate-hover"
          >
            <ShoppingBasket size={24} className="text-primary" />
            <span className="text-xl font-semibold tracking-tight">FarmFresh</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? "text-primary" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <Search size={20} />
            </Button>
            
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <MapPin size={20} />
            </Button>
            
            {user ? (
              <>
                <Button variant="ghost" size="icon" className="hover:bg-secondary relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
                </Button>
                
                <Button variant="ghost" size="icon" className="hover:bg-secondary">
                  <MessageSquare size={20} />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    {user.role === "farmer" && (
                      <DropdownMenuItem onClick={() => navigate("/dashboard?tab=products")}>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Add Product</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => navigate("/dashboard?tab=orders")}>
                      <Package className="mr-2 h-4 w-4" />
                      <span>My Orders</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button variant="ghost" className="hover:bg-secondary flex items-center gap-1">
                    <LogIn size={18} />
                    <span className="hidden sm:inline">Sign In</span>
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button variant="default" className="hidden sm:flex items-center gap-1">
                    <User size={18} />
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-secondary"
              onClick={toggleMenu}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-b border-border shadow-md animate-slide-in-up">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-medium transition-colors hover:text-primary py-2 ${
                  location.pathname === link.path ? "text-primary" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="pt-2 flex flex-col space-y-3">
                <Button onClick={() => navigate("/dashboard")} className="w-full flex items-center justify-start gap-2">
                  <User size={18} />
                  Dashboard
                </Button>
                {user.role === "farmer" && (
                  <Button onClick={() => navigate("/dashboard?tab=products")} variant="outline" className="w-full flex items-center justify-start gap-2">
                    <Plus size={18} />
                    Add Product
                  </Button>
                )}
                <Button onClick={() => navigate("/dashboard?tab=orders")} variant="outline" className="w-full flex items-center justify-start gap-2">
                  <Package size={18} />
                  My Orders
                </Button>
                <Button onClick={handleLogout} variant="ghost" className="w-full flex items-center justify-start gap-2 text-red-500">
                  <LogOut size={18} />
                  Log out
                </Button>
              </div>
            ) : (
              <div className="pt-2 flex flex-col space-y-3">
                <Link to="/sign-up">
                  <Button className="w-full">Sign Up</Button>
                </Link>
                <Link to="/sign-in">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
