import { Router } from 'express';
import { getResults } from '../src/controllers/resultController';

const router = Router();

router.get('/:simulationId', getResults);

export default router;