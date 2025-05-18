"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const configSchema = zod_1.z.object({
    PORT: zod_1.z.number().default(5001),
    GEMINI_API_KEY: zod_1.z.string().optional(),
    CORS_ORIGIN: zod_1.z.string().default('http://localhost:3000')
});
// Check if API key is missing and log a warning
const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
    console.warn('WARNING: GEMINI_API_KEY is not set. Some AI features may not work properly.');
}
exports.config = configSchema.parse({
    PORT: parseInt(process.env.PORT || '5001'),
    GEMINI_API_KEY: geminiApiKey,
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
});
