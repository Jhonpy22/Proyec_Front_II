// pages/LoginPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../modules/auth/hooks/useAuth';
import { useLoginForm } from '../modules/auth/hooks/useLoginForm';
import { LoginForm } from '../modules/auth/components/LoginForm';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    formData,
    showPassword,
    isLoading,
    error,
    handleChange,
    togglePasswordVisibility,
    setIsLoading,
    setError,
  } = useLoginForm();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(formData);
    
    if (result.success) {
      // CAMBIO AQUÍ: Redirige a la ruta correcta que existe en tu AppRoutes
      navigate('/simulation-control'); // O simplemente navigate('/')
    } else {
      setError(result.error || 'Error al iniciar sesión');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background image blur effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200)',
          filter: 'blur(8px) grayscale(100%)',
          transform: 'scale(1.1)',
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      {/* Login Card */}
      <div className="relative z-10 bg-white bg-opacity-95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h1>
        </div>

        {/* Login Form Component */}
        <LoginForm
          email={formData.email}
          password={formData.password}
          showPassword={showPassword}
          isLoading={isLoading}
          error={error}
          onEmailChange={handleChange}
          onPasswordChange={handleChange}
          onTogglePassword={togglePasswordVisibility}
          onSubmit={handleSubmit}
        />

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Login - Jhonn Granados Rojas
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;