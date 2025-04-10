/**
 * Email Service for Newsletter System
 * 
 * This utility handles all email related functionality including:
 * - Sending confirmation emails
 * - Sending newsletters
 * - Tracking email opens and clicks (via tracking pixels and URL rewrites)
 */

import { Subscriber, Newsletter } from "@shared/schema";
import sgMail from '@sendgrid/mail';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

/**
 * Email Service Interface
 */
export interface IEmailService {
  // Sends a single email
  sendEmail(options: EmailOptions): Promise<boolean>;
  
  // Sends a confirmation email to new subscribers
  sendConfirmationEmail(subscriber: Subscriber, confirmationUrl: string): Promise<boolean>;
  
  // Sends a welcome email to subscribers after confirmation
  sendWelcomeEmail(subscriber: Subscriber): Promise<boolean>;
  
  // Sends a newsletter to a subscriber
  sendNewsletterToSubscriber(newsletter: Newsletter, subscriber: Subscriber, trackingId?: number): Promise<boolean>;
  
  // Sends a newsletter to all confirmed subscribers
  sendNewsletterToAll(newsletter: Newsletter, subscribers: Subscriber[]): Promise<{
    success: number;
    failed: number;
    details: { email: string; success: boolean; error?: string }[];
  }>;
}

/**
 * Mock Email Service 
 * For local development - logs emails instead of sending
 */
export class MockEmailService implements IEmailService {
  constructor() {
    console.log("MockEmailService initialized - emails will be logged but not sent");
  }
  
  async sendEmail(options: EmailOptions): Promise<boolean> {
    console.log("MOCK EMAIL:", {
      to: options.to,
      subject: options.subject,
      from: options.from || process.env.EMAIL_FROM || "newsletter@example.com",
      replyTo: options.replyTo || process.env.EMAIL_REPLY_TO || "contact@example.com"
    });
    console.log("EMAIL CONTENT HTML:", options.html.substring(0, 200) + "...");
    if (options.text) {
      console.log("EMAIL CONTENT TEXT:", options.text.substring(0, 200) + "...");
    }
    return true;
  }
  
  async sendConfirmationEmail(subscriber: Subscriber, confirmationUrl: string): Promise<boolean> {
    const name = subscriber.name || "there";
    
    const html = `
      <h2>Confirm Your Email Address</h2>
      <p>Hi ${name},</p>
      <p>Thank you for subscribing to my newsletter. Please confirm your email address by clicking the link below:</p>
      <p><a href="${confirmationUrl}" style="background-color: #FF4D4D; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Confirm Email Address</a></p>
      <p>Or copy and paste this URL into your browser: ${confirmationUrl}</p>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't subscribe to this newsletter, you can safely ignore this email.</p>
      <p>Best regards,<br>Totrakool Khongsap</p>
    `;
    
    const text = `
      Confirm Your Email Address
      
      Hi ${name},
      
      Thank you for subscribing to my newsletter. Please confirm your email address by clicking the link below:
      
      ${confirmationUrl}
      
      This link will expire in 24 hours.
      
      If you didn't subscribe to this newsletter, you can safely ignore this email.
      
      Best regards,
      Totrakool Khongsap
    `;
    
    return this.sendEmail({
      to: subscriber.email,
      subject: "Please Confirm Your Subscription",
      html,
      text
    });
  }
  
  async sendWelcomeEmail(subscriber: Subscriber): Promise<boolean> {
    const name = subscriber.name || "there";
    
    const html = `
      <h2>Welcome to My Newsletter!</h2>
      <p>Hi ${name},</p>
      <p>Thank you for confirming your subscription to my newsletter. You'll now receive updates on:</p>
      <ul>
        <li>AI and machine learning trends</li>
        <li>Data science insights</li>
        <li>Financial technology developments</li>
        <li>My latest projects and articles</li>
      </ul>
      <p>I typically send newsletters once or twice a month.</p>
      <p>Best regards,<br>Totrakool Khongsap</p>
    `;
    
    const text = `
      Welcome to My Newsletter!
      
      Hi ${name},
      
      Thank you for confirming your subscription to my newsletter. You'll now receive updates on:
      
      - AI and machine learning trends
      - Data science insights
      - Financial technology developments
      - My latest projects and articles
      
      I typically send newsletters once or twice a month.
      
      Best regards,
      Totrakool Khongsap
    `;
    
    return this.sendEmail({
      to: subscriber.email,
      subject: "Welcome to My Newsletter",
      html,
      text
    });
  }
  
  async sendNewsletterToSubscriber(newsletter: Newsletter, subscriber: Subscriber, trackingId?: number): Promise<boolean> {
    const name = subscriber.name || "there";
    const unsubscribeUrl = `${process.env.SITE_URL || 'http://localhost:3000'}/direct-unsubscribe.html?token=${subscriber.unsubscribeToken}`;
    
    // Add tracking pixel if trackingId is provided
    let trackingPixel = '';
    let trackingContent = newsletter.content;
    
    if (trackingId) {
      const trackingUrl = `${process.env.SITE_URL || 'http://localhost:3000'}/api/newsletter/track/open?id=${trackingId}`;
      trackingPixel = `<img src="${trackingUrl}" width="1" height="1" alt="" style="display: none;">`;
      
      // Rewrite links to include tracking
      // This is a simple implementation - a real one would be more sophisticated
      trackingContent = newsletter.content.replace(
        /<a\s+href="([^"]+)"/gi,
        `<a href="${process.env.SITE_URL || 'http://localhost:3000'}/api/newsletter/track/click?id=${trackingId}&url=$1"`
      );
    }
    
    const html = `
      <h2>${newsletter.subject}</h2>
      <p>Hi ${name},</p>
      ${trackingContent}
      <p>
        <a href="${unsubscribeUrl}" style="color: #666; font-size: 12px;">Unsubscribe</a>
      </p>
      ${trackingPixel}
    `;
    
    // Simple text version
    const text = `
      ${newsletter.subject}
      
      Hi ${name},
      
      [This is a plain text version of the newsletter. Please view the HTML version for the full experience.]
      
      To unsubscribe, visit: ${unsubscribeUrl}
    `;
    
    return this.sendEmail({
      to: subscriber.email,
      subject: newsletter.subject,
      html,
      text
    });
  }
  
  async sendNewsletterToAll(newsletter: Newsletter, subscribers: Subscriber[]): Promise<{
    success: number;
    failed: number;
    details: { email: string; success: boolean; error?: string }[];
  }> {
    const results = {
      success: 0,
      failed: 0,
      details: [] as { email: string; success: boolean; error?: string }[]
    };
    
    console.log(`MOCK: Preparing to send newsletter "${newsletter.subject}" to ${subscribers.length} subscribers`);
    
    for (const subscriber of subscribers) {
      try {
        const success = await this.sendNewsletterToSubscriber(newsletter, subscriber);
        
        if (success) {
          results.success++;
          results.details.push({ email: subscriber.email, success: true });
        } else {
          results.failed++;
          results.details.push({ 
            email: subscriber.email, 
            success: false, 
            error: "Failed to send email" 
          });
        }
      } catch (error) {
        results.failed++;
        results.details.push({ 
          email: subscriber.email, 
          success: false, 
          error: error instanceof Error ? error.message : "Unknown error" 
        });
      }
    }
    
    console.log(`MOCK: Newsletter send complete. Success: ${results.success}, Failed: ${results.failed}`);
    return results;
  }
}

/**
 * SendGrid Email Service
 * Sends real emails via SendGrid API
 */
export class SendGridEmailService implements IEmailService {
  constructor() {
    // Set SendGrid API key from environment variable
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      throw new Error('SENDGRID_API_KEY is required but not provided in environment variables.');
    }
    
    sgMail.setApiKey(apiKey);
    console.log("SendGridEmailService initialized");
  }
  
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const from = options.from || process.env.EMAIL_FROM || "newsletter@example.com";
      const replyTo = options.replyTo || process.env.EMAIL_REPLY_TO || "contact@example.com";
      
      const msg = {
        to: options.to,
        from,
        subject: options.subject,
        text: options.text || '',
        html: options.html,
        replyTo,
        trackingSettings: {
          clickTracking: {
            enable: false,
            enableText: false
          }
        }
      };
      
      await sgMail.send(msg);
      console.log(`Email sent to ${options.to}`);
      return true;
    } catch (error) {
      console.error('Error sending email with SendGrid:', error);
      return false;
    }
  }
  
  // Reuse the same implementation as MockEmailService for these methods
  // Since they rely on the sendEmail method which is now using SendGrid
  
  async sendConfirmationEmail(subscriber: Subscriber, confirmationUrl: string): Promise<boolean> {
    const name = subscriber.name || "there";
    
    const html = `
      <h2>Confirm Your Email Address</h2>
      <p>Hi ${name},</p>
      <p>Thank you for subscribing to my newsletter. Please confirm your email address by clicking the link below:</p>
      <p><a href="${confirmationUrl}" style="background-color: #FF4D4D; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Confirm Email Address</a></p>
      <p>Or copy and paste this URL into your browser: ${confirmationUrl}</p>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't subscribe to this newsletter, you can safely ignore this email.</p>
      <p>Best regards,<br>Totrakool Khongsap</p>
    `;
    
    const text = `
      Confirm Your Email Address
      
      Hi ${name},
      
      Thank you for subscribing to my newsletter. Please confirm your email address by clicking the link below:
      
      ${confirmationUrl}
      
      This link will expire in 24 hours.
      
      If you didn't subscribe to this newsletter, you can safely ignore this email.
      
      Best regards,
      Totrakool Khongsap
    `;
    
    return this.sendEmail({
      to: subscriber.email,
      subject: "Please Confirm Your Subscription",
      html,
      text
    });
  }
  
  async sendWelcomeEmail(subscriber: Subscriber): Promise<boolean> {
    const name = subscriber.name || "there";
    
    const html = `
      <h2>Welcome to My Newsletter!</h2>
      <p>Hi ${name},</p>
      <p>Thank you for confirming your subscription to my newsletter. You'll now receive updates on:</p>
      <ul>
        <li>AI and machine learning trends</li>
        <li>Data science insights</li>
        <li>Financial technology developments</li>
        <li>My latest projects and articles</li>
      </ul>
      <p>I typically send newsletters once or twice a month.</p>
      <p>Best regards,<br>Totrakool Khongsap</p>
    `;
    
    const text = `
      Welcome to My Newsletter!
      
      Hi ${name},
      
      Thank you for confirming your subscription to my newsletter. You'll now receive updates on:
      
      - AI and machine learning trends
      - Data science insights
      - Financial technology developments
      - My latest projects and articles
      
      I typically send newsletters once or twice a month.
      
      Best regards,
      Totrakool Khongsap
    `;
    
    return this.sendEmail({
      to: subscriber.email,
      subject: "Welcome to My Newsletter",
      html,
      text
    });
  }
  
  async sendNewsletterToSubscriber(newsletter: Newsletter, subscriber: Subscriber, trackingId?: number): Promise<boolean> {
    const name = subscriber.name || "there";
    const unsubscribeUrl = `${process.env.SITE_URL || 'http://localhost:3000'}/direct-unsubscribe.html?token=${subscriber.unsubscribeToken}`;
    
    // Add tracking pixel if trackingId is provided
    let trackingPixel = '';
    let trackingContent = newsletter.content;
    
    if (trackingId) {
      const trackingUrl = `${process.env.SITE_URL || 'http://localhost:3000'}/api/newsletter/track/open?id=${trackingId}`;
      trackingPixel = `<img src="${trackingUrl}" width="1" height="1" alt="" style="display: none;">`;
      
      // Rewrite links to include tracking
      // This is a simple implementation - a real one would be more sophisticated
      trackingContent = newsletter.content.replace(
        /<a\s+href="([^"]+)"/gi,
        `<a href="${process.env.SITE_URL || 'http://localhost:3000'}/api/newsletter/track/click?id=${trackingId}&url=$1"`
      );
    }
    
    const html = `
      <h2>${newsletter.subject}</h2>
      <p>Hi ${name},</p>
      ${trackingContent}
      <p>
        <a href="${unsubscribeUrl}" style="color: #666; font-size: 12px;">Unsubscribe</a>
      </p>
      ${trackingPixel}
    `;
    
    // Simple text version
    const text = `
      ${newsletter.subject}
      
      Hi ${name},
      
      [This is a plain text version of the newsletter. Please view the HTML version for the full experience.]
      
      To unsubscribe, visit: ${unsubscribeUrl}
    `;
    
    return this.sendEmail({
      to: subscriber.email,
      subject: newsletter.subject,
      html,
      text
    });
  }
  
  async sendNewsletterToAll(newsletter: Newsletter, subscribers: Subscriber[]): Promise<{
    success: number;
    failed: number;
    details: { email: string; success: boolean; error?: string }[];
  }> {
    const results = {
      success: 0,
      failed: 0,
      details: [] as { email: string; success: boolean; error?: string }[]
    };
    
    console.log(`Preparing to send newsletter "${newsletter.subject}" to ${subscribers.length} subscribers`);
    
    for (const subscriber of subscribers) {
      try {
        const success = await this.sendNewsletterToSubscriber(newsletter, subscriber);
        
        if (success) {
          results.success++;
          results.details.push({ email: subscriber.email, success: true });
        } else {
          results.failed++;
          results.details.push({ 
            email: subscriber.email, 
            success: false, 
            error: "Failed to send email" 
          });
        }
      } catch (error) {
        results.failed++;
        results.details.push({ 
          email: subscriber.email, 
          success: false, 
          error: error instanceof Error ? error.message : "Unknown error" 
        });
      }
    }
    
    console.log(`Newsletter send complete. Success: ${results.success}, Failed: ${results.failed}`);
    return results;
  }
}

/**
 * Determines which email service to use based on environment
 * Falls back to mock service if no real service is configured in development
 * In production, will throw an error if no email service is configured
 */
function createEmailService(): IEmailService {
  // Check if we have service credentials to use a real email service
  const emailService = process.env.EMAIL_SERVICE;
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  if (emailService === 'sendgrid') {
    try {
      return new SendGridEmailService();
    } catch (error) {
      console.error('Failed to initialize SendGrid email service:', error);
      
      if (isDevelopment) {
        console.log('Falling back to mock email service in development environment');
        return new MockEmailService();
      } else {
        // In production, we should fail if email service configuration is invalid
        throw new Error('Email service configuration failed in production environment. Please check your settings.');
      }
    }
  }
  
  if (isDevelopment) {
    console.log("Using mock email service for development environment");
    return new MockEmailService();
  } else {
    // In production, we require a properly configured email service
    throw new Error('No email service configured for production environment. Set EMAIL_SERVICE in your environment variables.');
  }
}

export const emailService: IEmailService = createEmailService();