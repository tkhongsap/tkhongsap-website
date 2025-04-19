import { db } from './db';
import { 
  users, 
  subscriberTable, 
  contactMessages,
  newsletterTable,
  newsletterTrackingTable,
  type User, 
  type InsertUser,
  type Subscriber, 
  type InsertSubscriber,
  type ContactMessage,
  type InsertContactMessage,
  type Newsletter,
  type InsertNewsletter,
  type NewsletterTracking,
  type InsertNewsletterTracking
} from '@shared/schema';
import { eq, and, count, sql, gte, lte } from 'drizzle-orm';
import { IStorage } from './storage';
import { hashPassword } from './auth-utils';

export class PgStorage implements IStorage {
  constructor() {
    console.log("PgStorage initialized with PostgreSQL database");
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.id, id));
      return result[0];
    } catch (error) {
      console.error("Error in getUser:", error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(eq(users.username, username));
      return result[0];
    } catch (error) {
      console.error("Error in getUserByUsername:", error);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await db.select().from(users);
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      throw error;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      // Hash the password before storing it
      const { password, ...userData } = insertUser;
      const hashedPassword = await hashPassword(password);
      
      const result = await db.insert(users).values({
        ...userData,
        password: hashedPassword
      }).returning();
      
      return result[0];
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error;
    }
  }

  // Subscriber methods
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    try {
      console.log("Creating subscriber in PostgreSQL:", insertSubscriber);
      const now = new Date();
      // Generate unsubscribe token
      const unsubscribeToken = this.generateToken();
      
      // Ensure name is either string or null, not undefined
      const name = insertSubscriber.name || null;
      
      console.log("Prepared subscriber data:", { 
        email: insertSubscriber.email, 
        name, 
        status: "pending", 
        unsubscribeToken
      });
      
      const result = await db
        .insert(subscriberTable)
        .values({
          email: insertSubscriber.email,
          name,
          status: "pending",
          subscriptionDate: now,
          unsubscribeToken,
          createdAt: now,
          updatedAt: now
        })
        .returning();
      
      console.log("Subscriber created successfully:", result[0]);
      return result[0];
    } catch (error) {
      console.error("Error in createSubscriber:", error);
      throw error;
    }
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    try {
      console.log("Looking up subscriber by email in PostgreSQL:", email);
      const result = await db
        .select()
        .from(subscriberTable)
        .where(eq(subscriberTable.email, email));
      
      console.log("Subscriber lookup result:", result[0] || "Not found");
      return result[0];
    } catch (error) {
      console.error("Error in getSubscriberByEmail:", error);
      throw error;
    }
  }

  async getSubscriberById(id: number): Promise<Subscriber | undefined> {
    try {
      const result = await db
        .select()
        .from(subscriberTable)
        .where(eq(subscriberTable.id, id));
      
      return result[0];
    } catch (error) {
      console.error("Error in getSubscriberById:", error);
      throw error;
    }
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    try {
      const subscribers = await db.select().from(subscriberTable);
      console.log(`Retrieved ${subscribers.length} subscribers from database`);
      return subscribers;
    } catch (error) {
      console.error("Error in getAllSubscribers:", error);
      throw error;
    }
  }
  
  async getSubscribersByStatus(status: string): Promise<Subscriber[]> {
    try {
      return await db
        .select()
        .from(subscriberTable)
        .where(eq(subscriberTable.status, status));
    } catch (error) {
      console.error("Error in getSubscribersByStatus:", error);
      throw error;
    }
  }
  
  async updateSubscriberStatus(id: number, status: string): Promise<Subscriber | undefined> {
    try {
      const now = new Date();
      const result = await db
        .update(subscriberTable)
        .set({ 
          status,
          updatedAt: now
        })
        .where(eq(subscriberTable.id, id))
        .returning();
        
      return result[0];
    } catch (error) {
      console.error("Error in updateSubscriberStatus:", error);
      throw error;
    }
  }
  
  async updateSubscriberConfirmation(id: number, confirmationDate: Date): Promise<Subscriber | undefined> {
    try {
      const now = new Date();
      const result = await db
        .update(subscriberTable)
        .set({ 
          status: "confirmed",
          confirmationDate,
          updatedAt: now
        })
        .where(eq(subscriberTable.id, id))
        .returning();
        
      return result[0];
    } catch (error) {
      console.error("Error in updateSubscriberConfirmation:", error);
      throw error;
    }
  }
  
  async createConfirmationToken(id: number, token: string, expiration: Date): Promise<Subscriber | undefined> {
    try {
      const now = new Date();
      const result = await db
        .update(subscriberTable)
        .set({ 
          confirmationToken: token,
          tokenExpiration: expiration,
          updatedAt: now
        })
        .where(eq(subscriberTable.id, id))
        .returning();
        
      return result[0];
    } catch (error) {
      console.error("Error in createConfirmationToken:", error);
      throw error;
    }
  }
  
  async updateUnsubscribeToken(id: number, token: string): Promise<Subscriber | undefined> {
    try {
      const now = new Date();
      const result = await db
        .update(subscriberTable)
        .set({ 
          unsubscribeToken: token,
          updatedAt: now
        })
        .where(eq(subscriberTable.id, id))
        .returning();
        
      return result[0];
    } catch (error) {
      console.error("Error in updateUnsubscribeToken:", error);
      throw error;
    }
  }
  
  async getSubscriberByConfirmationToken(token: string): Promise<Subscriber | undefined> {
    try {
      const result = await db
        .select()
        .from(subscriberTable)
        .where(eq(subscriberTable.confirmationToken, token));
        
      return result[0];
    } catch (error) {
      console.error("Error in getSubscriberByConfirmationToken:", error);
      throw error;
    }
  }
  
  async getSubscriberByUnsubscribeToken(token: string): Promise<Subscriber | undefined> {
    try {
      const result = await db
        .select()
        .from(subscriberTable)
        .where(eq(subscriberTable.unsubscribeToken, token));
        
      return result[0];
    } catch (error) {
      console.error("Error in getSubscriberByUnsubscribeToken:", error);
      throw error;
    }
  }
  
  async updateLastEmailSent(id: number, date: Date): Promise<Subscriber | undefined> {
    try {
      const now = new Date();
      const result = await db
        .update(subscriberTable)
        .set({ 
          lastEmailSent: date,
          updatedAt: now
        })
        .where(eq(subscriberTable.id, id))
        .returning();
        
      return result[0];
    } catch (error) {
      console.error("Error in updateLastEmailSent:", error);
      throw error;
    }
  }
  
  // Newsletter methods
  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    try {
      const now = new Date();
      const status = insertNewsletter.status || "draft";
      const scheduledDate = insertNewsletter.scheduledDate || null;
      
      const result = await db
        .insert(newsletterTable)
        .values({
          subject: insertNewsletter.subject,
          content: insertNewsletter.content,
          status,
          scheduledDate,
          createdAt: now,
          updatedAt: now
        })
        .returning();
        
      return result[0];
    } catch (error) {
      console.error("Error in createNewsletter:", error);
      throw error;
    }
  }
  
  async getNewsletterById(id: number): Promise<Newsletter | undefined> {
    try {
      const result = await db
        .select()
        .from(newsletterTable)
        .where(eq(newsletterTable.id, id));
        
      return result[0];
    } catch (error) {
      console.error("Error in getNewsletterById:", error);
      throw error;
    }
  }
  
  async getAllNewsletters(): Promise<Newsletter[]> {
    try {
      return await db.select().from(newsletterTable);
    } catch (error) {
      console.error("Error in getAllNewsletters:", error);
      throw error;
    }
  }
  
  async getNewslettersByStatus(status: string): Promise<Newsletter[]> {
    try {
      return await db
        .select()
        .from(newsletterTable)
        .where(eq(newsletterTable.status, status));
    } catch (error) {
      console.error("Error in getNewslettersByStatus:", error);
      throw error;
    }
  }
  
  async updateNewsletterStatus(id: number, status: string): Promise<Newsletter | undefined> {
    try {
      const now = new Date();
      const result = await db
        .update(newsletterTable)
        .set({
          status,
          updatedAt: now
        })
        .where(eq(newsletterTable.id, id))
        .returning();
        
      return result[0];
    } catch (error) {
      console.error("Error in updateNewsletterStatus:", error);
      throw error;
    }
  }
  
  async updateNewsletterSentDate(id: number, sentDate: Date): Promise<Newsletter | undefined> {
    try {
      const now = new Date();
      const result = await db
        .update(newsletterTable)
        .set({
          status: "sent",
          sentDate,
          updatedAt: now
        })
        .where(eq(newsletterTable.id, id))
        .returning();
        
      return result[0];
    } catch (error) {
      console.error("Error in updateNewsletterSentDate:", error);
      throw error;
    }
  }
  
  // Newsletter tracking methods
  async createNewsletterTracking(insertTracking: InsertNewsletterTracking): Promise<NewsletterTracking> {
    try {
      const now = new Date();
      const emailSent = insertTracking.emailSent || false;
      
      const result = await db
        .insert(newsletterTrackingTable)
        .values({
          newsletterId: insertTracking.newsletterId,
          subscriberId: insertTracking.subscriberId,
          emailSent,
          createdAt: now
        })
        .returning();
        
      return result[0];
    } catch (error) {
      console.error("Error in createNewsletterTracking:", error);
      throw error;
    }
  }
  
  async getTrackingBySubscriberAndNewsletter(subscriberId: number, newsletterId: number): Promise<NewsletterTracking | undefined> {
    try {
      const result = await db
        .select()
        .from(newsletterTrackingTable)
        .where(
          and(
            eq(newsletterTrackingTable.subscriberId, subscriberId),
            eq(newsletterTrackingTable.newsletterId, newsletterId)
          )
        );
        
      return result[0];
    } catch (error) {
      console.error("Error in getTrackingBySubscriberAndNewsletter:", error);
      throw error;
    }
  }
  
  async updateTrackingOpened(id: number, openDate: Date): Promise<NewsletterTracking | undefined> {
    try {
      const result = await db
        .update(newsletterTrackingTable)
        .set({
          emailOpened: true,
          openDate
        })
        .where(eq(newsletterTrackingTable.id, id))
        .returning();
        
      return result[0];
    } catch (error) {
      console.error("Error in updateTrackingOpened:", error);
      throw error;
    }
  }
  
  async updateTrackingClicked(id: number, clickDate: Date): Promise<NewsletterTracking | undefined> {
    try {
      const result = await db
        .update(newsletterTrackingTable)
        .set({
          linkClicked: true,
          clickDate
        })
        .where(eq(newsletterTrackingTable.id, id))
        .returning();
        
      return result[0];
    } catch (error) {
      console.error("Error in updateTrackingClicked:", error);
      throw error;
    }
  }
  
  async getNewsletterStats(newsletterId: number): Promise<{
    totalSent: number;
    totalOpened: number;
    totalClicked: number;
  }> {
    try {
      // Get all tracking records for this newsletter
      const trackingRecords = await db
        .select()
        .from(newsletterTrackingTable)
        .where(eq(newsletterTrackingTable.newsletterId, newsletterId));
      
      // Calculate stats
      return {
        totalSent: trackingRecords.filter(record => record.emailSent).length,
        totalOpened: trackingRecords.filter(record => record.emailOpened).length,
        totalClicked: trackingRecords.filter(record => record.linkClicked).length
      };
    } catch (error) {
      console.error("Error in getNewsletterStats:", error);
      throw error;
    }
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    try {
      const now = new Date();
      const result = await db
        .insert(contactMessages)
        .values({
          ...insertMessage,
          createdAt: now // Field name should match what's in contactMessages model, not DB column name
        })
        .returning();
      return result[0];
    } catch (error) {
      console.error("Error in createContactMessage:", error);
      throw error;
    }
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    try {
      return await db.select().from(contactMessages);
    } catch (error) {
      console.error("Error in getAllContactMessages:", error);
      throw error;
    }
  }
  
  // Helper method to generate tokens
  private generateToken(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }
}