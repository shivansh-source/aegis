import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Country code validation (2-letter uppercase)
const countryCodeSchema = z.string().length(2).regex(/^[A-Z]{2}$/);

export const validateCountryCode = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validation = countryCodeSchema.safeParse(req.params.countryCode);
  
  if (!validation.success) {
    return res.status(400).json({
      error: 'Invalid country code',
      details: validation.error.errors
    });
  }
  
  next();
};

// Example simulation input validator
export const validateSimulationInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = z.object({
    countryA: z.string().length(2),
    countryB: z.string().length(2),
    duration: z.number().min(1).max(365)
  });

  const validation = schema.safeParse(req.body);
  
  if (!validation.success) {
    return res.status(400).json({
      error: 'Invalid simulation input',
      details: validation.error.errors
    });
  }
  
  next();
};