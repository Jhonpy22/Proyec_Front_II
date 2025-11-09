// pages/ProfilePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersonalData } from '../hooks/usePersonalData';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    formData,
    errors,
    isLoading,
    isSaving,
    error,
    handleChange,
    handleSubmit,
    resetForm,
  } = usePersonalData();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await handleSubmit();
    if (success) {
      navigate('/simulation-control');
    }
  };

  const handleCancel = () => {
    resetForm();
    navigate('/simulation-control');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      
      {/* Formulario con borde azul */}
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 border-4 border-blue-400">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Datos personales</h2>
        </div>

        {/* Error general */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          
          {/* Nombre completo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nombre completo
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Ingresar nombre"
              className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
                errors.fullName ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
              }`}
            />
            {errors.fullName && (
              <p className="mt-1.5 text-xs text-red-600">{errors.fullName}</p>
            )}
          </div>

          {/* Cantidad de dinero */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Cantidad de dinero
            </label>
            <input
              type="number"
              value={formData.balance}
              onChange={(e) => handleChange('balance', e.target.value)}
              placeholder="$1,000"
              step="0.01"
              min="0"
              className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
                errors.balance ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
              }`}
            />
            {errors.balance ? (
              <p className="mt-1.5 text-xs text-red-600">{errors.balance}</p>
            ) : (
              <p className="mt-1.5 text-xs text-gray-400">
                La cantidad ingresada soltura de un importe a $0
              </p>
            )}
          </div>

          {/* Número de cuenta */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Número de cuenta
            </label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) => handleChange('accountNumber', e.target.value)}
              placeholder="Debe ingresar los dígitos asociados de su cuenta"
              className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
                errors.accountNumber ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
              }`}
            />
            {errors.accountNumber && (
              <p className="mt-1.5 text-xs text-red-600">{errors.accountNumber}</p>
            )}
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleChange('birthDate', e.target.value)}
              className={`w-full px-4 py-2.5 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
                errors.birthDate ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
              }`}
            />
            {errors.birthDate ? (
              <p className="mt-1.5 text-xs text-red-600">{errors.birthDate}</p>
            ) : (
              <p className="mt-1.5 text-xs text-gray-400">MM/DD/YYYY</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
            >
              {isSaving ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Guardando...
                </span>
              ) : (
                'Siguiente'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
