import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchResults } from "../api";
import { Loader } from "../components/Loader";
import { MapView } from "../components/MapView";

interface TroopPosition {
  lat: number;
  lng: number;
  side: 'A' | 'B';
}

interface Result {
  simulationId: string;
  winner: string;
  probability: number;
  casualties: number;
  countryA: string;
  countryB: string;
  latA: number;
  lngA: number;
  latB: number;
  lngB: number;
  troopPositions: TroopPosition[];
}

export const Results: React.FC = () => {
  const { simulationId } = useParams<{ simulationId: string }>();
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const res = await fetchResults(simulationId!);
        console.log("Results data:", res.data);
        setResult(res.data);
      } catch (err) {
        console.error("Error loading simulation results:", err);
        setError("Failed to load simulation results");
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [simulationId]);

  if (loading) return <Loader />;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!result) return <div className="p-6">No results found</div>;

  // Calculate center point between the two countries
  const centerLat = (result.latA + result.latB) / 2;
  const centerLng = (result.lngA + result.lngB) / 2;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Simulation Results</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Outcome</h2>
            <div className="space-y-2">
              <p className="mb-2">
                Winner: <strong className="text-blue-600">{result.winner}</strong>
              </p>
              <p className="mb-2">
                Win Probability: <strong>{result.probability.toFixed(2)}%</strong>
              </p>
              <p className="mb-2">
                Casualties: <strong>{Math.round(result.casualties).toLocaleString()}</strong>
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Opposing Forces</h2>
            <div className="space-y-2">
              <p className="mb-2">
                <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                <strong>{result.countryA}</strong>
              </p>
              <p className="mb-2">
                <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2"></span>
                <strong>{result.countryB}</strong>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <MapView center={[centerLat, centerLng]} troops={result.troopPositions || []} />
        </div>
      </div>
    </div>
  );
};
