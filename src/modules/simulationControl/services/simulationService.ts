// modules/simulationControl/services/simulationService.ts
import type {
  CreditCard,
  SimulationStatus,
  StartSimulationRequest,
  StartSimulationResponse,
  StopSimulationResponse,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class SimulationService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  /**
   * Obtiene todas las tarjetas disponibles para simulación
   */
  async getAvailableCards(): Promise<CreditCard[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/simulation/cards`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al obtener las tarjetas');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getAvailableCards:', error);
      throw error;
    }
  }

  /**
   * Inicia la simulación con las tarjetas seleccionadas
   */
  async startSimulation(request: StartSimulationRequest): Promise<StartSimulationResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/simulation/start`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar la simulación');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en startSimulation:', error);
      throw error;
    }
  }

  /**
   * Detiene la simulación activa
   */
  async stopSimulation(): Promise<StopSimulationResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/simulation/stop`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al detener la simulación');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en stopSimulation:', error);
      throw error;
    }
  }

  /**
   * Obtiene el estado actual de la simulación (incluyendo saldos actualizados)
   */
  async getSimulationStatus(): Promise<SimulationStatus> {
    try {
      const response = await fetch(`${API_BASE_URL}/simulation/status`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al obtener el estado de la simulación');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getSimulationStatus:', error);
      throw error;
    }
  }

  /**
   * Obtiene solo los saldos actualizados de las tarjetas en simulación
   * Endpoint más ligero para polling frecuente
   */
  async getCardsBalance(cardIds: string[]): Promise<CreditCard[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/simulation/cards/balance`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ cardIds }),
      });

      if (!response.ok) {
        throw new Error('Error al obtener los saldos');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getCardsBalance:', error);
      throw error;
    }
  }
}

export default new SimulationService();