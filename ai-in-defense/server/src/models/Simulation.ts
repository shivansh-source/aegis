// src/models/Simulation.ts
export interface Troop {
  type: string;
  quantity: number;
}

export interface Weapon {
  type: string;
  modernizationLevel: number;
}

export interface SimulationConfig {
  countryA: string;
  countryB: string;
  latA: number;
  lngA: number;
  latB: number;
  lngB: number;
  troopsA: Troop[];
  troopsB: Troop[];
  weaponsA: Weapon[];
  weaponsB: Weapon[];
}

export interface TroopPosition {
  lat: number;
  lng: number;
  side: 'A' | 'B';
}

export interface SimulationResult extends SimulationConfig {
  simulationId: string;
  winner: string;
  probability: number;
  casualties: number;
  troopPositions: TroopPosition[];
}