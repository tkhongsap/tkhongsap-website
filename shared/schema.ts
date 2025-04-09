import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Updated subscriber table with additional fields
export const subscriberTable = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  // Add status field with default value 'pending'
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  subscriptionDate: timestamp("subscription_date").notNull().defaultNow(),
  confirmationDate: timestamp("confirmation_date"),
  confirmationToken: varchar("confirmation_token", { length: 255 }),
  tokenExpiration: timestamp("token_expiration"),
  lastEmailSent: timestamp("last_email_sent"),
  unsubscribeToken: varchar("unsubscribe_token", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Newsletters table for storing newsletter content
export const newsletterTable = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  subject: varchar("subject", { length: 255 }).notNull(),
  content: text("content").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("draft"),
  scheduledDate: timestamp("scheduled_date"),
  sentDate: timestamp("sent_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Newsletter tracking table
export const newsletterTrackingTable = pgTable("newsletter_tracking", {
  id: serial("id").primaryKey(),
  newsletterId: integer("newsletter_id").notNull(),
  subscriberId: integer("subscriber_id").notNull(),
  emailSent: boolean("email_sent").notNull().default(false),
  emailOpened: boolean("email_opened").notNull().default(false),
  openDate: timestamp("open_date"),
  linkClicked: boolean("link_clicked").notNull().default(false),
  clickDate: timestamp("click_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Schema for inserting users
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Schema for inserting subscribers
export const insertSubscriberSchema = createInsertSchema(subscriberTable).pick({
  name: true,
  email: true,
});

// Schema for creating newsletters
export const insertNewsletterSchema = createInsertSchema(newsletterTable).pick({
  subject: true,
  content: true,
  status: true,
  scheduledDate: true,
});

// Schema for tracking newsletter engagement
export const insertNewsletterTrackingSchema = createInsertSchema(newsletterTrackingTable).pick({
  newsletterId: true,
  subscriberId: true,
  emailSent: true,
});

// Schema for contact messages
export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  message: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscriberTable.$inferSelect;

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletterTable.$inferSelect;

export type InsertNewsletterTracking = z.infer<typeof insertNewsletterTrackingSchema>;
export type NewsletterTracking = typeof newsletterTrackingTable.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
