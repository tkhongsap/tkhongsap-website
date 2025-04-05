
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '../shared/schema';

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL environment variable is required but not set. ' +
    'Please add it to your deployment configuration in the Secrets section.'
  );
}

console.log("Initializing database connection with URL:", process.env.DATABASE_URL.replace(/:[^:@]*@/, ':****@'));

// Create the Neon client with the DATABASE_URL using HTTP mode instead of WebSockets
// This is more reliable in serverless environments
const sql = neon(process.env.DATABASE_URL);

// Create and export Drizzle ORM client using neon-http instead of neon-serverless
const db = drizzle(sql, { schema });

console.log("Database connection initialized successfully");

export { db };
