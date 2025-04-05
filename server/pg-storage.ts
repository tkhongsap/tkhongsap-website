import { db } from './db';
import { 
  users, 
  subscriberTable, 
  contactMessages,
  type User, 
  type InsertUser,
  type Subscriber, 
  type InsertSubscriber,
  type ContactMessage,
  type InsertContactMessage
} from '@shared/schema';
import { eq } from 'drizzle-orm';
import { IStorage } from './storage';

export class PgStorage implements IStorage {
  constructor() {
    console.log("PgStorage initialized with PostgreSQL database");
  }

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

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const result = await db.insert(users).values(insertUser).returning();
      return result[0];
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error;
    }
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    try {
      console.log("Creating subscriber in PostgreSQL:", insertSubscriber);
      const createdAt = new Date().toISOString();
      // Ensure name is either string or null, not undefined
      const name = insertSubscriber.name || null;
      
      console.log("Prepared subscriber data:", { email: insertSubscriber.email, name, createdAt });
      
      const result = await db
        .insert(subscriberTable)
        .values({
          email: insertSubscriber.email,
          name,
          createdAt
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

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    try {
      const createdAt = new Date().toISOString();
      const result = await db
        .insert(contactMessages)
        .values({
          ...insertMessage,
          createdAt
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
}