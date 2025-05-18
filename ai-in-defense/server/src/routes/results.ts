// src/routes/results.ts
import { Router } from 'express';
import { getSimulationResult } from '../controllers/resultController';

const router = Router();

router.get('/:simulationId', getSimulationResult);

export default router;