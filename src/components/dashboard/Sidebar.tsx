
import { User } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings, ShoppingBag, MessageCircle, Package, LogOut } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User;
  handleLogout: () => void;
}

const Sidebar = ({ activeTab, setActiveTab, user, handleLogout }: SidebarProps) => {
  return (
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
  );
};

export default Sidebar;
