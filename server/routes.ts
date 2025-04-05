import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
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
        console.log("Subscriber already exists:", existingSubscriber);
        return res.status(200).json({ 
          success: true, 
          message: "You're already subscribed to our newsletter!" 
        });
      }
      
      // Create new subscriber
      console.log("Creating new subscriber with data:", subscriberData);
      const newSubscriber = await storage.createSubscriber(subscriberData);
      console.log("Subscriber created successfully:", newSubscriber);
      
      res.status(201).json({ 
        success: true, 
        message: "Successfully subscribed to the newsletter!" 
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

  const httpServer = createServer(app);

  return httpServer;
}
