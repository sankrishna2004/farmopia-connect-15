
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    text: "FarmFresh Connect has completely changed how I shop for groceries. The quality of produce I get directly from local farmers is incomparable to supermarket options. Plus, I love knowing exactly where my food comes from.",
    author: {
      name: "Emily Johnson",
      role: "Regular Customer",
      avatar: "https://i.pravatar.cc/150?img=23"
    },
    rating: 5
  },
  {
    id: 2,
    text: "As a small family farm, we struggled to reach customers beyond our local farmers market. FarmFresh Connect has expanded our customer base significantly and helped us build lasting relationships with people who truly value our products.",
    author: {
      name: "Michael Rodriguez",
      role: "Green Hills Farm",
      avatar: "https://i.pravatar.cc/150?img=59"
    },
    rating: 5
  },
  {
    id: 3,
    text: "The direct messaging feature is fantastic. I can ask farmers about their growing methods or get recipe suggestions for unusual vegetables. It's like having expert advice just a message away. The personal connection makes all the difference.",
    author: {
      name: "Sarah Williams",
      role: "Home Chef & Customer",
      avatar: "https://i.pravatar.cc/150?img=47"
    },
    rating: 4
  },
  {
    id: 4,
    text: "Our dairy has been in business for generations, but connecting with new customers was always a challenge. This platform has made it so easy to showcase our products and story. Our sales have increased by 40% since joining!",
    author: {
      name: "James Wilson",
      role: "Valley View Dairy",
      avatar: "https://i.pravatar.cc/150?img=68"
    },
    rating: 5
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-border h-full flex flex-col">
      <div className="mb-4 flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
          />
        ))}
      </div>
      
      <p className="text-muted-foreground flex-grow mb-6 text-base leading-relaxed">"{testimonial.text}"</p>
      
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={testimonial.author.avatar} />
          <AvatarFallback>{testimonial.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium">{testimonial.author.name}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.author.role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsPerPage = 2;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  
  const nextTestimonials = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };
  
  const prevTestimonials = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };
  
  const currentTestimonials = testimonials.slice(
    activeIndex * testimonialsPerPage,
    (activeIndex + 1) * testimonialsPerPage
  );

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <motion.span 
              className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Testimonials
            </motion.span>
            <motion.h2 
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              What Our Community Says
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Hear from farmers and customers who have transformed their relationship with food through our platform.
            </motion.p>
          </div>
          
          <motion.div 
            className="flex space-x-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevTestimonials}
              disabled={activeIndex === 0}
              className="hover:bg-secondary"
            >
              <ChevronLeft size={18} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextTestimonials}
              disabled={activeIndex === totalPages - 1}
              className="hover:bg-secondary"
            >
              <ChevronRight size={18} />
            </Button>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentTestimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full mx-1 transition-all ${
                index === activeIndex ? "bg-primary w-6" : "bg-primary/30"
              }`}
              aria-label={`Go to testimonial page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
