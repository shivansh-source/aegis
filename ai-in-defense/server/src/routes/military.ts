import express from 'express';
import { 
  getTroopsByCountry, 
  getWeaponsByCountry 
} from '../controllers/militaryController';
import { validateCountryCode } from '../middleware/validation';

const router = express.Router();

// This adds /troops and /weapons endpoints directly under /api/military
router.get('/troops/:countryCode', validateCountryCode, getTroopsByCountry);
router.get('/weapons/:countryCode', validateCountryCode, getWeaponsByCountry);

export default router;