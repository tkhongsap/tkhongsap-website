import { 
  users, 
  type User, 
  type InsertUser,
  subscriberTable,
  type Subscriber, 
  type InsertSubscriber,
  contactMessages,
  type ContactMessage,
  type InsertContactMessage,
  newsletterTable,
  type Newsletter,
  type InsertNewsletter,
  newsletterTrackingTable,
  type NewsletterTracking,
  type InsertNewsletterTracking
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Subscriber methods
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  getSubscriberById(id: number): Promise<Subscriber | undefined>;
  getAllSubscribers(): Promise<Subscriber[]>;
  getSubscribersByStatus(status: string): Promise<Subscriber[]>;
  updateSubscriberStatus(id: number, status: string): Promise<Subscriber | undefined>;
  updateSubscriberConfirmation(id: number, confirmationDate: Date): Promise<Subscriber | undefined>;
  createConfirmationToken(id: number, token: string, expiration: Date): Promise<Subscriber | undefined>;
  updateUnsubscribeToken(id: number, token: string): Promise<Subscriber | undefined>;
  getSubscriberByConfirmationToken(token: string): Promise<Subscriber | undefined>;
  getSubscriberByUnsubscribeToken(token: string): Promise<Subscriber | undefined>;
  updateLastEmailSent(id: number, date: Date): Promise<Subscriber | undefined>;
  
  // Newsletter methods
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterById(id: number): Promise<Newsletter | undefined>;
  getAllNewsletters(): Promise<Newsletter[]>;
  getNewslettersByStatus(status: string): Promise<Newsletter[]>;
  updateNewsletterStatus(id: number, status: string): Promise<Newsletter | undefined>;
  updateNewsletterSentDate(id: number, sentDate: Date): Promise<Newsletter | undefined>;
  
  // Newsletter tracking methods
  createNewsletterTracking(tracking: InsertNewsletterTracking): Promise<NewsletterTracking>;
  getTrackingBySubscriberAndNewsletter(subscriberId: number, newsletterId: number): Promise<NewsletterTracking | undefined>;
  updateTrackingOpened(id: number, openDate: Date): Promise<NewsletterTracking | undefined>;
  updateTrackingClicked(id: number, clickDate: Date): Promise<NewsletterTracking | undefined>;
  getNewsletterStats(newsletterId: number): Promise<{
    totalSent: number;
    totalOpened: number;
    totalClicked: number;
  }>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private subscribers: Map<number, Subscriber>;
  private messages: Map<number, ContactMessage>;
  private newsletters: Map<number, Newsletter>;
  private newsletterTracking: Map<number, NewsletterTracking>;
  private userCurrentId: number;
  private subscriberCurrentId: number;
  private messageCurrentId: number;
  private newsletterCurrentId: number;
  private trackingCurrentId: number;

  constructor() {
    this.users = new Map();
    this.subscribers = new Map();
    this.messages = new Map();
    this.newsletters = new Map();
    this.newsletterTracking = new Map();
    this.userCurrentId = 1;
    this.subscriberCurrentId = 1;
    this.messageCurrentId = 1;
    this.newsletterCurrentId = 1;
    this.trackingCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Subscriber methods
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.subscriberCurrentId++;
    const now = new Date();
    // Generate unsubscribe token
    const unsubscribeToken = this.generateToken();
    
    // Ensure name is either string or null, not undefined
    const name = insertSubscriber.name || null;
    
    // Create properly typed subscriber object
    const subscriber = { 
      id, 
      name,
      email: insertSubscriber.email, 
      status: "pending",
      subscriptionDate: now,
      confirmationToken: null,
      tokenExpiration: null,
      confirmationDate: null,
      lastEmailSent: null,
      unsubscribeToken,
      createdAt: now,
      updatedAt: now
    } as Subscriber;
    
    this.subscribers.set(id, subscriber);
    return subscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }
  
  async getSubscriberById(id: number): Promise<Subscriber | undefined> {
    return this.subscribers.get(id);
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values());
  }
  
  async getSubscribersByStatus(status: string): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values()).filter(
      (subscriber) => subscriber.status === status
    );
  }
  
  async updateSubscriberStatus(id: number, status: string): Promise<Subscriber | undefined> {
    const subscriber = this.subscribers.get(id);
    if (!subscriber) return undefined;
    
    const updatedSubscriber = {
      ...subscriber,
      status,
      updatedAt: new Date()
    };
    
    this.subscribers.set(id, updatedSubscriber);
    return updatedSubscriber;
  }
  
  async updateSubscriberConfirmation(id: number, confirmationDate: Date): Promise<Subscriber | undefined> {
    const subscriber = this.subscribers.get(id);
    if (!subscriber) return undefined;
    
    const updatedSubscriber = {
      ...subscriber,
      status: "confirmed",
      confirmationDate,
      updatedAt: new Date()
    };
    
    this.subscribers.set(id, updatedSubscriber);
    return updatedSubscriber;
  }
  
  async createConfirmationToken(id: number, token: string, expiration: Date): Promise<Subscriber | undefined> {
    const subscriber = this.subscribers.get(id);
    if (!subscriber) return undefined;
    
    const updatedSubscriber = {
      ...subscriber,
      confirmationToken: token,
      tokenExpiration: expiration,
      updatedAt: new Date()
    };
    
    this.subscribers.set(id, updatedSubscriber);
    return updatedSubscriber;
  }
  
  async updateUnsubscribeToken(id: number, token: string): Promise<Subscriber | undefined> {
    const subscriber = this.subscribers.get(id);
    if (!subscriber) return undefined;
    
    const updatedSubscriber = {
      ...subscriber,
      unsubscribeToken: token,
      updatedAt: new Date()
    };
    
    this.subscribers.set(id, updatedSubscriber);
    return updatedSubscriber;
  }
  
  async getSubscriberByConfirmationToken(token: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.confirmationToken === token
    );
  }
  
  async getSubscriberByUnsubscribeToken(token: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribers.values()).find(
      (subscriber) => subscriber.unsubscribeToken === token
    );
  }
  
  async updateLastEmailSent(id: number, date: Date): Promise<Subscriber | undefined> {
    const subscriber = this.subscribers.get(id);
    if (!subscriber) return undefined;
    
    const updatedSubscriber = {
      ...subscriber,
      lastEmailSent: date,
      updatedAt: new Date()
    };
    
    this.subscribers.set(id, updatedSubscriber);
    return updatedSubscriber;
  }
  
  // Newsletter methods
  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.newsletterCurrentId++;
    const now = new Date();
    
    const status = insertNewsletter.status || "draft";
    const scheduledDate = insertNewsletter.scheduledDate || null;
    
    const newsletter = {
      id,
      subject: insertNewsletter.subject,
      content: insertNewsletter.content,
      status,
      scheduledDate,
      sentDate: null,
      createdAt: now,
      updatedAt: now
    } as Newsletter;
    
    this.newsletters.set(id, newsletter);
    return newsletter;
  }
  
  async getNewsletterById(id: number): Promise<Newsletter | undefined> {
    return this.newsletters.get(id);
  }
  
  async getAllNewsletters(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values());
  }
  
  async getNewslettersByStatus(status: string): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values()).filter(
      (newsletter) => newsletter.status === status
    );
  }
  
  async updateNewsletterStatus(id: number, status: string): Promise<Newsletter | undefined> {
    const newsletter = this.newsletters.get(id);
    if (!newsletter) return undefined;
    
    const updatedNewsletter = {
      ...newsletter,
      status,
      updatedAt: new Date()
    };
    
    this.newsletters.set(id, updatedNewsletter);
    return updatedNewsletter;
  }
  
  async updateNewsletterSentDate(id: number, sentDate: Date): Promise<Newsletter | undefined> {
    const newsletter = this.newsletters.get(id);
    if (!newsletter) return undefined;
    
    const updatedNewsletter = {
      ...newsletter,
      status: "sent",
      sentDate,
      updatedAt: new Date()
    };
    
    this.newsletters.set(id, updatedNewsletter);
    return updatedNewsletter;
  }
  
  // Newsletter tracking methods
  async createNewsletterTracking(insertTracking: InsertNewsletterTracking): Promise<NewsletterTracking> {
    const id = this.trackingCurrentId++;
    const now = new Date();
    
    const emailSent = insertTracking.emailSent || false;
    
    const tracking = {
      id,
      newsletterId: insertTracking.newsletterId,
      subscriberId: insertTracking.subscriberId,
      emailSent,
      emailOpened: false,
      openDate: null,
      linkClicked: false,
      clickDate: null,
      createdAt: now
    } as NewsletterTracking;
    
    this.newsletterTracking.set(id, tracking);
    return tracking;
  }
  
  async getTrackingBySubscriberAndNewsletter(subscriberId: number, newsletterId: number): Promise<NewsletterTracking | undefined> {
    return Array.from(this.newsletterTracking.values()).find(
      (tracking) => tracking.subscriberId === subscriberId && tracking.newsletterId === newsletterId
    );
  }
  
  async updateTrackingOpened(id: number, openDate: Date): Promise<NewsletterTracking | undefined> {
    const tracking = this.newsletterTracking.get(id);
    if (!tracking) return undefined;
    
    const updatedTracking = {
      ...tracking,
      emailOpened: true,
      openDate
    };
    
    this.newsletterTracking.set(id, updatedTracking);
    return updatedTracking;
  }
  
  async updateTrackingClicked(id: number, clickDate: Date): Promise<NewsletterTracking | undefined> {
    const tracking = this.newsletterTracking.get(id);
    if (!tracking) return undefined;
    
    const updatedTracking = {
      ...tracking,
      linkClicked: true,
      clickDate
    };
    
    this.newsletterTracking.set(id, updatedTracking);
    return updatedTracking;
  }
  
  async getNewsletterStats(newsletterId: number): Promise<{
    totalSent: number;
    totalOpened: number;
    totalClicked: number;
  }> {
    const tracking = Array.from(this.newsletterTracking.values()).filter(
      (item) => item.newsletterId === newsletterId
    );
    
    return {
      totalSent: tracking.length,
      totalOpened: tracking.filter(item => item.emailOpened).length,
      totalClicked: tracking.filter(item => item.linkClicked).length
    };
  }

  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageCurrentId++;
    const createdAt = new Date();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt 
    };
    this.messages.set(id, message);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.messages.values());
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

// Import the PgStorage class when available
import { PgStorage } from './pg-storage';

// Use PostgreSQL storage when DATABASE_URL is available, otherwise use MemStorage
export const storage: IStorage = process.env.DATABASE_URL
  ? new PgStorage()
  : new MemStorage();

// Log which storage implementation is being used
if (process.env.DATABASE_URL) {
  console.log("Using PgStorage (PostgreSQL)");
} else {
  console.log("DATABASE_URL not found. Using MemStorage (In-Memory)");
}
