import { Request, Response } from 'express';
import { getMilitaryData } from '../services/warDataService';

export const getTroopsByCountry = (req: Request, res: Response) => {
  const { countryCode } = req.params;
  const data = getMilitaryData(countryCode);
  
  if (!data) {
    return res.status(404).json({ error: 'No data for this country' });
  }

  // Mock troops array for the client
  const troops = [
    {
      id: `${countryCode}-infantry`,
      type: 'Infantry',
      quantity: Math.floor(data.troops.average * 100000)
    },
    {
      id: `${countryCode}-armor`,
      type: 'Armor',
      quantity: Math.floor(data.troops.average * 10000)
    },
    {
      id: `${countryCode}-special`,
      type: 'Special Forces',
      quantity: Math.floor(data.troops.average * 5000)
    }
  ];

  res.json(troops);
};

export const getWeaponsByCountry = (req: Request, res: Response) => {
  const { countryCode } = req.params;
  const data = getMilitaryData(countryCode);
  
  if (!data) {
    return res.status(404).json({ error: 'No data for this country' });
  }

  // Mock weapons array for the client
  const weapons = [
    {
      id: `${countryCode}-artillery`,
      type: 'Artillery',
      modernizationLevel: data.modernization.average * 0.9
    },
    {
      id: `${countryCode}-air`,
      type: 'Air Force',
      modernizationLevel: data.modernization.average * 1.1
    },
    {
      id: `${countryCode}-naval`,
      type: 'Naval', 
      modernizationLevel: data.modernization.average
    }
  ];

  res.json(weapons);
};