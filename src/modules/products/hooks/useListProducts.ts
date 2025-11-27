import { useQuery } from "@tanstack/react-query";
import {ProductsService} from "../services/productsService";
import type { PaginationResponse, ProductResponse } from "../../../models";

type Options = { enabled?: boolean };

export function useListProducts(page: number, pageSize: number,options?: Options) {
    return useQuery<PaginationResponse<ProductResponse>>({
        queryKey: ["products", page, pageSize],
        queryFn: () => ProductsService.list(page, pageSize),
        placeholderData: (prev) => prev,   
        staleTime: 30_000,
        retry: 0,
        enabled: options?.enabled ?? true,
    });
}