
import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon } from '@neondatabase/serverless';
import * as schema from '../shared/schema';

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL environment variable is required but not set. ' +
    'Please add it to your deployment configuration in the Secrets section.'
  );
}

// Define the type of the sql client
const sql = neon(process.env.DATABASE_URL);

// Export the database client with proper typing
// Using type assertion to solve the TypeScript type issue
export const db = drizzle(sql as any, { schema });
