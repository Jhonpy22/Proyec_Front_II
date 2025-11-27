import React from "react";
import { useStartSimulation } from "../hooks/useSimulation";
import CardGridPage from "../../Cards/pages/CardGridPage";
import { AlertCircle, Play } from "lucide-react";

const SimulationControlPage: React.FC = () => {
  const { mutate: startSimulation, isPending, } = useStartSimulation();

  const handleStartClick = () => {
    startSimulation();
  };

  return (
    <div className="min-h-screen ">
      <div className="bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 shadow-2xl shadow-cyan-500/20 border-b border-cyan-500/40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">

            <div>
              <h1 className="text-3xl font-bold text-white">Control de Simulación</h1>
              <p className="text-cyan-300 text-sm mt-1">Inicia el proceso de compras automáticas</p>
            </div>

            <button
              onClick={handleStartClick}
              disabled={isPending}
              className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white shadow-lg 
              transition-all transform hover:scale-105 disabled:opacity-50 
              disabled:cursor-not-allowed bg-gradient-to-r from-green-600 to-green-500 
              hover:from-green-500 hover:to-green-400 shadow-green-500/50 hover:shadow-green-500/80"
            >
              {isPending ? (
                <>Iniciando...</>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Iniciar Proceso de Compras
                </>
              )}
            </button>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {isPending && (
          <div className="mb-6 rounded-xl border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 p-4 shadow-lg shadow-yellow-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-400 animate-pulse" />
              <p className="text-sm font-medium text-yellow-300">
                Proceso de simulación en curso... Por favor espera.
              </p>
            </div>
          </div>
        )}
        
        <CardGridPage />
      </div>
    </div>
  );
};

export default SimulationControlPage;
