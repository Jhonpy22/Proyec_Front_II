import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { SimulationService } from "../services/simulationService";

interface BackendError {
  message: string;
  statusCode?: number;
}

export function useStartSimulation() {
  return useMutation<void, AxiosError<BackendError>, void>({
    mutationFn: () => SimulationService.start(),

    onSuccess: () => {
      toast.success("Simulación iniciada correctamente ");
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ??
        "Ocurrió un error al iniciar la simulación";

      toast.error(message);
    },
  });
}
