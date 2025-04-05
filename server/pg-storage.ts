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
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const createdAt = new Date().toISOString();
    // Ensure name is either string or null, not undefined
    const name = insertSubscriber.name || null;
    const result = await db
      .insert(subscriberTable)
      .values({
        email: insertSubscriber.email,
        name,
        createdAt
      })
      .returning();
    return result[0];
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const result = await db
      .select()
      .from(subscriberTable)
      .where(eq(subscriberTable.email, email));
    return result[0];
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    return await db.select().from(subscriberTable);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const createdAt = new Date().toISOString();
    const result = await db
      .insert(contactMessages)
      .values({
        ...insertMessage,
        createdAt
      })
      .returning();
    return result[0];
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages);
  }
}