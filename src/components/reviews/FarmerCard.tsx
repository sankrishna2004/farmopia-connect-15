
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface FarmerCardProps {
  id: string;
  name: string;
  products: string[];
  avgRating: number;
  reviewCount: number;
  image: string;
}

export default function FarmerCard({ id, name, products, avgRating, reviewCount, image }: FarmerCardProps) {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-square w-full overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{name}</CardTitle>
        <div className="flex items-center gap-1 text-sm">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < avgRating ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-gray-300"}`} 
              />
            ))}
          </div>
          <span className="text-muted-foreground">({reviewCount})</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground">
          Products: {products.join(", ")}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => navigate(`/reviews/${id}`)} className="w-full">
          Write a Review
        </Button>
      </CardFooter>
    </Card>
  );
}
