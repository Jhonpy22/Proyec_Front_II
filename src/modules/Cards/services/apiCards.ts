import api from "../../../api/apiConfig";

import type { CardDto, UpdateCardto } from "../../../models/index";

export async function getCards() {
  const { data } = await api.get("/Cards");
  return data;
}

export async function updateCard(cardData: UpdateCardto) {
  const { data } = await api.put(`/Cards/${cardData.card_Id}`, cardData);
  return data;
}
