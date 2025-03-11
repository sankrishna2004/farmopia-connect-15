
import { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import FeaturedFarmers from "@/components/home/FeaturedFarmers";
import Categories from "@/components/home/Categories";
import Testimonials from "@/components/home/Testimonials";
import HowItWorks from "@/components/home/HowItWorks";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col"
    >
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <Categories />
        <FeaturedFarmers />
        <Testimonials />
        <CallToAction />
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
