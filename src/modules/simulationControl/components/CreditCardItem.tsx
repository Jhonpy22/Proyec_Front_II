// SimulationControlPage.tsx
import React from 'react';
import { useSimulation } from '../hooks/useSimulation';

const SimulationControlPage: React.FC = () => {
  const {
    isLoading,
    error,
    successMessage,
    startPurchaseJob,
  } = useSimulation();

  const handleStartClick = async () => {
    await startPurchaseJob();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Control de Simulación</h1>
              <p className="text-blue-200 text-sm mt-1">
                Inicia el proceso de compras automáticas
              </p>
            </div>
            
            <button
              onClick={handleStartClick}
              disabled={isLoading}
              className="px-8 py-3 rounded-lg font-semibold text-white shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700"
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Iniciando...</span>
                </span>
              ) : (
                '🚀 Iniciar Proceso de Compras'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">{successMessage}</span>
          </div>
        </div>
      )}

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

      {/* Instructions */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-blue-800 bg-opacity-50 border border-blue-600 text-blue-100 px-6 py-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-semibold mb-2">💡 ¿Cómo funciona?</p>
              <p className="text-sm">
                Al presionar el botón "Iniciar", se disparará el proceso automático de compras en el backend. 
                El sistema comenzará a procesar transacciones usando las tarjetas configuradas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-blue-600 rounded-lg p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Proceso Automático</h3>
            </div>
            <p className="text-gray-300 text-sm">
              El backend manejará todas las transacciones de forma automática sin intervención manual.
            </p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-green-600 rounded-lg p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Ejecución en Background</h3>
            </div>
            <p className="text-gray-300 text-sm">
              El job se ejecuta en segundo plano, permitiéndote continuar con otras tareas.
            </p>
          </div>

          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-purple-600 rounded-lg p-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold">Inicio Rápido</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Un solo clic para iniciar todo el proceso de simulación de compras.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gray-800 bg-opacity-30 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${successMessage ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-gray-300 text-sm">
                {successMessage ? 'Proceso iniciado correctamente' : 'Esperando inicio del proceso'}
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              Endpoint: <code className="text-blue-300">/api/Jobs/purchase</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationControlPage;