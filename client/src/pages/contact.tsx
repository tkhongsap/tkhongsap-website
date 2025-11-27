import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Linkedin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactSchemaData = {
    name: "Contact Ta Khongsap - Math, Data Science, AI & Supply Chain Expert",
    description:
      "Get in touch with Ta Khongsap for consulting, speaking engagements, or collaborative projects.",
    url: "https://tkhongsap.io/contact",
    contactPoint: {
      email: "ta.khongsap@gmail.com",
    },
  };

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/contact", data);
      const result = await response.json();

      toast({
        title: "Message sent!",
        description:
          result.message || "Thank you for reaching out. I'll respond soon.",
      });

      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Contact | Ta Khongsap"
        description="Get in touch with Ta Khongsap for consulting, speaking engagements, or collaboration opportunities."
        canonicalUrl="/contact"
        type="website"
        keywords="contact, consulting, collaboration, data science, AI, supply chain"
      />
      <SchemaMarkup type="website" data={contactSchemaData} />

      <div className="bg-[#FAF9F6] min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="editorial-container text-center">
            <h1 className="editorial-headline mb-6">Get in Touch</h1>
            <p className="editorial-prose max-w-xl mx-auto">
              I'm always open to discussing new projects, opportunities for
              collaboration, or just having a conversation.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="pb-8">
          <div className="container max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="mailto:ta.khongsap@gmail.com"
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-lg border border-[#E8E4DF] text-[#5C5C5C] hover:border-[#C45B3E] hover:text-[#C45B3E] transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="font-medium">Email</span>
              </a>

              <a
                href="https://linkedin.com/in/totrakool-k-b504a912"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-lg border border-[#E8E4DF] text-[#5C5C5C] hover:border-[#C45B3E] hover:text-[#C45B3E] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="font-medium">LinkedIn</span>
              </a>

              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-lg border border-[#E8E4DF] text-[#5C5C5C] hover:border-[#C45B3E] hover:text-[#C45B3E] transition-colors"
              >
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Schedule</span>
              </a>
            </div>
          </div>
        </section>

        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <div className="divider-subtle" style={{ margin: "0 0 2rem 0" }} />
        </div>

        {/* Contact Form */}
        <section className="pb-20 md:pb-32">
          <div className="container max-w-xl mx-auto px-4 sm:px-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-xl editorial-card"
              >
                <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-6 text-center">
                  Send a Message
                </h2>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-5">
                      <FormLabel className="text-[#1A1A1A] font-medium text-sm">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="w-full px-4 py-3 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#5C5C5C] focus:outline-none focus:ring-2 focus:ring-[#C45B3E]/30 focus:border-[#C45B3E]"
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
                    <FormItem className="mb-5">
                      <FormLabel className="text-[#1A1A1A] font-medium text-sm">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#5C5C5C] focus:outline-none focus:ring-2 focus:ring-[#C45B3E]/30 focus:border-[#C45B3E]"
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
                      <FormLabel className="text-[#1A1A1A] font-medium text-sm">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What would you like to discuss?"
                          className="w-full px-4 py-3 bg-white border border-[#E8E4DF] rounded-lg text-[#1A1A1A] placeholder-[#5C5C5C] focus:outline-none focus:ring-2 focus:ring-[#C45B3E]/30 focus:border-[#C45B3E] resize-none"
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
                  className="w-full py-3 bg-[#C45B3E] hover:bg-[#A84832] text-white font-medium rounded-lg transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </section>
      </div>
    </>
  );
}
