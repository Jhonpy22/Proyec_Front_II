import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CardResponse, CardUpdate } from '../../../models';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { CardService } from '../services/cardService';

interface BackendError {
    message: string;
    statusCode?: number;
}

export function useCardUpdate(cardId: number) {
    const qc = useQueryClient();

    return useMutation<CardResponse, AxiosError<BackendError>, CardUpdate>({
        mutationFn: (dto) => CardService.update(cardId, dto),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['cards'] });
            qc.invalidateQueries({ queryKey: ['cards', 'id', cardId] });
            toast.success("Tarjeta actualizada correctamente");
        },

        onError: (error) => {
            const message =
                error.response?.data?.message ??
                "Error al actualizar la tarjeta";

            toast.error(message);
        },
    });
}
