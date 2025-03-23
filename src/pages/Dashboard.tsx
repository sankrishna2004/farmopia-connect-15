
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Package, ShoppingBag, MessageCircle, Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Mock data for orders
const mockOrders = [
  { id: "ORD-001", status: "delivered", items: ["Rice (5kg)", "Turmeric (200g)"], date: "2023-05-15", total: 650 },
  { id: "ORD-002", status: "processing", items: ["Brown Rice (2kg)", "Chillies (500g)"], date: "2023-05-20", total: 420 },
  { id: "ORD-003", status: "shipped", items: ["Groundnut Oil (1L)"], date: "2023-05-22", total: 320 },
];

// Mock data for products (for farmers)
const mockProducts = [
  { id: 1, name: "Organic Rice", price: 120, stock: 50, category: "Rice" },
  { id: 2, name: "Premium Turmeric Powder", price: 85, stock: 30, category: "Turmeric" },
  { id: 3, name: "Red Chillies", price: 65, stock: 45, category: "Chillies" },
];

// Mock data for farmer connections (for customers)
const mockFarmers = [
  { id: "1", name: "Ramesh Kumar", specialty: ["Rice", "Pulses"], location: "Karnataka", rating: 4.5 },
  { id: "2", name: "Lakshmi Devi", specialty: ["Turmeric", "Chillies"], location: "Andhra Pradesh", rating: 4.8 },
  { id: "3", name: "Suresh Reddy", specialty: ["Groundnut", "Rice"], location: "Telangana", rating: 4.2 },
];

// Mock data for specialties (for filtering)
const specialties = ["Rice", "Pulses", "Turmeric", "Chillies", "Groundnut", "Storage Crops"];

// Mock data for locations (for filtering)
const locations = ["Karnataka", "Andhra Pradesh", "Telangana", "Tamil Nadu", "Kerala"];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState(tabParam || "profile");
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "9876543210", // Mock data
    address: "123 Farm Road, Rural District", // Mock data
    bio: user?.role === "farmer" 
      ? "Growing traditional crops using sustainable farming practices for over 15 years."
      : "Health-conscious consumer looking for high-quality farm products.",
    specialties: user?.role === "farmer" ? ["Rice", "Pulses"] : [],
    location: "Karnataka",
  });
  
  // Effect to handle URL parameters for tab selection
  useEffect(() => {
    if (tabParam && ["profile", "products", "orders", "farmers"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
  
  // Effect to update URL when tab changes
  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);
  
  // Filtering states for customers view
  const [locationFilter, setLocationFilter] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [filteredFarmers, setFilteredFarmers] = useState(mockFarmers);
  
  // Product management for farmers
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", category: "" });
  
  useEffect(() => {
    // Filter farmers based on selected filters
    if (user?.role === "customer") {
      let filtered = [...mockFarmers];
      
      if (locationFilter) {
        filtered = filtered.filter(farmer => farmer.location === locationFilter);
      }
      
      if (specialtyFilter) {
        filtered = filtered.filter(farmer => farmer.specialty.includes(specialtyFilter));
      }
      
      setFilteredFarmers(filtered);
    }
  }, [locationFilter, specialtyFilter, user?.role]);

  const handleSaveProfile = () => {
    setEditMode(false);
    toast.success("Profile updated successfully!");
  };
  
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
  
  const handleLogout = () => {
    logout();
    navigate("/");
    toast.info("You have been logged out");
  };
  
  const handleConnectFarmer = (farmerId: string) => {
    toast.success(`Connected with farmer. A message has been sent.`);
  };
  
  const handlePlaceOrder = () => {
    navigate("/products");
  };

  if (!user) {
    navigate("/sign-in");
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Dashboard Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Faropia</h1>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <span>{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveTab("profile")}>
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="grid md:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <Button 
                      variant={activeTab === "profile" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("profile")}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </li>
                  
                  {user.role === "customer" ? (
                    <>
                      <li>
                        <Button 
                          variant={activeTab === "orders" ? "default" : "ghost"} 
                          className="w-full justify-start"
                          onClick={() => setActiveTab("orders")}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          My Orders
                        </Button>
                      </li>
                      <li>
                        <Button 
                          variant={activeTab === "farmers" ? "default" : "ghost"} 
                          className="w-full justify-start"
                          onClick={() => setActiveTab("farmers")}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Connect with Farmers
                        </Button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Button 
                          variant={activeTab === "products" ? "default" : "ghost"} 
                          className="w-full justify-start"
                          onClick={() => setActiveTab("products")}
                        >
                          <Package className="h-4 w-4 mr-2" />
                          My Products
                        </Button>
                      </li>
                      <li>
                        <Button 
                          variant={activeTab === "orders" ? "default" : "ghost"} 
                          className="w-full justify-start"
                          onClick={() => setActiveTab("orders")}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Orders
                        </Button>
                      </li>
                    </>
                  )}
                  
                  <li>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </li>
                </ul>
              </nav>
            </Card>
            
            {activeTab === "farmers" && user.role === "customer" && (
              <Card>
                <CardContent className="p-4 space-y-4">
                  <h3 className="font-medium">Filter Farmers</h3>
                  
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    >
                      <option value="">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Specialty</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={specialtyFilter}
                      onChange={(e) => setSpecialtyFilter(e.target.value)}
                    >
                      <option value="">All Specialties</option>
                      {specialties.map(specialty => (
                        <option key={specialty} value={specialty}>{specialty}</option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Main Content */}
          <div className="space-y-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Your Profile</h2>
                    {!editMode ? (
                      <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
                    ) : (
                      <Button onClick={handleSaveProfile}>Save Changes</Button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          disabled={!editMode}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          disabled={!editMode}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          disabled={!editMode}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                          disabled={!editMode}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <select 
                          id="location"
                          className="w-full p-2 border rounded-md"
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          disabled={!editMode}
                        >
                          {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                          ))}
                        </select>
                      </div>
                      
                      {user.role === "farmer" && (
                        <div>
                          <Label>Specialties</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {editMode ? (
                              specialties.map(specialty => (
                                <Badge 
                                  key={specialty}
                                  variant={profileData.specialties.includes(specialty) ? "default" : "outline"}
                                  className="cursor-pointer"
                                  onClick={() => {
                                    if (profileData.specialties.includes(specialty)) {
                                      setProfileData({
                                        ...profileData, 
                                        specialties: profileData.specialties.filter(s => s !== specialty)
                                      });
                                    } else {
                                      setProfileData({
                                        ...profileData, 
                                        specialties: [...profileData.specialties, specialty]
                                      });
                                    }
                                  }}
                                >
                                  {specialty}
                                </Badge>
                              ))
                            ) : (
                              profileData.specialties.map(specialty => (
                                <Badge key={specialty}>{specialty}</Badge>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio"
                      className="w-full p-2 border rounded-md h-24"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Orders Tab (both for customers and farmers) */}
            {activeTab === "orders" && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">
                      {user.role === "customer" ? "Your Orders" : "Customer Orders"}
                    </h2>
                    
                    {user.role === "customer" && (
                      <Button onClick={handlePlaceOrder}>
                        Place New Order
                      </Button>
                    )}
                  </div>
                  
                  {mockOrders.length > 0 ? (
                    <div className="space-y-4">
                      {mockOrders.map(order => (
                        <Card key={order.id} className="overflow-hidden">
                          <div className="border-l-4 border-primary p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{order.id}</h3>
                                <p className="text-sm text-muted-foreground">Ordered on: {order.date}</p>
                                <div className="mt-2">
                                  {order.items.map((item, index) => (
                                    <span key={index} className="text-sm block">{item}</span>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <Badge className={
                                  order.status === "delivered" ? "bg-green-500" :
                                  order.status === "processing" ? "bg-blue-500" : "bg-yellow-500"
                                }>
                                  {order.status}
                                </Badge>
                                <p className="mt-2 font-medium">₹{order.total}</p>
                              </div>
                            </div>
                            
                            <div className="flex justify-end mt-4">
                              <Button variant="outline" size="sm">
                                {order.status === "delivered" ? "Leave Review" : "Track Order"}
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <p className="mb-2">No orders found</p>
                      {user.role === "customer" && (
                        <Button onClick={handlePlaceOrder}>
                          Browse Products
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* Products Tab (for farmers only) */}
            {activeTab === "products" && user.role === "farmer" && (
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
            )}
            
            {/* Connect with Farmers Tab (for customers only) */}
            {activeTab === "farmers" && user.role === "customer" && (
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
            )}
          </div>
        </div>
      </main>
    </motion.div>
  );
}
