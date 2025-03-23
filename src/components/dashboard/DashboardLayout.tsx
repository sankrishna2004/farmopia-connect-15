import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import Sidebar from "./Sidebar";
import ProfileTab from "./tabs/ProfileTab";
import OrdersTab from "./tabs/OrdersTab";
import ProductsTab from "./tabs/ProductsTab";
import FarmersTab from "./tabs/FarmersTab";
import FilterSidebar from "./FilterSidebar";

export default function DashboardLayout() {
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || "profile");

  useEffect(() => {
    if (tabParam && ["profile", "products", "orders", "farmers"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    setSearchParams({
      tab: activeTab
    });
  }, [activeTab, setSearchParams]);
  
  const handleLogout = () => {
    logout();
    navigate("/");
    toast.info("You have been logged out");
  };
  
  if (!user) {
    navigate("/sign-in");
    return null;
  }
  
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center bg-green-50">
          <h1 className="text-2xl font-bold text-lime-700">FarmFresh</h1>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full overflow-hidden">
                      <img 
                        src="/lovable-uploads/8d4a578a-f2e7-4c6b-a6e1-efc6deaf426b.png" 
                        alt="Profile" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-xs">{user.name}</span>
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

      <main className="container mx-auto py-8 px-4">
        <div className="grid md:grid-cols-[240px_1fr] gap-6">
          <div className="space-y-4">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} handleLogout={handleLogout} />
            
            {activeTab === "farmers" && user.role === "customer" && <FilterSidebar />}
          </div>
          
          <div className="space-y-6">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "orders" && <OrdersTab userRole={user.role} />}
            {activeTab === "products" && user.role === "farmer" && <ProductsTab />}
            {activeTab === "farmers" && user.role === "customer" && <FarmersTab />}
          </div>
        </div>
      </main>
    </motion.div>;
}
