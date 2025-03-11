
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-accent/50 -z-10" />
      <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-primary/5 -z-10" />
      <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full bg-primary/5 -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-border glass">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-3">
                <motion.span 
                  className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Join Our Community
                </motion.span>
                <h2 className="text-3xl font-semibold tracking-tight">Ready to Transform Your Farm-to-Table Experience?</h2>
              </div>
              
              <p className="text-muted-foreground">
                Whether you're a farmer looking to reach more customers or a food lover seeking the freshest local produce, FarmFresh Connect is your platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/sign-up">
                  <Button size="lg" className="w-full sm:w-auto gap-1">
                    Sign Up Now
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn How It Works
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Farmer and customer" 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay text */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="text-center text-white p-6">
                    <p className="text-2xl font-medium mb-2">Join 2,500+ Users</p>
                    <p className="text-sm">500+ Farmers • 2,000+ Customers</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/20 rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/50 rounded-full -z-10"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
