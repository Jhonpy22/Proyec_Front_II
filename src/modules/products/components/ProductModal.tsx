// modules/products/components/ProductModal.tsx
import React from 'react';
import type { ProductForm, ValidationErrors } from '../types';

interface ProductModalProps {
  isOpen: boolean;
  formData: ProductForm;
  errors: ValidationErrors;
  isSaving: boolean;
  error: string | null;
  isEditing: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: keyof ProductForm, value: string | number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  formData,
  errors,
  isSaving,
  error,
  isEditing,
  onClose,
  onSubmit,
  onChange,
  onIncrement,
  onDecrement,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 border-4 border-blue-400">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            {isEditing ? 'Editar producto' : 'Nombre del producto'}
          </h2>
        </div>

        {/* Error general */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          
          {/* Nombre del producto */}
          <div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="Ingresar nombre"
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
                errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
              }`}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Cantidad de producto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              Cantidad de producto
            </label>
            
            <div className="flex items-center justify-center space-x-6">
              {/* Botón Decrementar */}
              <button
                type="button"
                onClick={onDecrement}
                disabled={formData.quantity <= 1}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg flex items-center justify-center text-2xl font-bold text-gray-700 transition-colors"
              >
                −
              </button>

              {/* Display de cantidad */}
              <div className="w-20 h-12 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-800">
                  {formData.quantity}
                </span>
              </div>

              {/* Botón Incrementar */}
              <button
                type="button"
                onClick={onIncrement}
                className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-700 transition-colors"
              >
                +
              </button>
            </div>

            {errors.quantity && (
              <p className="mt-2 text-xs text-red-600 text-center">{errors.quantity}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
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