import axios from "axios";
import { config } from "../config";

interface EconomicImpact {
  gdpLossA: number;
  gdpLossB: number;
  infrastructureDamage: number;
  estimatedRecoveryTime: number;
}

const client = axios.create({
  baseURL: "https://api.gemini.com/v1", // Default URL if not provided in config
  timeout: 5000,
  headers: { 
    Authorization: `Bearer ${config.GEMINI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const analyzeEconomicImpact = async (
  countryA: string,
  countryB: string
): Promise<EconomicImpact> => {
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
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze economic impact");
  }
};