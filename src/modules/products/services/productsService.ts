import api from "../../../api/apiConfig";
import type { ProductResponse } from "../../../models";


export const ProductsService = {
  async getAllProducts(): Promise<ProductResponse[]> {
    const { data } = await api.get<ProductResponse[]>("/Products");
    return data;
  }
}

