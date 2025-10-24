// auth/components/LoginForm.tsx
import React from 'react';

interface LoginFormProps {
  email: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  error: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  showPassword,
  isLoading,
  error,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}) => {
  return (
    <>
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onEmailChange}
              className="w-full px-4 py-3 pr-10 border-b-2 border-gray-300 focus:border-black focus:outline-none transition-colors bg-transparent"
              required
              disabled={isLoading}
              autoComplete="email"
            />
            <svg 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none"
            >
              <path 
                d="M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <path 
                d="M2 5l8 5 8-5" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={onPasswordChange}
              className="w-full px-4 py-3 pr-10 border-b-2 border-gray-300 focus:border-black focus:outline-none transition-colors bg-transparent"
              required
              disabled={isLoading}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path 
                    d="M10 4C5 4 2 10 2 10s3 6 8 6 8-6 8-6-3-6-8-6z" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  />
                  <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="2"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path 
                    d="M2 2l16 16M10 7a3 3 0 013 3" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={onSubmit}
          className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'ACCEDER'
          )}
        </button>
      </div>
    </>
  );
};