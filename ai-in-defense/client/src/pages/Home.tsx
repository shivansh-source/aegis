import React from "react";
import { CountrySelect } from "../components/CountrySelect";
import { useFetch } from "../hooks/useFetch";
import { fetchCountries } from "../api";
import { useWar } from "../context/WarContext";
import { Loader } from "../components/Loader";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { data: countries, loading } = useFetch(fetchCountries);
  const { config, setConfig } = useWar();

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">War Simulation</h1>
          <p className="text-lg text-gray-600">Configure your military scenario</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Country A Selection */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Nation A</h2>
              <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
                <CountrySelect
                  countries={countries || []}
                  selected={config.countryA}
                  onChange={(code) => setConfig((c) => ({ ...c, countryA: code }))}
                />
              </div>
            </div>

            {/* Country B Selection */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Nation B</h2>
              <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
                <CountrySelect
                  countries={countries || []}
                  selected={config.countryB}
                  onChange={(code) => setConfig((c) => ({ ...c, countryB: code }))}
                />
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
      onClick={() => navigate('/simulate')} // Changed this line
      disabled={!config.countryA || !config.countryB}
      className={`px-8 py-3 rounded-lg font-medium text-white shadow-md transition-all
        ${!config.countryA || !config.countryB
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-red-600 hover:bg-red-700 hover:shadow-lg'
        }`}
    >
      Launch Simulation
    </button>
          </div>
        </div>
      </div>
    </div>
  );
};