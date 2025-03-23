
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

// Mock data for farmer connections (for customers)
const mockFarmers = [
  { id: "1", name: "Ramesh Kumar", specialty: ["Rice", "Pulses"], location: "Karnataka", rating: 4.5 },
  { id: "2", name: "Lakshmi Devi", specialty: ["Turmeric", "Chillies"], location: "Andhra Pradesh", rating: 4.8 },
  { id: "3", name: "Suresh Reddy", specialty: ["Groundnut", "Rice"], location: "Telangana", rating: 4.2 },
];

const FarmersTab = () => {
  const navigate = useNavigate();
  const [locationFilter, setLocationFilter] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [filteredFarmers, setFilteredFarmers] = useState(mockFarmers);
  
  useEffect(() => {
    // Filter farmers based on selected filters
    let filtered = [...mockFarmers];
    
    if (locationFilter) {
      filtered = filtered.filter(farmer => farmer.location === locationFilter);
    }
    
    if (specialtyFilter) {
      filtered = filtered.filter(farmer => farmer.specialty.includes(specialtyFilter));
    }
    
    setFilteredFarmers(filtered);
  }, [locationFilter, specialtyFilter]);
  
  const handleConnectFarmer = (farmerId: string) => {
    toast.success(`Connected with farmer. A message has been sent.`);
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Connect with Farmers</h2>
        
        {filteredFarmers.length > 0 ? (
          <div className="space-y-4">
            {filteredFarmers.map(farmer => (
              <Card key={farmer.id} className="overflow-hidden">
                <div className="p-6 flex flex-col md:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-medium text-primary">
                        {farmer.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg">{farmer.name}</h3>
                    
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg 
                            key={i} 
                            className={`h-4 w-4 ${i < farmer.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-transparent"}`}
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{farmer.rating}</span>
                    </div>
                    
                    <div className="mt-2">
                      <span className="text-sm block">Location: {farmer.location}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {farmer.specialty.map(spec => (
                          <Badge key={spec} variant="outline">{spec}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 md:text-right">
                    <Button 
                      onClick={() => navigate(`/products?farmerId=${farmer.id}`)}
                      className="w-full md:w-auto"
                    >
                      View Products
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleConnectFarmer(farmer.id)}
                      className="w-full md:w-auto"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => navigate(`/reviews/${farmer.id}`)}
                      className="w-full md:w-auto"
                    >
                      Leave Review
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No farmers found matching your criteria</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setLocationFilter("");
                setSpecialtyFilter("");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FarmersTab;
