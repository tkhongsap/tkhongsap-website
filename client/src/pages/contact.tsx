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
import NewsletterForm from "@/components/newsletter-form";
import SEO from "@/components/seo";
import SchemaMarkup from "@/components/schema-markup";
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
  
  // Schema data for the Contact page
  const contactSchemaData = {
    name: 'Contact Ta Khongsap - Math, Data Science, AI & Supply Chain Expert',
    description: 'Get in touch with Ta Khongsap for consulting, speaking engagements, or collaborative projects in mathematics, data science, software development, AI, and supply chain optimization.',
    url: 'https://tkhongsap.io/contact',
    contactPoint: {
      email: 'ta.khongsap@gmail.com',
      telephone: '+66822334499'
    }
  };

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
    <>
      <SEO
        title="Contact | Ta Khongsap"
        description="Get in touch with Ta Khongsap for consulting, speaking engagements, or collaboration opportunities in mathematics, data science, software development, AI, and supply chain optimization."
        canonicalUrl="/contact"
        type="website"
        keywords="contact, consulting, mathematics consulting, software development services, data science, AI expertise, supply chain optimization, collaboration"
      />
      <SchemaMarkup type="website" data={contactSchemaData} />
      
      <div className="pt-20">
        <section id="contact" className="section bg-[#F8F8F8]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h1 className="mb-12 text-center">Contact</h1>
              
              <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/2">
                  <h3 className="mb-6">Get in Touch</h3>
                  <p className="text-[#444444] mb-8">
                    I'm always open to discussing new projects, opportunities for collaboration, or consulting engagements.
                  </p>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-[#333333]">Email</p>
                        <a href="mailto:ta.khongsap@gmail.com" className="text-[#444444] hover:text-primary transition-colors">
                          ta.khongsap@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-[#333333]">Phone</p>
                        <a href="tel:+66822334499" className="text-[#444444] hover:text-primary transition-colors">
                          +66 822 334 499
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <LinkIcon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-[#333333]">LinkedIn</p>
                        <a 
                          href="https://linkedin.com/in/totrakool-k-b504a912" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#444444] hover:text-primary transition-colors"
                        >
                          linkedin.com/in/totrakool-k-b504a912
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <Button 
                      asChild 
                      variant="outline" 
                      className="group py-6 px-8 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      <a 
                        href="https://calendly.com" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                      >
                        <Calendar className="h-5 w-5 mr-3" />
                        Schedule a Meeting
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="card p-8">
                      <h3 className="mb-6">Send a Message</h3>
                      
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="mb-6">
                            <FormLabel className="text-[#333333] font-medium">Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your name" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-primary" 
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
                          <FormItem className="mb-6">
                            <FormLabel className="text-[#333333] font-medium">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Your email address" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-primary" 
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
                          <FormItem className="mb-8">
                            <FormLabel className="text-[#333333] font-medium">Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Your message" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-primary" 
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
                        className="w-full py-6 bg-primary hover:bg-primary/90 text-white font-medium" 
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
        <section id="newsletter" className="section bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-6">Join My Newsletter</h2>
              <p className="text-[#444444] mb-10 max-w-2xl mx-auto">
                Get weekly insights on AI trends, technology developments, and thoughts on balancing innovation with wellbeing. I share my weekend coding projects and writing about responsible AI implementation.
              </p>
              
              <div className="bg-[#F8F8F8] p-10 rounded-lg shadow-sm">
                <NewsletterForm showNameField={true} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
