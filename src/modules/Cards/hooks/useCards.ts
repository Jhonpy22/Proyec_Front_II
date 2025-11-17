import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { CardDto, UpdateCardto } from "../../../models/index";

import { getCards, updateCard } from "../services/apiCards";

export function useGetCards() {
  return useQuery({
    queryKey: ["cards"],
    queryFn: getCards,
  });
}

export function useUpdateCard() {
  const queryClient = useQueryClient(); //Se usa para invalidar la cache

  return useMutation({
    mutationFn: async (cardData: UpdateCardto) => {
      return await updateCard(cardData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (err) => {
      console.error("Update card failed:", err);
    },
  });
}
