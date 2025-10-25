// modules/profile/components/PersonalDataForm.tsx
import React from 'react';
import type { PersonalDataForm, ValidationErrors } from '../types';

interface PersonalDataFormProps {
  formData: PersonalDataForm;
  errors: ValidationErrors;
  isSaving: boolean;
  onFieldChange: (field: keyof PersonalDataForm, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const PersonalDataFormComponent: React.FC<PersonalDataFormProps> = ({
  formData,
  errors,
  isSaving,
  onFieldChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Nombre completo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Nombre completo
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => onFieldChange('fullName', e.target.value)}
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
          onChange={(e) => onFieldChange('balance', e.target.value)}
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
          onChange={(e) => onFieldChange('accountNumber', e.target.value)}
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
          onChange={(e) => onFieldChange('birthDate', e.target.value)}
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
          onClick={onCancel}
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
  );
};