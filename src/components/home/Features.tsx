
import { motion } from "framer-motion";
import { Apple, Leaf, Truck, Users, MessageSquare, Clock } from "lucide-react";

const features = [
  {
    icon: Apple,
    title: "Fresh Local Produce",
    description: "Get the freshest fruits and vegetables directly from local farms to your table."
  },
  {
    icon: Leaf,
    title: "Natural & Sustainable",
    description: "Support environmentally responsible farming practices that prioritize sustainability."
  },
  {
    icon: Truck,
    title: "Direct Delivery",
    description: "Enjoy convenient delivery options from farms to your doorstep."
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Build relationships with local farmers and strengthen your community."
  },
  {
    icon: MessageSquare,
    title: "Direct Communication",
    description: "Message farmers directly to learn about their products and practices."
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Book appointments and pickups that work with your schedule."
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl p-6 shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all duration-300 card-3d"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
        <feature.icon size={24} />
      </div>
      <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
      <p className="text-muted-foreground">{feature.description}</p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-3"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Us
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A Better Way to Connect with Local Farmers
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            FarmFresh Connect makes it easy to discover and support local farmers while enjoying the freshest, healthiest food options.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
