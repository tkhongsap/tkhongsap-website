import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
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
        {showNameField && (
          <div className="mb-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-primary focus:ring-primary" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <div className={showNameField ? '' : 'flex flex-col sm:flex-row gap-3'}>
          <div className={showNameField ? 'mb-4' : 'flex-1'}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      {!showNameField && (
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <Mail className="h-5 w-5" />
                        </span>
                      )}
                      <Input 
                        placeholder="Your email address" 
                        className={`w-full rounded-md border border-gray-300 focus:border-primary focus:ring-primary ${!showNameField ? 'pl-10 py-3' : 'px-4 py-3'}`}
                        {...field} 
                        required 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className={`bg-primary hover:bg-primary/90 text-white font-medium ${showNameField ? 'w-full py-3' : 'py-3 px-6'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
        
        {showNameField && (
          <p className="text-sm text-[#666666] mt-4 text-center">
            I respect your privacy. Unsubscribe at any time.
          </p>
        )}
      </form>
    </Form>
  );
}
