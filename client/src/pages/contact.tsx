import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, Link as LinkIcon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/contact", data);
      const result = await response.json();
      
      toast({
        title: "Success!",
        description: result.message || "Message sent successfully! I'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="pt-20">
      <section id="contact" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10">Contact</h2>
            
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
                <p className="text-lg text-gray-700 mb-8">
                  I'm always open to discussing new projects, opportunities for collaboration, or consulting engagements.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:ta.khongsap@gmail.com" className="text-gray-700 hover:text-primary transition-colors">
                        ta.khongsap@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+66822334499" className="text-gray-700 hover:text-primary transition-colors">
                        +66 822 334 499
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <LinkIcon className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <a 
                        href="https://linkedin.com/in/totrakool-k-b504a912" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-gray-700 hover:text-primary transition-colors"
                      >
                        linkedin.com/in/totrakool-k-b504a912
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                    <a href="#" className="inline-flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Schedule a Meeting
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6">Send a Message</h3>
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="text-gray-700 font-medium">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              className="w-full px-4 py-2 border border-gray-300 rounded focus:border-primary" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your email address" 
                              className="w-full px-4 py-2 border border-gray-300 rounded focus:border-primary" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="mb-6">
                          <FormLabel className="text-gray-700 font-medium">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message" 
                              className="w-full px-4 py-2 border border-gray-300 rounded focus:border-primary" 
                              rows={5}
                              {...field} 
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
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section id="newsletter" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join My Newsletter</h2>
            <p className="text-lg text-gray-700 mb-8">
              Get weekly insights on AI trends, technology developments, and thoughts on balancing innovation with wellbeing. I share my weekend coding projects and writing about responsible AI implementation.
            </p>
            
            <div className="bg-gray-100 p-8 rounded-lg">
              <NewsletterForm showNameField={true} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
