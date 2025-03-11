
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, UserRound } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"farmer" | "customer" | null>(null);

  const handleRoleSelect = (role: "farmer" | "customer") => {
    setSelectedRole(role);
    navigate(`/sign-up/${role}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col"
    >
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full max-w-3xl space-y-8"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold">Join FarmFresh Connect</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Choose how you want to use our platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedRole === "customer" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleRoleSelect("customer")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserRound className="h-6 w-6" />
                  Join as a Customer
                </CardTitle>
                <CardDescription>
                  Browse and buy fresh products directly from local farmers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Browse local farmers and their products</li>
                  <li>• Contact farmers directly</li>
                  <li>• Schedule pickups or deliveries</li>
                  <li>• Leave reviews and ratings</li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedRole === "farmer" ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => handleRoleSelect("farmer")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-6 w-6" />
                  Join as a Farmer
                </CardTitle>
                <CardDescription>
                  List your products and connect with local customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Create your farmer profile</li>
                  <li>• List and manage your products</li>
                  <li>• Receive orders and inquiries</li>
                  <li>• Build your customer base</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default RoleSelection;
