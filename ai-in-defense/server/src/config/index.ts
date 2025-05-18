import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  PORT: z.number().default(5001),
  GEMINI_API_KEY: z.string().optional(),
  CORS_ORIGIN: z.string().default('http://localhost:3000')
});

// Check if API key is missing and log a warning
const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
  console.warn('WARNING: GEMINI_API_KEY is not set. Some AI features may not work properly.');
}

export const config = configSchema.parse({
  PORT: parseInt(process.env.PORT || '5001'),
  GEMINI_API_KEY: geminiApiKey,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
});