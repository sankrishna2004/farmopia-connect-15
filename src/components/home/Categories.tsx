
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

// Updated categories with long-term storage crops
const categories = [
  {
    id: 1,
    name: "Rice Varieties",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    count: 42,
  },
  {
    id: 2,
    name: "Chillies",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    count: 28,
  },
  {
    id: 3,
    name: "Turmeric",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    count: 15,
  },
  {
    id: 4,
    name: "Groundnuts",
    image: "https://images.unsplash.com/photo-1567892737950-30fd8f4e389f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    count: 23,
  },
  {
    id: 5,
    name: "Pulses & Lentils",
    image: "https://images.unsplash.com/photo-1515543904458-b0a3a435d0dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    count: 36,
  },
  {
    id: 6,
    name: "Storage Crops",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    count: 31,
  },
];

const CategoryCard = ({ category, index }: { category: typeof categories[0], index: number }) => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-xl group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Background Image */}
      <div className="w-full aspect-square sm:aspect-[3/4] overflow-hidden">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <h3 className="text-xl font-medium mb-1">{category.name}</h3>
        <p className="text-sm text-white/80">{category.count} products</p>
        
        <Link to={`/products?category=${category.id}`} className="mt-4 inline-flex items-center text-sm font-medium">
          <span className="border-b border-white/0 group-hover:border-white/80 transition-colors">
            Explore Category
          </span>
          <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

const Categories = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span 
            className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-3"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Browse By Category
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover Long-Term Storage Crops
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Explore our selection of rice, chillies, turmeric, groundnut, pulses and other crops that are perfect for long-term storage and use throughout the year.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
