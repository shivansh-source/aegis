import { SimulationResult } from "../models/Simulation";

const store: Record<string, SimulationResult> = {};

export const saveResult = (id: string, result: SimulationResult) => {
  store[id] = result;
};

export const getResult = (id: string): SimulationResult | undefined => {
  return store[id];
};