// src/controllers/simulationController.ts
import { Request, Response } from 'express';
import { SimulationConfig } from '../models/Simulation';
import { runWarSimulation } from '../services/warEngine';
import { saveResult } from '../services/simulationStorage';
import { v4 as uuidv4 } from 'uuid';

export const startSimulation = (
  req: Request<{}, {}, SimulationConfig>,
  res: Response
) => {
  try {
    const config = req.body;
    
    // Generate simulation results
    const result = runWarSimulation(config);
    
    // Generate a unique ID
    const simulationId = uuidv4();
    result.simulationId = simulationId;
    
    // Store in our storage service
    saveResult(simulationId, result);
    
    // Return the ID for future retrieval
    res.status(201).json({ 
      simulationId,
      redirectUrl: `/results/${simulationId}`
    });
    
  } catch (error) {
    console.error('Simulation error:', error);
    res.status(500).json({ error: 'Failed to run simulation' });
  }
};