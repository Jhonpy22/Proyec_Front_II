import api from '../../../api/apiConfig';
import type { LoginCredentials } from '../../../models/index';


export const authService = {
  async Login (Auth: LoginCredentials): Promise<string> {
  const response = await api.post<string>('Auth/login', Auth);
  return response.data;
  
},

  logout() {
    localStorage.removeItem('token'); 
    
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  },
};
