
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Define the form schema with Zod
const formSchema = z.object({
  otp: z.string().min(6, { message: "Please enter a valid 6-digit code" }),
});

// Type for our form
type FormValues = z.infer<typeof formSchema>;

const OTPVerification = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get email from URL params
  const email = searchParams.get("email") || "your email";

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Countdown timer for resend functionality
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // This would be replaced with actual API call to verify OTP
      console.log("Verifying OTP:", data.otp, "for email:", email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success toast
      toast({
        title: "Verification successful",
        description: "Your email has been verified successfully.",
        variant: "default",
      });
      
      // Redirect to home or dashboard based on user role
      navigate("/");
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "The code you entered is incorrect. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (!canResend) return;
    
    try {
      // This would be replaced with actual API call to resend OTP
      console.log("Resending OTP to:", email);
      
      // Reset timer
      setTimeLeft(30);
      setCanResend(false);
      
      // Success toast
      toast({
        title: "OTP resent",
        description: "A new verification code has been sent to your email.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to resend",
        description: "We couldn't send a new code. Please try again later.",
        variant: "destructive",
      });
    }
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
          className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold">Verify Your Email</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              We've sent a 6-digit verification code to <span className="font-medium">{email}</span>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        render={({ slots }) => (
                          <InputOTPGroup>
                            {slots.map((slot, i) => (
                              <InputOTPSlot key={i} index={i} />
                            ))}
                          </InputOTPGroup>
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            <p>
              Didn't receive the code?{" "}
              {canResend ? (
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary hover:text-primary/80 font-medium"
                  onClick={handleResendOTP}
                >
                  Resend Code
                </Button>
              ) : (
                <span className="text-muted-foreground">
                  Resend in {timeLeft}s
                </span>
              )}
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default OTPVerification;
