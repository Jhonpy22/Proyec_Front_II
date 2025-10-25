// modules/products/types/index.ts

export interface Product {
  id?: string;
  name: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductForm {
  name: string;
  quantity: number;
}

export interface SaveProductRequest {
  name: string;
  quantity: number;
}

export interface SaveProductResponse {
  success: boolean;
  message: string;
  data?: Product;
}

export interface DeleteProductResponse {
  success: boolean;
  message: string;
}

export interface ValidationErrors {
  name?: string;
  quantity?: string;
}