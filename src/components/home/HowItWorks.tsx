
import { motion } from "framer-motion";
import { Users, Search, MessageSquare, ShoppingBag } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Create an Account",
    description: "Sign up as a farmer to sell your products or as a customer to discover local farms."
  },
  {
    icon: Search,
    title: "Browse Local Farms",
    description: "Find farmers in your area and explore their available products and offerings."
  },
  {
    icon: MessageSquare,
    title: "Connect Directly",
    description: "Message farmers, ask questions, and arrange for delivery or pickup."
  },
  {
    icon: ShoppingBag,
    title: "Enjoy Fresh Products",
    description: "Get farm-fresh products directly from local producers to your table."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-3"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Simple Process
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            How FarmFresh Connect Works
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Our platform makes it easy to connect farmers with customers in just a few simple steps.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {steps.map((step, index) => (
            <motion.div 
              key={step.title}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Step number */}
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-medium text-lg z-10">
                {index + 1}
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-[calc(100%-10px)] w-[calc(100%-30px)] h-[2px] bg-border z-0">
                  <div className="absolute right-0 w-2 h-2 rounded-full bg-primary -translate-y-[3px]"></div>
                </div>
              )}
              
              {/* Content */}
              <div className="relative z-10 bg-white rounded-xl p-6 shadow-sm border border-border hover:border-primary/20 transition-all duration-300 h-full flex flex-col items-center text-center card-3d">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-5">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
