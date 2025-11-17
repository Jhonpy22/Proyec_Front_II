// services/simulationService.ts
import api from "../../../api/apiConfig";

export const SimulationService = {
  async start(): Promise<void> {
    const { data } = await api.post<void>("/Jobs/purchase");
    return data;
  }
}
