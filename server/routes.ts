import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertSubscriberSchema,
  insertNewsletterSchema,
  insertNewsletterTrackingSchema
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import crypto from "crypto";
import { emailService } from "./email-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // Sitemap.xml endpoint
  app.get("/sitemap.xml", (req, res) => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://totrakoolkhongsap.replit.app/</loc>
    <lastmod>2025-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://totrakoolkhongsap.replit.app/about</loc>
    <lastmod>2025-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://totrakoolkhongsap.replit.app/portfolio</loc>
    <lastmod>2025-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://totrakoolkhongsap.replit.app/writing</loc>
    <lastmod>2025-04-05</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://totrakoolkhongsap.replit.app/contact</loc>
    <lastmod>2025-04-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
    
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });
  
  // Newsletter subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      console.log("Subscription request received:", req.body);
      
      const subscriberData = insertSubscriberSchema.parse(req.body);
      console.log("Parsed subscription data:", subscriberData);
      
      // Check if subscriber already exists
      console.log("Checking if email already exists:", subscriberData.email);
      const existingSubscriber = await storage.getSubscriberByEmail(subscriberData.email);
      
      if (existingSubscriber) {
        // If the subscriber exists but is unsubscribed, we can resubscribe them
        if (existingSubscriber.status === "unsubscribed") {
          console.log("Resubscribing previously unsubscribed user:", existingSubscriber.email);
          const updatedSubscriber = await storage.updateSubscriberStatus(existingSubscriber.id, "pending");
          
          // Generate a new confirmation token
          const token = crypto.randomBytes(32).toString('hex');
          const tokenExpiration = new Date();
          tokenExpiration.setHours(tokenExpiration.getHours() + 24); // 24-hour expiration
          
          await storage.createConfirmationToken(existingSubscriber.id, token, tokenExpiration);
          
          // Send confirmation email
          const confirmationUrl = `${process.env.SITE_URL || `https://${req.headers.host}`}/api/newsletter/confirm?token=${token}`;
          await emailService.sendConfirmationEmail(updatedSubscriber!, confirmationUrl);
          
          return res.status(200).json({ 
            success: true, 
            message: "Thanks for subscribing again! Please check your email to confirm your subscription." 
          });
        }
        
        // Otherwise, they're already subscribed
        console.log("Subscriber already exists:", existingSubscriber);
        
        // If pending, remind them to confirm
        if (existingSubscriber.status === "pending") {
          return res.status(200).json({ 
            success: true, 
            message: "You're already subscribed! Please check your email to confirm your subscription." 
          });
        }
        
        // If confirmed, let them know they're already subscribed
        return res.status(200).json({ 
          success: true, 
          message: "You're already subscribed to our newsletter!" 
        });
      }
      
      // Create new subscriber
      console.log("Creating new subscriber with data:", subscriberData);
      const newSubscriber = await storage.createSubscriber(subscriberData);
      console.log("Subscriber created successfully:", newSubscriber);
      
      // Generate a confirmation token
      const token = crypto.randomBytes(32).toString('hex');
      const tokenExpiration = new Date();
      tokenExpiration.setHours(tokenExpiration.getHours() + 24); // 24-hour expiration
      
      await storage.createConfirmationToken(newSubscriber.id, token, tokenExpiration);
      
      // Send confirmation email
      const confirmationUrl = `${process.env.SITE_URL || `https://${req.headers.host}`}/api/newsletter/confirm?token=${token}`;
      await emailService.sendConfirmationEmail(newSubscriber, confirmationUrl);
      
      res.status(201).json({ 
        success: true, 
        message: "Thanks for subscribing! Please check your email to confirm your subscription." 
      });
    } catch (error) {
      console.error("Error in subscribe endpoint:", error);
      
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        console.log("Validation error:", validationError.message);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while subscribing to the newsletter." 
      });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      
      // Create new contact message
      const newMessage = await storage.createContactMessage(messageData);
      
      res.status(201).json({ 
        success: true, 
        message: "Message sent successfully! I'll get back to you soon." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while sending your message." 
      });
    }
  });

  // Get all subscribers (admin endpoint)
  app.get("/api/subscribers", async (req, res) => {
    try {
      const subscribers = await storage.getAllSubscribers();
      res.status(200).json(subscribers);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching subscribers." 
      });
    }
  });

  // Get all contact messages (admin endpoint)
  app.get("/api/contact-messages", async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while fetching contact messages." 
      });
    }
  });
  
  // Confirm subscription endpoint
  app.get("/api/newsletter/confirm", async (req, res) => {
    try {
      const token = req.query.token as string;
      
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "Invalid token"
        });
      }
      
      // Find subscriber by token
      const subscriber = await storage.getSubscriberByConfirmationToken(token);
      
      if (!subscriber) {
        return res.status(404).json({
          success: false,
          message: "Invalid or expired token"
        });
      }
      
      // Check if token is expired
      if (subscriber.tokenExpiration && new Date(subscriber.tokenExpiration) < new Date()) {
        return res.status(400).json({
          success: false,
          message: "Confirmation link has expired. Please request a new one."
        });
      }
      
      // Update subscriber status to confirmed
      const now = new Date();
      const confirmedSubscriber = await storage.updateSubscriberConfirmation(subscriber.id, now);
      
      // Clear confirmation token (empty string and past date to prevent reuse)
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1); // 1 day in the past
      await storage.createConfirmationToken(subscriber.id, "", pastDate);
      
      // Send welcome email
      await emailService.sendWelcomeEmail(confirmedSubscriber!);
      
      // Redirect to confirmation success page
      // (in a real app, we'd have a nice confirmation page)
      res.redirect(`/?confirmed=true`);
      
    } catch (error) {
      console.error("Error in confirm subscription endpoint:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while confirming your subscription"
      });
    }
  });
  
  // Resend confirmation email endpoint
  app.post("/api/newsletter/resend-confirmation", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required"
        });
      }
      
      // Find subscriber by email
      const subscriber = await storage.getSubscriberByEmail(email);
      
      if (!subscriber) {
        return res.status(404).json({
          success: false,
          message: "Email address not found"
        });
      }
      
      // Check if subscriber is already confirmed
      if (subscriber.status === "confirmed") {
        return res.status(400).json({
          success: false,
          message: "Your subscription is already confirmed"
        });
      }
      
      // Generate a new confirmation token
      const token = crypto.randomBytes(32).toString('hex');
      const tokenExpiration = new Date();
      tokenExpiration.setHours(tokenExpiration.getHours() + 24); // 24-hour expiration
      
      await storage.createConfirmationToken(subscriber.id, token, tokenExpiration);
      
      // Send confirmation email
      const confirmationUrl = `${process.env.SITE_URL || `https://${req.headers.host}`}/api/newsletter/confirm?token=${token}`;
      await emailService.sendConfirmationEmail(subscriber, confirmationUrl);
      
      res.status(200).json({
        success: true,
        message: "Confirmation email has been resent. Please check your inbox."
      });
      
    } catch (error) {
      console.error("Error in resend confirmation endpoint:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while resending the confirmation email"
      });
    }
  });
  
  // Unsubscribe endpoint
  app.get("/api/newsletter/unsubscribe", async (req, res) => {
    try {
      const token = req.query.token as string;
      
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "Invalid token"
        });
      }
      
      // Find subscriber by unsubscribe token
      const subscriber = await storage.getSubscriberByUnsubscribeToken(token);
      
      if (!subscriber) {
        return res.status(404).json({
          success: false,
          message: "Invalid unsubscribe token"
        });
      }
      
      // Update subscriber status to unsubscribed
      await storage.updateSubscriberStatus(subscriber.id, "unsubscribed");
      
      // Redirect to unsubscribe confirmation page
      res.redirect(`/?unsubscribed=true`);
      
    } catch (error) {
      console.error("Error in unsubscribe endpoint:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your unsubscribe request"
      });
    }
  });
  
  // Newsletter email tracking endpoints
  app.get("/api/newsletter/track/open", async (req, res) => {
    try {
      const id = parseInt(req.query.id as string);
      
      if (isNaN(id)) {
        // Return a 1x1 transparent pixel even on error
        return res.status(200)
          .header('Content-Type', 'image/gif')
          .send(Buffer.from('R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 'base64'));
      }
      
      // Update tracking record
      await storage.updateTrackingOpened(id, new Date());
      
      // Return a 1x1 transparent pixel
      res.status(200)
        .header('Content-Type', 'image/gif')
        .send(Buffer.from('R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 'base64'));
        
    } catch (error) {
      console.error("Error in email open tracking:", error);
      // Return a 1x1 transparent pixel even on error
      res.status(200)
        .header('Content-Type', 'image/gif')
        .send(Buffer.from('R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 'base64'));
    }
  });
  
  app.get("/api/newsletter/track/click", async (req, res) => {
    try {
      const id = parseInt(req.query.id as string);
      const url = req.query.url as string;
      
      if (isNaN(id) || !url) {
        return res.redirect(url || '/');
      }
      
      // Update tracking record
      await storage.updateTrackingClicked(id, new Date());
      
      // Redirect to the original URL
      res.redirect(url);
        
    } catch (error) {
      console.error("Error in email click tracking:", error);
      // Redirect to the URL anyway to preserve user experience
      res.redirect(req.query.url as string || '/');
    }
  });
  
  // Admin API endpoints for newsletters
  
  // Get all newsletters
  app.get("/api/newsletters", async (req, res) => {
    try {
      const newsletters = await storage.getAllNewsletters();
      res.status(200).json(newsletters);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching newsletters."
      });
    }
  });
  
  // Get newsletters by status
  app.get("/api/newsletters/status/:status", async (req, res) => {
    try {
      const status = req.params.status;
      const newsletters = await storage.getNewslettersByStatus(status);
      res.status(200).json(newsletters);
    } catch (error) {
      console.error(`Error fetching newsletters with status ${req.params.status}:`, error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching newsletters."
      });
    }
  });
  
  // Get newsletter by ID
  app.get("/api/newsletters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid newsletter ID"
        });
      }
      
      const newsletter = await storage.getNewsletterById(id);
      
      if (!newsletter) {
        return res.status(404).json({
          success: false,
          message: "Newsletter not found"
        });
      }
      
      res.status(200).json(newsletter);
    } catch (error) {
      console.error(`Error fetching newsletter ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching the newsletter."
      });
    }
  });
  
  // Create new newsletter
  app.post("/api/newsletters", async (req, res) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      const newNewsletter = await storage.createNewsletter(newsletterData);
      
      res.status(201).json({
        success: true,
        message: "Newsletter created successfully",
        newsletter: newNewsletter
      });
    } catch (error) {
      console.error("Error creating newsletter:", error);
      
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: validationError.message
        });
      }
      
      res.status(500).json({
        success: false,
        message: "An error occurred while creating the newsletter."
      });
    }
  });
  
  // Update newsletter status
  app.patch("/api/newsletters/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid newsletter ID"
        });
      }
      
      if (!status || !["draft", "scheduled", "sent"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status. Must be 'draft', 'scheduled', or 'sent'."
        });
      }
      
      const newsletter = await storage.getNewsletterById(id);
      
      if (!newsletter) {
        return res.status(404).json({
          success: false,
          message: "Newsletter not found"
        });
      }
      
      const updatedNewsletter = await storage.updateNewsletterStatus(id, status);
      
      res.status(200).json({
        success: true,
        message: `Newsletter status updated to ${status}`,
        newsletter: updatedNewsletter
      });
    } catch (error) {
      console.error(`Error updating newsletter status for ID ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: "An error occurred while updating the newsletter status."
      });
    }
  });
  
  // Send newsletter immediately
  app.post("/api/newsletters/:id/send", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid newsletter ID"
        });
      }
      
      const newsletter = await storage.getNewsletterById(id);
      
      if (!newsletter) {
        return res.status(404).json({
          success: false,
          message: "Newsletter not found"
        });
      }
      
      // Get confirmed subscribers
      const subscribers = await storage.getSubscribersByStatus("confirmed");
      
      if (subscribers.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No confirmed subscribers to send to"
        });
      }
      
      // Create tracking records and send emails
      const now = new Date();
      const sendResult = {
        success: 0,
        failed: 0,
        details: [] as {email: string, success: boolean, error?: string}[]
      };
      
      // Set newsletter as sent
      await storage.updateNewsletterSentDate(id, now);
      
      // Send to each subscriber
      for (const subscriber of subscribers) {
        try {
          // Create tracking record
          const tracking = await storage.createNewsletterTracking({
            newsletterId: id,
            subscriberId: subscriber.id,
            emailSent: true
          });
          
          // Send the email
          const success = await emailService.sendNewsletterToSubscriber(
            newsletter, 
            subscriber, 
            tracking.id
          );
          
          // Update last email sent date
          await storage.updateLastEmailSent(subscriber.id, now);
          
          if (success) {
            sendResult.success++;
            sendResult.details.push({ email: subscriber.email, success: true });
          } else {
            sendResult.failed++;
            sendResult.details.push({ 
              email: subscriber.email, 
              success: false, 
              error: "Failed to send email" 
            });
          }
        } catch (error) {
          sendResult.failed++;
          sendResult.details.push({ 
            email: subscriber.email, 
            success: false, 
            error: error instanceof Error ? error.message : "Unknown error" 
          });
        }
      }
      
      res.status(200).json({
        success: true,
        message: `Newsletter sent to ${sendResult.success} subscribers (${sendResult.failed} failed)`,
        results: sendResult
      });
    } catch (error) {
      console.error(`Error sending newsletter ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: "An error occurred while sending the newsletter."
      });
    }
  });
  
  // Get newsletter stats
  app.get("/api/newsletters/:id/stats", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid newsletter ID"
        });
      }
      
      const newsletter = await storage.getNewsletterById(id);
      
      if (!newsletter) {
        return res.status(404).json({
          success: false,
          message: "Newsletter not found"
        });
      }
      
      const stats = await storage.getNewsletterStats(id);
      
      res.status(200).json({
        success: true,
        newsletterId: id,
        title: newsletter.subject,
        stats
      });
    } catch (error) {
      console.error(`Error fetching stats for newsletter ${req.params.id}:`, error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching newsletter statistics."
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
