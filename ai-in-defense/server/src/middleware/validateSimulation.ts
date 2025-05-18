// src/middleware/validateSimulation.ts
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { SimulationConfig } from '../models/Simulation';

const weaponSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  modernizationLevel: z.number()
});

const troopSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  quantity: z.number().min(1)
});

// Schema that matches the SimulationConfig exactly
const simulationSchema = z.object({
  countryA: z.string(),
  countryB: z.string(),
  latA: z.number(),
  lngA: z.number(), 
  latB: z.number(),
  lngB: z.number(),
  troopsA: z.array(troopSchema),
  troopsB: z.array(troopSchema),
  weaponsA: z.array(weaponSchema),
  weaponsB: z.array(weaponSchema)
});

export const validateSimulation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Validating simulation data:', JSON.stringify(req.body, null, 2));
  
  const result = simulationSchema.safeParse(req.body);
  
  if (!result.success) {
    console.error('Validation errors:', JSON.stringify(result.error.errors, null, 2));
    return res.status(400).json({
      error: 'Invalid simulation data',
      details: result.error.errors
    });
  }
  
  console.log('Validation successful');
  req.body = result.data;
  next();
};

// Add this export if you need the schema elsewhere
export { simulationSchema };