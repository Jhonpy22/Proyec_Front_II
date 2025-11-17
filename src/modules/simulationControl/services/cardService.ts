import api from "../../../api/apiConfig";
import type { Card } from "../../../models/index";

class CardService {
  async list(): Promise<Card[]> {
    const { data } = await api.get<Card[]>("/Cards");
    return data;
  }
}

export default new CardService();
