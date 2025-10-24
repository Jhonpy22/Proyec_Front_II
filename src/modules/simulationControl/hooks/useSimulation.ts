// modules/simulationControl/hooks/useSimulation.ts
// LISTO PARA BACKEND - Sin datos mock
import { useState, useEffect, useCallback, useRef } from 'react';
import simulationService from '../services/simulationService';
import type { CreditCard } from '../types';

interface UseSimulationReturn {
  cards: CreditCard[];
  selectedCards: string[];
  isSimulationRunning: boolean;
  isLoading: boolean;
  error: string | null;
  totalSpent: number;
  transactionsCount: number;
  toggleCardSelection: (cardId: string) => void;
  startSimulation: () => Promise<void>;
  stopSimulation: () => Promise<void>;
  loadCards: () => Promise<void>;
}

const POLLING_INTERVAL = 2000; // 2 segundos

export const useSimulation = (): UseSimulationReturn => {
  const [cards, setCards] = useState<CreditCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalSpent, setTotalSpent] = useState(0);
  const [transactionsCount, setTransactionsCount] = useState(0);
  
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cargar tarjetas disponibles desde el backend
  const loadCards = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedCards = await simulationService.getAvailableCards();
      setCards(fetchedCards.map(card => ({
        ...card,
        initialBalance: card.initialBalance || card.balance,
      })));
    } catch (err) {
      setError('Error al cargar las tarjetas desde el servidor');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Actualizar saldos de tarjetas en simulación desde el backend
  const updateCardsBalance = useCallback(async () => {
    if (selectedCards.length === 0 || !isSimulationRunning) return;

    try {
      const status = await simulationService.getSimulationStatus();
      
      if (status.cards && status.cards.length > 0) {
        setCards(prevCards => 
          prevCards.map(card => {
            const updated = status.cards.find(u => u.id === card.id);
            return updated ? { ...card, ...updated } : card;
          })
        );
      }

      if (status.totalSpent !== undefined) {
        setTotalSpent(status.totalSpent);
      }
      if (status.transactionsCount !== undefined) {
        setTransactionsCount(status.transactionsCount);
      }
      
    } catch (err) {
      console.error('Error al actualizar saldos:', err);
      // No mostrar error en UI para evitar interrumpir el flujo
    }
  }, [selectedCards, isSimulationRunning]);

  // Polling: Actualizar cada 2 segundos durante la simulación
  useEffect(() => {
    if (isSimulationRunning && selectedCards.length > 0) {
      updateCardsBalance();
      
      pollingIntervalRef.current = setInterval(() => {
        updateCardsBalance();
      }, POLLING_INTERVAL);
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [isSimulationRunning, selectedCards, updateCardsBalance]);

  // Cargar estado inicial al montar el componente
  useEffect(() => {
    loadCards();
    
    const checkSimulationStatus = async () => {
      try {
        const status = await simulationService.getSimulationStatus();
        setIsSimulationRunning(status.isRunning);
        if (status.totalSpent) setTotalSpent(status.totalSpent);
        if (status.transactionsCount) setTransactionsCount(status.transactionsCount);
      } catch (err) {
        console.error('Error al verificar estado de simulación:', err);
      }
    };
    
    checkSimulationStatus();
  }, [loadCards]);

  // Seleccionar/deseleccionar tarjetas
  const toggleCardSelection = useCallback((cardId: string) => {
    if (isSimulationRunning) return;
    
    setSelectedCards((prev) => {
      if (prev.includes(cardId)) {
        return prev.filter((id) => id !== cardId);
      } else {
        return [...prev, cardId];
      }
    });
  }, [isSimulationRunning]);

  // Iniciar simulación llamando al backend
  const startSimulation = useCallback(async () => {
    if (selectedCards.length === 0) {
      setError('Debes seleccionar al menos una tarjeta');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await simulationService.startSimulation({
        cards: selectedCards,
      });

      if (response.success) {
        setCards(prevCards =>
          prevCards.map(card => ({
            ...card,
            initialBalance: card.balance,
          }))
        );
        
        setIsSimulationRunning(true);
        setTotalSpent(0);
        setTransactionsCount(0);
        setError(null);
      } else {
        setError(response.message || 'Error al iniciar la simulación');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor. Verifica que la API esté corriendo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCards]);

  // Detener simulación llamando al backend
  const stopSimulation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }

    try {
      const response = await simulationService.stopSimulation();

      if (response.success) {
        setIsSimulationRunning(false);
        setError(null);
        await loadCards();
        setSelectedCards([]);
      } else {
        setError(response.message || 'Error al detener la simulación');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [loadCards]);

  return {
    cards,
    selectedCards,
    isSimulationRunning,
    isLoading,
    error,
    totalSpent,
    transactionsCount,
    toggleCardSelection,
    startSimulation,
    stopSimulation,
    loadCards,
  };
};