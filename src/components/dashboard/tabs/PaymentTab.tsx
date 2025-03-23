
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CreditCard, Check } from "lucide-react";

// Create schema for form validation
const paymentFormSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be at least 16 digits").max(19, "Card number must be less than 19 digits"),
  cardHolder: z.string().min(3, "Cardholder name is required"),
  expiryDate: z.string().min(5, "Expiry date is required").max(5, "Invalid expiry date"),
  cvv: z.string().min(3, "CVV is required").max(4, "CVV must be less than 4 digits"),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const PaymentTab = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    },
  });

  function onSubmit(data: PaymentFormValues) {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      toast.success("Payment successful!");
    }, 2000);
  }
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };
  
  // Format expiry date (MM/YY)
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  // Handle payment method selection
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    form.setValue("cardNumber", formatted);
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    form.setValue("expiryDate", formatted);
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Payment Portal</CardTitle>
          <CardDescription>
            Make payments securely for your orders
          </CardDescription>
        </CardHeader>
        
        {paymentSuccess ? (
          <CardContent className="pt-6 pb-10 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Payment Successful!</h3>
              <p className="text-gray-500">Your payment has been processed successfully.</p>
              <Button 
                onClick={() => setPaymentSuccess(false)} 
                variant="outline" 
                className="mt-4"
              >
                Make Another Payment
              </Button>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="4242 4242 4242 4242"
                            onChange={handleCardNumberChange}
                            maxLength={19}
                          />
                          <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cardHolder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="MM/YY" 
                            maxLength={5} 
                            onChange={handleExpiryDateChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="password" 
                            placeholder="123" 
                            maxLength={4} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Pay Now"}
                </Button>
              </form>
            </Form>
          </CardContent>
        )}
        
        <CardFooter className="border-t px-6 py-4 flex justify-between items-center">
          <p className="text-xs text-gray-500">Secured by FarmFresh Pay</p>
          <div className="flex gap-2">
            <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-6" alt="Visa" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-6" alt="Mastercard" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentTab;
