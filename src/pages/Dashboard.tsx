
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user) {
      // Show welcome toast when entering dashboard
      toast.success(`Welcome to your profile, ${user.name}!`);
    } else {
      // If somehow there's no user, redirect to sign in
      navigate("/sign-in");
    }
  }, [user, navigate]);

  return <DashboardLayout />;
}
