// modules/profile/services/profileService.ts
import type {
  PersonalData,
  SavePersonalDataRequest,
  SavePersonalDataResponse,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ProfileService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  /**
   * Obtiene los datos personales del usuario
   */
  async getPersonalData(): Promise<PersonalData> {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/personal-data`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al obtener los datos personales');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getPersonalData:', error);
      throw error;
    }
  }

  /**
   * Guarda o actualiza los datos personales del usuario
   */
  async savePersonalData(data: SavePersonalDataRequest): Promise<SavePersonalDataResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/personal-data`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los datos personales');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en savePersonalData:', error);
      throw error;
    }
  }
}

export default new ProfileService();