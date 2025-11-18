import api from "../../../api/apiConfig";
import type { CardResponse, CardUpdate, PaginationResponse } from "../../../models/index";


export const CardService = {
    async list(page= 1, pageSize=10): Promise<PaginationResponse<CardResponse>> {
        const { data } = await api.get<PaginationResponse<CardResponse>>("/Cards/paged",  { 
                params: { page, pageSize }
            }
        );
        return data;
    },
    update: async (cardId: number, dto: CardUpdate): Promise<CardResponse> => {
        const { data } = await api.put<CardResponse>(`/Cards/${cardId}`, dto);
        return data;
    },
}