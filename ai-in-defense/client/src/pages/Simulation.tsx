import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWar } from "../context/WarContext";
import { fetchTroops, fetchWeapons, startSimulation } from "../api";
import { Loader } from "../components/Loader";
import { TroopCard } from "../components/TroopCard";
import { WeaponCard } from "../components/WeaponCard";

export const Simulation: React.FC = () => {
  const navigate = useNavigate();
  const { config, setConfig } = useWar();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!config.countryA || !config.countryB) {
      navigate('/'); // Redirect if countries not selected
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        const [troopsA, weaponsA, troopsB, weaponsB] = await Promise.all([
          fetchTroops(config.countryA),
          fetchWeapons(config.countryA),
          fetchTroops(config.countryB),
          fetchWeapons(config.countryB)
        ]);
        
        setConfig(c => ({
          ...c,
          troopsA: troopsA.data,
          weaponsA: weaponsA.data,
          troopsB: troopsB.data,
          weaponsB: weaponsB.data,
          // Add missing lat/lng data required by the simulation
          latA: 34.0, // Example lat for country A
          lngA: -118.0, // Example lng for country A
          latB: 35.0, // Example lat for country B
          lngB: 139.0 // Example lng for country B
        }));
      } catch (err) {
        setError('Failed to load military data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [config.countryA, config.countryB, setConfig, navigate]);

  const handleStart = async () => {
    try {
      setLoading(true);
      console.log("Starting simulation with config:", config);
      const res = await startSimulation(config);
      navigate(`/results/${res.data.simulationId}`);
    } catch (err) {
      setError('Simulation failed to start');
      console.error("Simulation error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Military Comparison</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Country A */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">{config.countryA}</h2>
            
            <h3 className="text-lg font-medium mb-2">Troops</h3>
            <div className="space-y-2">
              {config.troopsA.map((t) => (
                <TroopCard key={t.id} troop={t} />
              ))}
            </div>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Weapons</h3>
            <div className="space-y-2">
              {config.weaponsA.map((w) => (
                <WeaponCard key={w.id} weapon={w} />
              ))}
            </div>
          </div>

          {/* Country B */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">{config.countryB}</h2>
            
            <h3 className="text-lg font-medium mb-2">Troops</h3>
            <div className="space-y-2">
              {config.troopsB.map((t) => (
                <TroopCard key={t.id} troop={t} />
              ))}
            </div>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Weapons</h3>
            <div className="space-y-2">
              {config.weaponsB.map((w) => (
                <WeaponCard key={w.id} weapon={w} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleStart}
            disabled={loading}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-all disabled:bg-gray-400"
          >
            {loading ? 'Starting...' : 'Begin Simulation'}
          </button>
        </div>
      </div>
    </div>
  );
};