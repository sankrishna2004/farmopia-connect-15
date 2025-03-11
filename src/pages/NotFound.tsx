
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 flex items-center justify-center text-5xl font-bold text-primary">
                  404
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Page Not Found</h1>
              
              <p className="text-lg text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
              </p>
              
              <div className="pt-4">
                <Link to="/">
                  <Button size="lg" className="gap-2">
                    <ArrowLeft size={18} />
                    Back to Home
                  </Button>
                </Link>
              </div>
              
              <div className="pt-6">
                <p className="text-sm text-muted-foreground">
                  If you believe this is an error, please <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
