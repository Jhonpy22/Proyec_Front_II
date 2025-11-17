// SimulationControlPage.tsx
import React, { useState, useEffect } from "react";
import { useSimulation } from "../hooks/useSimulation";

import cardService from "../services/cardService";
import type { Card } from "../services/cardService";

import CreditCard from "../components/CreditCard";

const SimulationControlPage: React.FC = () => {
  console.log("🟦 [PAGE] SimulationControlPage renderizó");

  const {
    isLoading,
    error,
    successMessage,
    isProcessRunning,
    startPurchaseJob,
  } = useSimulation();

  const [cards, setCards] = useState<Card[]>([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [cardsError, setCardsError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  // 🔵 Cargar tarjetas
  const loadCards = async () => {
    console.log("📡 [LOAD] Cargando tarjetas desde el backend...");
    setLoadingCards(true);
    setCardsError(null);

    try {
      const fetchedCards = await cardService.list(); // 👈 YA NO getCards()

      console.log("📥 [LOAD] Tarjetas recibidas:", fetchedCards);

      setCards(fetchedCards);

      if (startIndex >= fetchedCards.length) {
        setStartIndex(0);
      }
    } catch (err) {
      console.error("❌ [LOAD] Error cargando tarjetas:", err);
      setCardsError("Error al cargar las tarjetas");
    } finally {
      setLoadingCards(false);
    }
  };

  // 🔵 Cargar al entrar
  useEffect(() => {
    console.log("🟢 [EFFECT] Cargando tarjetas iniciales");
    loadCards();
  }, []);

  // 🔵 Polling cada 3 segundos si el job está corriendo
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isProcessRunning) {
      console.log("⏳ [POLLING] Activado cada 3 segundos");

      interval = setInterval(() => {
        console.log("🔁 [POLLING] Refrescando tarjetas...");
        loadCards();
      }, 3000);
    } else {
      console.log("⛔ [POLLING] Desactivado");
    }

    return () => {
      if (interval) {
        console.log("🧹 [POLLING] Limpieza del intervalo");
        clearInterval(interval);
      }
    };
  }, [isProcessRunning]);

  // 🔵 Obtener lote visible
  const getVisibleCards = () => {
    if (cards.length === 0) return [];

    const slice = cards.slice(startIndex, startIndex + 5);

    if (slice.length < 5) {
      return [...slice, ...cards.slice(0, 5 - slice.length)];
    }

    return slice;
  };

  const visibleCards = getVisibleCards();

  // 🔵 Iniciar proceso
  const handleStartClick = async () => {
    await startPurchaseJob();

    setTimeout(() => {
      loadCards();
    }, 1000);
  };

  // 🔵 Cambiar lote
  const handleNextBatch = () => {
    if (cards.length === 0) return;

    setStartIndex((prev) => (prev + 5) % cards.length);
    loadCards();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Control de Simulación</h1>
              <p className="text-blue-200 text-sm mt-1">Inicia el proceso de compras automáticas</p>
            </div>

            <button
              onClick={handleStartClick}
              disabled={isLoading || isProcessRunning}
              className="px-8 py-3 rounded-lg font-semibold text-white shadow-lg bg-green-600 hover:bg-green-700"
            >
              {isLoading
                ? "Iniciando..."
                : isProcessRunning
                ? "Proceso en Ejecución"
                : "🚀 Iniciar Proceso de Compras"}
            </button>
          </div>
        </div>
      </div>

      {/* TARJETAS */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Tarjetas Disponibles</h2>
            <p className="text-blue-200 text-sm mt-1">Mostrando 5 de {cards.length} tarjetas</p>
          </div>

          <button
            onClick={handleNextBatch}
            disabled={loadingCards || cards.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            {loadingCards ? "Cargando..." : "Actualizar"}
          </button>
        </div>

        {loadingCards && cards.length === 0 ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto"></div>
            <p className="text-gray-300 mt-4 text-lg">Cargando tarjetas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleCards.map((item) => (
              <CreditCard key={item.card_Id} card={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationControlPage;
