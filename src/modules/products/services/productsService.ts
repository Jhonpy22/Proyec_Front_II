import type { DeleteProductResponse, Product, SaveProductRequest, SaveProductResponse } from "../../../models";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ProductsService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }


  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getProducts:', error);
      throw error;
    }
  }


  async createProduct(data: SaveProductRequest): Promise<SaveProductResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en createProduct:', error);
      throw error;
    }
  }

  
  async updateProduct(id: string, data: SaveProductRequest): Promise<SaveProductResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en updateProduct:', error);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<DeleteProductResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en deleteProduct:', error);
      throw error;
    }
  }
}

export default new ProductsService();