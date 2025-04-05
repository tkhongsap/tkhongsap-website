import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon } from '@neondatabase/serverless';
import * as schema from '../shared/schema';

// Define the type of the sql client
const sql = neon(process.env.DATABASE_URL!);

// Export the database client
export const db = drizzle(sql, { schema });