
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background -z-10" />
      
      {/* Decorative circles */}
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-primary/5 -z-10" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-primary/5 -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Hero content */}
          <motion.div className="space-y-6" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }}>
            <div className="space-y-2">
              <motion.span className="inline-block text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full" initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.3,
              duration: 0.5
            }}>
                Farm to Business, Simplified
              </motion.span>
              <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.5,
              duration: 0.7
            }}>
                From Fields to Buyers – <span className="text-primary">Fresh</span>, Long-Lasting Staples
              </motion.h1>
            </div>
            
            <motion.p className="text-lg text-muted-foreground max-w-lg" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.7,
            duration: 0.7
          }}>
              Connect directly with local farmers for bulk purchases—freshly harvested and stored for year-round use. Ideal for bulk buyers seeking quality farm produce.
            </motion.p>
            
            {/* Search bar */}
            <motion.div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 max-w-xl" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.9,
            duration: 0.7
          }}>
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input className="pl-10 pr-4 py-6 w-full bg-white border-input shadow-sm" placeholder="Search for products or farmers..." />
              </div>
              <div className="relative sm:w-40">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input className="pl-10 pr-4 py-6 w-full bg-white border-input shadow-sm" placeholder="Location" />
              </div>
              <Button size="lg" className="py-6">
                Search
              </Button>
            </motion.div>
            
            {/* Call to actions */}
            <motion.div className="flex flex-col xs:flex-row gap-3" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 1.1,
            duration: 0.7
          }}>
              <Link to="/farmers">
                <Button variant="default" size="lg" className="w-full xs:w-auto">
                  Find Local Farmers
                </Button>
              </Link>
              <Link to="/farmer-signup">
                <Button variant="outline" size="lg" className="w-full xs:w-auto">
                  Join as a Farmer
                </Button>
              </Link>
            </motion.div>
            
            {/* Trust badges */}
            <motion.div className="pt-6 flex flex-wrap gap-6 items-center text-muted-foreground" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 1.3,
            duration: 0.7
          }}>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm">100% Organic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm">Wholesale Quantities</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm">Bulk Pricing</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Hero image */}
          <motion.div className="relative flex items-center justify-center" initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.8
        }}>
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-xl"></div>
              
              <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-square sm:aspect-[4/3]">
                <img alt="Fresh farm produce" className="w-full h-full object-cover" src="https://static.vecteezy.com/system/resources/previews/037/980/818/non_2x/ai-generated-top-aerial-view-of-green-fields-and-meadows-landscape-with-lines-of-fields-grass-trees-indicating-healthy-crop-growth-ai-generated-free-photo.jpg" />
                
                {/* Floating cards */}
                <motion.div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg" initial={{
                x: -20,
                opacity: 0
              }} animate={{
                x: 0,
                opacity: 1
              }} transition={{
                delay: 1,
                duration: 0.6
              }}>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium">Same-day Delivery</p>
                      <p className="text-xs text-muted-foreground">For orders before 12pm</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg" initial={{
                x: 20,
                opacity: 0
              }} animate={{
                x: 0,
                opacity: 1
              }} transition={{
                delay: 1.2,
                duration: 0.6
              }}>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium">Supporting Local</p>
                      <p className="text-xs text-muted-foreground">100+ Local Farmers</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};

export default Hero;
