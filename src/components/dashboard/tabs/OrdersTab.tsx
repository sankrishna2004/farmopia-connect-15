
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for orders
const mockOrders = [
  { id: "ORD-001", status: "delivered", items: ["Rice (5kg)", "Turmeric (200g)"], date: "2023-05-15", total: 650 },
  { id: "ORD-002", status: "processing", items: ["Brown Rice (2kg)", "Chillies (500g)"], date: "2023-05-20", total: 420 },
  { id: "ORD-003", status: "shipped", items: ["Groundnut Oil (1L)"], date: "2023-05-22", total: 320 },
];

interface OrdersTabProps {
  userRole: string;
}

const OrdersTab = ({ userRole }: OrdersTabProps) => {
  const navigate = useNavigate();
  
  const handlePlaceOrder = () => {
    navigate("/products");
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {userRole === "customer" ? "Your Orders" : "Customer Orders"}
          </h2>
          
          {userRole === "customer" && (
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
            {userRole === "customer" && (
              <Button onClick={handlePlaceOrder}>
                Browse Products
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrdersTab;
