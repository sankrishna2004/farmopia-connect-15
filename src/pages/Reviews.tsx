
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Star, ThumbsUp, MessageCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, {
    message: "Review comment must be at least 10 characters.",
  }),
  productQuality: z.number().min(1).max(5),
  deliveryExperience: z.number().min(1).max(5),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export default function Reviews() {
  const { farmerId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  
  // Mock farmer data - in a real app, this would be fetched from an API
  const farmer = {
    id: farmerId || "1",
    name: "Ramesh Kumar",
    products: ["Rice", "Pulses", "Turmeric"],
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  // Example previous reviews
  const [reviews, setReviews] = useState([
    {
      id: "1",
      customerName: "Priya Singh",
      rating: 4,
      productQuality: 5,
      deliveryExperience: 4,
      comment: "The rice was excellent quality and lasted me for months. Very happy with my purchase!",
      date: "2023-05-15"
    },
    {
      id: "2",
      customerName: "Vikram Reddy",
      rating: 5,
      productQuality: 5,
      deliveryExperience: 5,
      comment: "Best turmeric I've ever used. Very authentic and pure. Will definitely buy again.",
      date: "2023-06-22"
    }
  ]);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
      productQuality: 0,
      deliveryExperience: 0,
    },
  });

  function onSubmit(data: ReviewFormValues) {
    setSubmitting(true);
    
    // In a real app, you would submit this data to your backend API
    setTimeout(() => {
      // Add the new review to the list
      const newReview = {
        id: (reviews.length + 1).toString(),
        customerName: user?.name || "Anonymous",
        rating: data.rating,
        productQuality: data.productQuality,
        deliveryExperience: data.deliveryExperience,
        comment: data.comment,
        date: new Date().toISOString().split('T')[0]
      };
      
      setReviews([newReview, ...reviews]);
      
      toast.success("Review submitted successfully!");
      form.reset();
      setSubmitting(false);
    }, 1000);
  }

  // Rating component for the form
  const RatingInput = ({ name, onChange, value }: { name: string, onChange: (value: number) => void, value: number }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="text-gray-400 focus:outline-none"
          >
            <Star 
              className={`h-6 w-6 ${value >= star ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-gray-300"}`} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-6 flex flex-col">
        <h1 className="text-3xl font-bold">Farmer Reviews</h1>
        <p className="text-muted-foreground">Share your experience with this farmer's products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Farmer Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <img 
                  src={farmer.avatar} 
                  alt={farmer.name} 
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold">{farmer.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Products: {farmer.products.join(", ")}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
              <CardDescription>
                Share your experience with {farmer.name}'s products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overall Rating</FormLabel>
                          <FormControl>
                            <RatingInput
                              name="rating"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="productQuality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Quality</FormLabel>
                          <FormControl>
                            <RatingInput
                              name="productQuality"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="deliveryExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Experience</FormLabel>
                          <FormControl>
                            <RatingInput
                              name="deliveryExperience"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Review</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your experience with this farmer's products..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your honest feedback helps other customers and farmers improve
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Previous Reviews</h2>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-md">{review.customerName}</CardTitle>
                          <CardDescription>{new Date(review.date).toLocaleDateString()}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{review.comment}</p>
                      <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>Product Quality: {review.productQuality}/5</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>Delivery: {review.deliveryExperience}/5</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-6">
                  <p className="text-center text-muted-foreground">No reviews yet. Be the first to leave a review!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
