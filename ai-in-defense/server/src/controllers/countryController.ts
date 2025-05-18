// src/controllers/countryController.ts
import { Request, Response } from 'express';
import { getCountryData } from '../services/warDataService';

export const getCountries = async (_: Request, res: Response) => {
  try {
    const countries = await getCountryData();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCountryDetails = async (req: Request, res: Response) => {
  try {
    const { countryCode } = req.params;
    const countries = await getCountryData();
    const country = countries.find(c => c.code === countryCode);
    
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }
    
    res.json(country);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};