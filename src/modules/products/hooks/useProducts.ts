import { useState, useEffect, useCallback } from 'react';
import productsService from '../services/productsService';
import type { Product, ProductForm, ValidationErrors } from '../../../models/index';

interface UseProductsReturn {
  products: Product[];
  formData: ProductForm;
  errors: ValidationErrors;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  showModal: boolean;
  editingProduct: Product | null;
  handleChange: (field: keyof ProductForm, value: string | number) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleSubmit: () => Promise<boolean>;
  handleDelete: (id: string) => Promise<void>;
  openModal: (product?: Product) => void;
  closeModal: () => void;
  resetForm: () => void;
}

const initialFormData: ProductForm = {
  name: '',
  quantity: 1,
};

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<ProductForm>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);


  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await productsService.getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('Error al cargar los productos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = useCallback((field: keyof ProductForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }, []);

  const handleIncrement = useCallback(() => {
    setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }));
  }, []);

  const handleDecrement = useCallback(() => {
    setFormData(prev => ({ 
      ...prev, 
      quantity: Math.max(1, prev.quantity - 1) 
    }));
  }, []);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre del producto es requerido';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (formData.quantity < 1) {
      newErrors.quantity = 'La cantidad debe ser al menos 1';
    } else if (formData.quantity > 10000) {
      newErrors.quantity = 'La cantidad supera el límite permitido';
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
      const response = editingProduct
        ? await productsService.updateProduct(editingProduct.id!, {
            name: formData.name.trim(),
            quantity: formData.quantity,
          })
        : await productsService.createProduct({
            name: formData.name.trim(),
            quantity: formData.quantity,
          });

      if (response.success) {
        await loadProducts();
        closeModal();
        return true;
      } else {
        setError(response.message || 'Error al guardar el producto');
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

  const handleDelete = async (id: string): Promise<void> => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }

    try {
      const response = await productsService.deleteProduct(id);
      if (response.success) {
        await loadProducts();
      } else {
        setError(response.message || 'Error al eliminar el producto');
      }
    } catch (err) {
      setError('No se pudo eliminar el producto');
      console.error(err);
    }
  };

  const openModal = useCallback((product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        quantity: product.quantity,
      });
    } else {
      setEditingProduct(null);
      setFormData(initialFormData);
    }
    setShowModal(true);
    setErrors({});
    setError(null);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData(initialFormData);
    setErrors({});
    setError(null);
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setError(null);
  }, []);

  return {
    products,
    formData,
    errors,
    isLoading,
    isSaving,
    error,
    showModal,
    editingProduct,
    handleChange,
    handleIncrement,
    handleDecrement,
    handleSubmit,
    handleDelete,
    openModal,
    closeModal,
    resetForm,
  };
};