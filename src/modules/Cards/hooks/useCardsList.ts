import { useQuery } from "@tanstack/react-query";
import type { CardResponse, PaginationResponse } from "../../../models";
import { CardService } from "../services/cardService";


type Options = { enabled?: boolean };

export function useCardsList(page: number, pageSize: number,options?: Options) {
    return useQuery<PaginationResponse<CardResponse>>({
        queryKey: ["cards", page, pageSize],
        queryFn: () => CardService.list(page, pageSize),
        placeholderData: (prev) => prev,   
        staleTime: 30_000,
        retry: 0,
        enabled: options?.enabled ?? true,
    });
}