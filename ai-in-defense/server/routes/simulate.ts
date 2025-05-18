// routes/simulate.ts
import { Router } from 'express';
import { startSimulation } from '../src/controllers/simulationController';
import { validateSimulation } from '../src/middleware/validateSimulation';

const router = Router();

router.post('/', validateSimulation, startSimulation);

export default router;