
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Unauthorized = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground">
              You don't have permission to access this page.
            </p>
          </div>
          
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Unauthorized Access</AlertTitle>
            <AlertDescription>
              Your current user role doesn't have the necessary permissions to view this resource.
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-col gap-4">
            <Link to="/">
              <Button variant="default" className="w-full">
                Return to Home
              </Button>
            </Link>
            <p className="text-center text-sm text-muted-foreground">
              If you believe this is an error, please contact support.
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Unauthorized;
