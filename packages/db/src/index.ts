import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema.js';

export const pool = new Pool();

export const db = drizzle(pool, { schema });
export * from './schema.js';
