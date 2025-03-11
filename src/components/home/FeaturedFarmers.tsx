
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for featured farmers
const featuredFarmers = [
  {
    id: 1,
    name: "Green Valley Farm",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
    location: "Greenfield, CA",
    distance: "5 miles away",
    rating: 4.8,
    reviews: 126,
    specialties: ["Organic Vegetables", "Fruits", "Herbs"],
    description: "Family-owned farm specializing in organic vegetables and fruits grown using traditional methods."
  },
  {
    id: 2,
    name: "Meadow Brook Dairy",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
    location: "Riverside, CA",
    distance: "7 miles away",
    rating: 4.9,
    reviews: 94,
    specialties: ["Raw Milk", "Cheese", "Yogurt"],
    description: "Sustainable dairy farm producing high-quality milk, cheese, and yogurt from grass-fed cows."
  },
  {
    id: 3,
    name: "Sunrise Poultry",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80",
    location: "Oakville, CA",
    distance: "12 miles away",
    rating: 4.7,
    reviews: 78,
    specialties: ["Free-range Eggs", "Poultry", "Honey"],
    description: "Free-range poultry farm offering farm-fresh eggs, chicken, and locally produced honey."
  }
];

const FarmerCard = ({ farmer }: { farmer: typeof featuredFarmers[0] }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 card-3d"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative aspect-[4/3]">
        <img 
          src={farmer.image} 
          alt={farmer.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white">
          <Star className="fill-yellow-400 stroke-yellow-400" size={16} />
          <span className="font-medium">{farmer.rating}</span>
          <span className="text-sm text-white/80">({farmer.reviews} reviews)</span>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-medium">{farmer.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin size={16} className="mr-1" />
            <span>{farmer.location}</span>
            <span className="mx-2">•</span>
            <span>{farmer.distance}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {farmer.specialties.map((specialty) => (
            <Badge key={specialty} variant="secondary" className="font-normal">
              {specialty}
            </Badge>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground">{farmer.description}</p>
        
        <div className="pt-2">
          <Link to={`/farmers/${farmer.id}`}>
            <Button variant="outline" className="w-full group">
              View Profile
              <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedFarmers = () => {
  const [visibleFarmers, setVisibleFarmers] = useState(featuredFarmers);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div className="space-y-2 max-w-2xl">
            <motion.span 
              className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Meet Your Local Producers
            </motion.span>
            <motion.h2 
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Featured Farmers
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Discover talented and dedicated farmers in your area who are passionate about sustainable agriculture and quality produce.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/farmers">
              <Button variant="outline" className="group">
                View All Farmers
                <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleFarmers.map((farmer) => (
            <FarmerCard key={farmer.id} farmer={farmer} />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link to="/farmers">
            <Button size="lg">
              Explore All Local Farmers
              <ChevronRight size={18} className="ml-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedFarmers;
