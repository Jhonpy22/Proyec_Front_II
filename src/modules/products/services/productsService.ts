import api from "../../../api/apiConfig";
import type { PaginationResponse, ProductResponse, ProductUpdateForm } from "../../../models/index";


export const ProductsService = {
  async list(page= 1, pageSize=10): Promise<PaginationResponse<ProductResponse>> {
    const { data } = await api.get<PaginationResponse<ProductResponse>>("/Products/paged",  { 
            params: { page, pageSize }
        }
    );
    return data;
  },
  updateQuantity: async (productId: number, dto: ProductUpdateForm): Promise<ProductResponse> => {
    const { data } = await api.patch<ProductResponse>(`/Products/${productId}`, dto);
    return data;
  },
}

