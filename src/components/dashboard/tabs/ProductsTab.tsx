
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock data for products (for farmers)
const mockProducts = [
  { id: 1, name: "Organic Rice", price: 120, stock: 50, category: "Rice" },
  { id: 2, name: "Premium Turmeric Powder", price: 85, stock: 30, category: "Turmeric" },
  { id: 3, name: "Red Chillies", price: 65, stock: 45, category: "Chillies" },
];

// Mock data for specialties (for filtering)
const specialties = ["Rice", "Pulses", "Turmeric", "Chillies", "Groundnut", "Storage Crops"];

const ProductsTab = () => {
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", category: "" });
  
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category) {
      toast.error("Please fill all product details");
      return;
    }
    
    // In a real app, this would save to the database
    toast.success(`Added product: ${newProduct.name}`);
    setNewProduct({ name: "", price: "", stock: "", category: "" });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
          
          <form onSubmit={handleAddProduct} className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="product-name">Product Name</Label>
              <Input 
                id="product-name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="product-category">Category</Label>
              <select 
                id="product-category"
                className="w-full p-2 border rounded-md"
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                required
              >
                <option value="">Select Category</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="product-price">Price (₹)</Label>
              <Input 
                id="product-price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="product-stock">Stock</Label>
              <Input 
                id="product-stock"
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <Button type="submit" className="mt-2">
                Add Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Your Products</h2>
          
          {mockProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mockProducts.map(product => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <Badge variant="outline" className="mt-1">{product.category}</Badge>
                      </div>
                      <p className="font-semibold">₹{product.price}</p>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Stock: {product.stock}
                      </span>
                      
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No products added yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsTab;
