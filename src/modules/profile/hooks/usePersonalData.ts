// modules/profile/hooks/usePersonalData.ts
import { useState, useEffect, useCallback } from 'react';
import profileService from '../services/profileService';
import type { PersonalDataForm, ValidationErrors } from '../types';

interface UsePersonalDataReturn {
  formData: PersonalDataForm;
  errors: ValidationErrors;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  handleChange: (field: keyof PersonalDataForm, value: string) => void;
  handleSubmit: () => Promise<boolean>;
  resetForm: () => void;
}

const initialFormData: PersonalDataForm = {
  fullName: '',
  accountNumber: '',
  balance: '',
  birthDate: '',
};

export const usePersonalData = (): UsePersonalDataReturn => {
  const [formData, setFormData] = useState<PersonalDataForm>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos existentes al montar
  useEffect(() => {
    loadPersonalData();
  }, []);

  const loadPersonalData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await profileService.getPersonalData();
      setFormData({
        fullName: data.fullName || '',
        accountNumber: data.accountNumber || '',
        balance: data.balance ? data.balance.toString() : '',
        birthDate: data.birthDate || '',
      });
    } catch (err) {
      console.error('Error al cargar datos:', err);
      // No mostrar error si no hay datos previos (primera vez)
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = useCallback((field: keyof PersonalDataForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo al escribir
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }, []);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Validar nombre completo
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'El nombre debe tener al menos 3 caracteres';
    }

    // Validar cantidad de dinero
    if (!formData.balance.trim()) {
      newErrors.balance = 'La cantidad de dinero es requerida';
    } else {
      const balanceNum = parseFloat(formData.balance);
      if (isNaN(balanceNum)) {
        newErrors.balance = 'Debe ser un número válido';
      } else if (balanceNum < 0) {
        newErrors.balance = 'La cantidad no puede ser negativa';
      } else if (balanceNum > 100000000) {
        newErrors.balance = 'La cantidad ingresada supera el límite permitido';
      }
    }

    // Validar número de cuenta
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'El número de cuenta es requerido';
    } else if (!/^\d+$/.test(formData.accountNumber)) {
      newErrors.accountNumber = 'Solo se permiten números en la cuenta';
    }

    // Validar fecha de nacimiento
    if (!formData.birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es requerida';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (birthDate > today) {
        newErrors.birthDate = 'La fecha no puede ser futura';
      } else if (age < 18) {
        newErrors.birthDate = 'Debes ser mayor de 18 años';
      } else if (age > 120) {
        newErrors.birthDate = 'Fecha no válida';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<boolean> => {
    setError(null);

    if (!validateForm()) {
      return false;
    }

    setIsSaving(true);

    try {
      const response = await profileService.savePersonalData({
        fullName: formData.fullName.trim(),
        accountNumber: formData.accountNumber.trim(),
        balance: parseFloat(formData.balance),
        birthDate: formData.birthDate,
      });

      if (response.success) {
        return true;
      } else {
        setError(response.message || 'Error al guardar los datos');
        return false;
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor');
      console.error(err);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setError(null);
  }, []);

  return {
    formData,
    errors,
    isLoading,
    isSaving,
    error,
    handleChange,
    handleSubmit,
    resetForm,
  };
};