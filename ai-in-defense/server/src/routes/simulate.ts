// src/routes/simulate.ts
import { Router } from 'express';
import { startSimulation } from '../controllers/simulationController';
import { validateSimulation } from '../middleware/validateSimulation';

const router = Router();

router.post('/', validateSimulation, startSimulation);

export default router;