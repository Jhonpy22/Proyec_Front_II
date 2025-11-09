import api from '../../../api/apiConfig';
import type { LoginCredentials } from '../../../models/index';


export const authService = {
  async login(dto: LoginCredentials): Promise<void> {
    const { data } = await api.post('/Auth/login', dto);
    const token = data?.token;
      if (!token) throw new Error('No se recibió token del servidor')
        localStorage.setItem('token', token)
  },

  logout() {
    localStorage.removeItem('token'); 
    
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  },
};
