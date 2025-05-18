import axios from "axios";

// Base axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5001/api",
  timeout: 10000,
});

// Fetch available countries, troops, weapons, etc.
export const fetchCountries = () => api.get("/countries");
export const fetchTroops = (countryCode: string) => {
  console.log(countryCode);
  return api.get(`/military/troops/${countryCode}`);
}
  
export const fetchWeapons = (countryCode: string) =>
  api.get(`/military/weapons/${countryCode}`);

// Start simulation
export const startSimulation = (config: any) => api.post("/simulate", config);

// Fetch simulation results
export const fetchResults = (simulationId: string) =>
  api.get(`/results/${simulationId}`);

export default api;
