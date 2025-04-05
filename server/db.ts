
import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon, neonConfig } from '@neondatabase/serverless';
import * as schema from '../shared/schema';
import WebSocket from 'ws';

// Configure Neon to use the WebSocket implementation
neonConfig.webSocketConstructor = WebSocket;
neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL environment variable is required but not set. ' +
    'Please add it to your deployment configuration in the Secrets section.'
  );
}

console.log("Initializing database connection...");

// Create the Neon client with the DATABASE_URL
const sql = neon(process.env.DATABASE_URL);

// Create and export Drizzle ORM client
// Using any to bypass TypeScript error with the Neon client
const db = drizzle(sql as any, { schema });

console.log("Database connection initialized successfully");

export { db };
