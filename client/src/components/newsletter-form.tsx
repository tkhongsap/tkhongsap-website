import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface NewsletterFormProps {
  className?: string;
  showNameField?: boolean;
}

const subscribeSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type SubscribeValues = z.infer<typeof subscribeSchema>;

export default function NewsletterForm({ 
  className, 
  showNameField = false 
}: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<SubscribeValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(data: SubscribeValues) {
    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/subscribe", data);
      const result = await response.json();
      
      toast({
        title: "Success!",
        description: result.message || "Thanks for subscribing to the newsletter!",
      });
      
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to subscribe",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <div className="space-y-4">
          {showNameField && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      className="w-full px-4 py-3 rounded border border-gray-300 focus:border-primary" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="Your email address" 
                    className="w-full px-4 py-3 rounded border border-gray-300 focus:border-primary" 
                    {...field} 
                    required 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
          
          {showNameField && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              I respect your privacy. Unsubscribe at any time.
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}
