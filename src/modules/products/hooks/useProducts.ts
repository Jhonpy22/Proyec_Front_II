import { useQuery } from "@tanstack/react-query";
import {ProductsService} from "../services/productsService";
import type { ProductResponse } from "../../../models";

export function useProducts() {
  return useQuery<ProductResponse[]>({
    queryKey: ["products"],
    queryFn: () => ProductsService.getAllProducts(),
  });
}