// pages/SimulationControlPage.tsx
import React from 'react';
import { useSimulation } from '../modules/simulationControl/hooks/useSimulation';
import { CreditCardItem } from '../modules/simulationControl/components/CreditCardItem';

const SimulationControlPage: React.FC = () => {
  const {
    cards,
    selectedCards,
    isSimulationRunning,
    isLoading,
    error,
    totalSpent,
    transactionsCount,
    toggleCardSelection,
    startSimulation,
    stopSimulation,
  } = useSimulation();

  const handleActionClick = async () => {
    if (isSimulationRunning) {
      await stopSimulation();
    } else {
      await startSimulation();
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Control de Simulación</h1>
              {isSimulationRunning && (
                <p className="text-blue-200 text-sm mt-1">
                  Las tarjetas se actualizan automáticamente cada 2 segundos
                </p>
              )}
            </div>
            
            <button
              onClick={handleActionClick}
              disabled={isLoading || (!isSimulationRunning && selectedCards.length === 0)}
              className={`px-8 py-3 rounded-lg font-semibold text-white shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                isSimulationRunning
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Procesando...</span>
                </span>
              ) : isSimulationRunning ? (
                'Detener'
              ) : (
                'Iniciar'
              )}
            </button>
          </div>

          {/* Status indicator */}
          <div className="mt-4 flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isSimulationRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-white text-sm font-medium">
              {isSimulationRunning ? 'Simulación en ejecución' : 'Simulación detenida'}
            </span>
            {selectedCards.length > 0 && !isSimulationRunning && (
              <span className="text-blue-200 text-sm">
                ({selectedCards.length} {selectedCards.length === 1 ? 'tarjeta seleccionada' : 'tarjetas seleccionadas'})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Statistics Panel - Solo visible durante simulación */}
      {isSimulationRunning && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-lg p-4 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-blue-200 text-sm mb-1">Total Gastado</p>
                <p className="text-white text-2xl font-bold">{formatCurrency(totalSpent)}</p>
              </div>
              <div className="text-center">
                <p className="text-blue-200 text-sm mb-1">Transacciones Procesadas</p>
                <p className="text-white text-2xl font-bold">{transactionsCount}</p>
              </div>
              <div className="text-center">
                <p className="text-blue-200 text-sm mb-1">Tarjetas Activas</p>
                <p className="text-white text-2xl font-bold">{selectedCards.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!isSimulationRunning && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-blue-800 bg-opacity-50 border border-blue-600 text-blue-100 px-4 py-3 rounded-lg">
            <p className="text-sm">
              💡 <strong>Cómo funciona:</strong> Selecciona una o más tarjetas y presiona "Iniciar". 
              El backend comenzará a simular transacciones y verás cómo los saldos bajan en tiempo real.
            </p>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading && cards.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-white mx-auto mb-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-white text-lg">Cargando tarjetas...</p>
            </div>
          </div>
        ) : cards.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white text-lg">No hay tarjetas disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {cards.map((card) => (
              <CreditCardItem
                key={card.id}
                card={card}
                isSelected={selectedCards.includes(card.id)}
                onToggleSelect={toggleCardSelection}
                disabled={isSimulationRunning}
                isSimulationRunning={isSimulationRunning}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-3">Información de la simulación</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Total de tarjetas:</span>
              <span className="text-white ml-2 font-semibold">{cards.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Tarjetas seleccionadas:</span>
              <span className="text-white ml-2 font-semibold">{selectedCards.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Estado:</span>
              <span className={`ml-2 font-semibold ${isSimulationRunning ? 'text-green-400' : 'text-gray-400'}`}>
                {isSimulationRunning ? 'Activa' : 'Inactiva'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationControlPage;