"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeEconomicImpact = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const client = axios_1.default.create({
    baseURL: "https://api.gemini.com/v1", // Default URL if not provided in config
    timeout: 5000,
    headers: {
        Authorization: `Bearer ${config_1.config.GEMINI_API_KEY}`,
        'Content-Type': 'application/json'
    }
});
const analyzeEconomicImpact = async (countryA, countryB) => {
    if (!countryA || !countryB) {
        throw new Error("Both countries must be specified");
    }
    try {
        const res = await client.post("/analyze-impact", {
            countryA,
            countryB
        });
        return {
            gdpLossA: res.data.gdpLossA || 0,
            gdpLossB: res.data.gdpLossB || 0,
            infrastructureDamage: res.data.infrastructureDamage || 0,
            estimatedRecoveryTime: res.data.estimatedRecoveryTime || 0
        };
    }
    catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to analyze economic impact");
    }
};
exports.analyzeEconomicImpact = analyzeEconomicImpact;
