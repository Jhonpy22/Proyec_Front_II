import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductsService } from '../services/productsService';
import type { ProductUpdateForm, ProductResponse } from '../../../models';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';

interface BackendError {
    message: string;
    statusCode?: number;
}

export function useUpdateProductQuantity(id: number) {
    const qc = useQueryClient();

    return useMutation<ProductResponse, AxiosError<BackendError>, ProductUpdateForm>({
        mutationFn: (dto) => ProductsService.updateQuantity(id, dto),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['products'] });
            qc.invalidateQueries({ queryKey: ['products', 'id', id] });
            toast.success("Cantidad actualizada correctamente");
        },

        onError: (error) => {
            const message =
                error.response?.data?.message ??
                "Error al actualizar el producto";

            toast.error(message);
        },
    });
}
