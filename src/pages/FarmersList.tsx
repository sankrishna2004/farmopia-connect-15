
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import FarmerCard from "@/components/reviews/FarmerCard";

// Mock data for farmers
const mockFarmers = [
  {
    id: "1",
    name: "Ramesh Kumar",
    products: ["Rice", "Pulses", "Turmeric"],
    avgRating: 4.5,
    reviewCount: 24,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Lakshmi Devi",
    products: ["Rice", "Chillies", "Groundnut"],
    avgRating: 4.8,
    reviewCount: 16,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "Suresh Reddy",
    products: ["Pulses", "Turmeric", "Long-term Crops"],
    avgRating: 4.2,
    reviewCount: 19,
    image: "https://randomuser.me/api/portraits/men/68.jpg",
  },
  {
    id: "4",
    name: "Ananya Sharma",
    products: ["Rice", "Pulses", "Groundnut"],
    avgRating: 4.7,
    reviewCount: 22,
    image: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    id: "5",
    name: "Rajesh Patel",
    products: ["Chillies", "Turmeric", "Long-term Crops"],
    avgRating: 4.9,
    reviewCount: 31,
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: "6",
    name: "Priya Singh",
    products: ["Rice", "Groundnut", "Pulses"],
    avgRating: 4.6,
    reviewCount: 27,
    image: "https://randomuser.me/api/portraits/women/63.jpg",
  }
];

export default function FarmersList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [farmers, setFarmers] = useState(mockFarmers);
  
  // Filter farmers based on search query
  const filteredFarmers = farmers.filter(farmer => 
    farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmer.products.some(product => 
      product.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Our Farmers</h1>
        <p className="text-muted-foreground">
          Browse our network of verified farmers and share your experience with their products
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Find Farmers</CardTitle>
          <CardDescription>
            Search by farmer name or product type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search farmers or products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Available Farmers</h2>
        <Separator className="mb-6" />
        
        {filteredFarmers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFarmers.map((farmer) => (
              <FarmerCard
                key={farmer.id}
                id={farmer.id}
                name={farmer.name}
                products={farmer.products}
                avgRating={farmer.avgRating}
                reviewCount={farmer.reviewCount}
                image={farmer.image}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12">
              <p className="text-center text-muted-foreground">
                No farmers found matching your search criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
