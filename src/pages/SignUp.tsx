import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/layout/Header";

// Schemas for form validation
const customerSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const farmerSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  farmLocation: z.string().min(2, {
    message: "Farm location must be at least 2 characters.",
  }),
  farmDescription: z.string().min(10, {
    message: "Farm description must be at least 10 characters.",
  }),
  phoneNumber: z.string().regex(/^(\+?\d{1,4}?)?\d{8,15}$/, {
    message: "Invalid phone number.",
  }),
});

// Create types from the schemas
type FarmerFormValues = z.infer<typeof farmerSchema>;
type CustomerFormValues = z.infer<typeof customerSchema>;

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if farmer signup based on URL
  const isFarmer = location.pathname === "/sign-up/farmer";
  
  // Initialize the appropriate form based on user type
  const farmerForm = useForm<FarmerFormValues>({
    resolver: zodResolver(farmerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      location: "",
      farmLocation: "",
      farmDescription: "",
      phoneNumber: "",
    },
  });

  const customerForm = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Use the appropriate form
  const form = isFarmer ? farmerForm : customerForm;

  // Handle form submission
  const onSubmit = async (data: FarmerFormValues | CustomerFormValues) => {
    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success!",
        description: "You have successfully signed up.",
      });
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {isFarmer ? "Create a Farmer Account" : "Create a Customer Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isFarmer
              ? "Let's get your farm connected to local buyers."
              : "Sign up to start sourcing directly from local farms."}
          </p>
        </div>
      </div>
      
      <div className="max-w-md w-full mx-auto p-6 bg-card shadow-lg rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {isFarmer && (
              <>
                <FormField
                  control={farmerForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={farmerForm.control}
                  name="farmLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farm Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your farm location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={farmerForm.control}
                  name="farmDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farm Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Describe your farm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={farmerForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button disabled={isLoading} className="w-full" type="submit">
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Log In
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default SignUp;
