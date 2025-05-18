// src/controllers/resultController.ts
import { Request, Response, NextFunction } from "express";
import { getResult } from "../services/simulationStorage";

export const getSimulationResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { simulationId } = req.params;
    const result = getResult(simulationId);
    
    if (!result) {
      return res.status(404).json({ error: "Simulation not found" });
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
};