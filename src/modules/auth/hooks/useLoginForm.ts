// auth/hooks/useLoginForm.ts
import { useState, ChangeEvent, FormEvent } from 'react';
import type { LoginCredentials } from '../types/authTypes';

interface UseLoginFormReturn {
  formData: LoginCredentials;
  showPassword: boolean;
  isLoading: boolean;
  error: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility: () => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  resetForm: () => void;
}

export const useLoginForm = (): UseLoginFormReturn => {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  const resetForm = (): void => {
    setFormData({ email: '', password: '' });
    setShowPassword(false);
    setError('');
    setIsLoading(false);
  };

  return {
    formData,
    showPassword,
    isLoading,
    error,
    handleChange,
    togglePasswordVisibility,
    setIsLoading,
    setError,
    resetForm,
  };
};