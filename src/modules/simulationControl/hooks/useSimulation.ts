import { useMutation } from "@tanstack/react-query";
import { SimulationService } from "../services/simulationService";
import { useState } from "react";

export function useSimulation() {
  const [isProcessRunning, setIsProcessRunning] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    mutateAsync: startPurchaseJob,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: () => SimulationService.start(),

    onSuccess: () => {
      setSuccessMessage("Simulación iniciada correctamente 🚀");
      setIsProcessRunning(true); // ← activa el polling
    },
  });

  return {
    startPurchaseJob,
    isLoading,
    isError,
    error,
    isSuccess,
    successMessage,
    isProcessRunning,
  };
}
