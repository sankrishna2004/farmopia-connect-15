
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Wheat, Flame, Sun, Nut, Bean, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Updated categories with long-term storage crops
const categories = [
  {
    id: 1,
    name: "Rice Varieties",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    count: 42,
    icon: Wheat,
  },
  {
    id: 2,
    name: "Chillies",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    count: 28,
    icon: Flame,
  },
  {
    id: 3,
    name: "Turmeric",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    count: 15,
    icon: Sun,
  },
  {
    id: 4,
    name: "Groundnuts",
    image: "https://images.unsplash.com/photo-1567892737950-30fd8f4e389f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    count: 23,
    icon: Nut,
  },
  {
    id: 5,
    name: "Pulses & Lentils",
    image: "https://images.unsplash.com/photo-1515543904458-b0a3a435d0dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    count: 36,
    icon: Bean,
  },
  {
    id: 6,
    name: "Storage Crops",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    count: 31,
    icon: Package,
  },
];

// Sample products for each category
const productsByCategory = {
  1: [
    { id: 101, name: "Basmati Rice", price: 120, unit: "5kg", image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
    { id: 102, name: "Brown Rice", price: 95, unit: "5kg", image: "https://images.unsplash.com/photo-1551779074-a80da6208053?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
    { id: 103, name: "Black Rice", price: 150, unit: "2kg", image: "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
    { id: 104, name: "Red Rice", price: 110, unit: "5kg", image: "https://images.unsplash.com/photo-1576699795566-7bd80b240157?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
  ],
  2: [
    { id: 201, name: "Dried Red Chillies", price: 65, unit: "500g", image: "https://images.unsplash.com/photo-1606914707708-5180546f5314?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
    { id: 202, name: "Green Chilli Powder", price: 85, unit: "250g", image: "https://images.unsplash.com/photo-1638957773782-f9614ba79d81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
    { id: 203, name: "Kashmiri Chilli", price: 120, unit: "200g", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd055d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
  ],
  3: [
    { id: 301, name: "Turmeric Powder", price: 90, unit: "500g", image: "https://images.unsplash.com/photo-1615485291236-f80a2542fcd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
    { id: 302, name: "Turmeric Root", price: 75, unit: "250g", image: "https://images.unsplash.com/photo-1576092761339-fd2d6b077114?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
    { id: 303, name: "Organic Turmeric", price: 110, unit: "500g", image: "https://images.unsplash.com/photo-1589819700276-531babe7dec8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
  ],
  4: [
    { id: 401, name: "Raw Groundnuts", price: 85, unit: "1kg", image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
    { id: 402, name: "Roasted Groundnuts", price: 95, unit: "500g", image: "https://images.unsplash.com/photo-1599036004484-51d05ed9a7d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
    { id: 403, name: "Groundnut Oil", price: 220, unit: "1L", image: "https://images.unsplash.com/photo-1589927986089-35812388d1f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
  ],
  5: [
    { id: 501, name: "Toor Dal", price: 110, unit: "2kg", image: "https://images.unsplash.com/photo-1612257999756-9ce2cb138816?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
    { id: 502, name: "Moong Dal", price: 95, unit: "1kg", image: "https://images.unsplash.com/photo-1616684000067-36952fde56ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
    { id: 503, name: "Chana Dal", price: 90, unit: "1kg", image: "https://images.unsplash.com/photo-1563642421748-5047b6585a4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
    { id: 504, name: "Masoor Dal", price: 85, unit: "1kg", image: "https://images.unsplash.com/photo-1627735457500-3a326db713d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
  ],
  6: [
    { id: 601, name: "Onions (Dry)", price: 60, unit: "5kg", image: "https://images.unsplash.com/photo-1596031708648-31e51c97de64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
    { id: 602, name: "Potatoes", price: 50, unit: "5kg", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
    { id: 603, name: "Garlic (Dry)", price: 75, unit: "1kg", image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" },
  ],
};

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

const ProductCard = ({ product }: { product: { id: number, name: string, price: number, unit: string, image: string } }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{product.name}</h3>
          <Badge variant="secondary">₹{product.price}</Badge>
        </div>
        <div className="text-sm text-muted-foreground">{product.unit}</div>
        <Button variant="outline" size="sm" className="w-full mt-3">Add to cart</Button>
      </CardContent>
    </Card>
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

        {/* Tabbed Products Section */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="1" className="w-full">
            <TabsList className="mb-8 flex flex-wrap justify-center gap-2 bg-transparent">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id.toString()}
                  className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <category.icon size={16} />
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id.toString()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {productsByCategory[category.id as keyof typeof productsByCategory].map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
