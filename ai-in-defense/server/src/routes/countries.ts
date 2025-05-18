import { Router } from 'express';
import { getCountries } from '../controllers/countryController';
import { validateCountryCode } from '../middleware/validation';

const router = Router();

router.get('/', getCountries);
router.get('/:countryCode', validateCountryCode, getCountries);

export default router;