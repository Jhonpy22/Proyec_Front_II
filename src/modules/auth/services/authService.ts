// modules/auth/services/authService.ts
import axios, { AxiosError } from 'axios';
import type { LoginCredentials, KeycloakTokenResponse, UserInfo } from '../types/authTypes';

const KEYCLOAK_URL = import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080';
const KEYCLOAK_REALM = import.meta.env.VITE_KEYCLOAK_REALM || 'your-realm';
const KEYCLOAK_CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'your-client';

// ========== CREDENCIALES DE PRUEBA ==========
const MOCK_CREDENTIALS = {
  email: 'admin@test.com',
  password: '123456'
};
// ============================================

class AuthService {
  private readonly tokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';

  /**
   * Login con Keycloak usando password grant
   */
  async login(credentials: LoginCredentials): Promise<KeycloakTokenResponse> {
    try {
      // ========== MODO SIMULACIÓN (TEMPORAL) ==========
      // ELIMINAR ESTE BLOQUE CUANDO KEYCLOAK ESTÉ LISTO
      
      console.log('🔐 Login en modo simulación con:', credentials);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validación de credenciales mock
      if (credentials.email === MOCK_CREDENTIALS.email && 
          credentials.password === MOCK_CREDENTIALS.password) {
        
        // Crear mock token con información de usuario
        const mockUserData = {
          sub: 'mock-user-123',
          email: credentials.email,
          email_verified: true,
          name: 'Jhonn Granados Rojas',
          preferred_username: 'admin',
          given_name: 'Jhonn',
          family_name: 'Granados',
          realm_access: {
            roles: ['admin', 'user']
          },
          exp: Math.floor(Date.now() / 1000) + 3600 // Expira en 1 hora
        };
        
        // Crear un mock JWT token (no es un JWT real, solo para testing)
        const mockToken = 'mock_jwt_' + btoa(JSON.stringify(mockUserData));
        const mockRefresh = 'mock_refresh_token_' + Date.now();
        
        this.setTokens(mockToken, mockRefresh);
        
        console.log('✅ Login simulado exitoso');
        
        return {
          access_token: mockToken,
          refresh_token: mockRefresh,
          expires_in: 3600,
          refresh_expires_in: 7200,
          token_type: 'Bearer',
          scope: 'openid profile email'
        };
      } else {
        console.log('❌ Credenciales incorrectas');
        throw new Error('Usuario o contraseña incorrectos');
      }
      
      // ========== FIN MODO SIMULACIÓN ==========
      
      
      /* ========== DESCOMENTAR CUANDO KEYCLOAK ESTÉ LISTO ==========
      
      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('client_id', KEYCLOAK_CLIENT_ID);
      params.append('username', credentials.email);
      params.append('password', credentials.password);

      const response = await axios.post<KeycloakTokenResponse>(
        `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token, refresh_token } = response.data;
      
      this.setTokens(access_token, refresh_token);
      
      return response.data;
      
      ============================================================ */
      
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Refresh el access token usando el refresh token
   */
  async refreshToken(): Promise<KeycloakTokenResponse> {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // ========== MODO SIMULACIÓN (TEMPORAL) ==========
      console.log('🔄 Refresh token en modo simulación');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockUserData = {
        sub: 'mock-user-123',
        email: MOCK_CREDENTIALS.email,
        email_verified: true,
        name: 'Jhonn Granados Rojas',
        preferred_username: 'admin',
        given_name: 'Jhonn',
        family_name: 'Granados',
        realm_access: {
          roles: ['admin', 'user']
        },
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      
      const newMockToken = 'mock_jwt_' + btoa(JSON.stringify(mockUserData));
      const newMockRefresh = 'mock_refresh_token_' + Date.now();
      
      this.setTokens(newMockToken, newMockRefresh);
      
      return {
        access_token: newMockToken,
        refresh_token: newMockRefresh,
        expires_in: 3600,
        refresh_expires_in: 7200,
        token_type: 'Bearer',
        scope: 'openid profile email'
      };
      // ========== FIN MODO SIMULACIÓN ==========

      /* ========== DESCOMENTAR CUANDO KEYCLOAK ESTÉ LISTO ==========
      
      const params = new URLSearchParams();
      params.append('grant_type', 'refresh_token');
      params.append('client_id', KEYCLOAK_CLIENT_ID);
      params.append('refresh_token', refreshToken);

      const response = await axios.post<KeycloakTokenResponse>(
        `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`,
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const { access_token, refresh_token: new_refresh_token } = response.data;
      
      this.setTokens(access_token, new_refresh_token);
      
      return response.data;
      
      ============================================================ */
      
    } catch (error) {
      this.logout();
      throw this.handleError(error);
    }
  }

  /**
   * Logout del usuario y limpia los tokens
   */
  async logout(): Promise<void> {
    try {
      const refreshToken = this.getRefreshToken();
      
      // ========== MODO SIMULACIÓN (TEMPORAL) ==========
      console.log('🚪 Logout en modo simulación');
      await new Promise(resolve => setTimeout(resolve, 300));
      // ========== FIN MODO SIMULACIÓN ==========
      
      /* ========== DESCOMENTAR CUANDO KEYCLOAK ESTÉ LISTO ==========
      
      if (refreshToken) {
        const params = new URLSearchParams();
        params.append('client_id', KEYCLOAK_CLIENT_ID);
        params.append('refresh_token', refreshToken);

        await axios.post(
          `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/logout`,
          params,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
      }
      
      ============================================================ */
      
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
    }
  }

  /**
   * Guarda los tokens en localStorage
   */
  setTokens(accessToken: string, refreshToken?: string): void {
    localStorage.setItem(this.tokenKey, accessToken);
    if (refreshToken) {
      localStorage.setItem(this.refreshTokenKey, refreshToken);
    }
  }

  /**
   * Obtiene el access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Obtiene el refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  /**
   * Limpia todos los tokens
   */
  clearTokens(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    // Para mock tokens
    if (token.startsWith('mock_jwt_')) {
      const userInfo = this.decodeToken(token);
      if (!userInfo || !userInfo.exp) return false;
      
      const now = Math.floor(Date.now() / 1000);
      return userInfo.exp > now;
    }

    // Para JWT reales de Keycloak
    const userInfo = this.decodeToken(token);
    if (!userInfo || !userInfo.exp) return false;

    const now = Math.floor(Date.now() / 1000);
    return userInfo.exp > now;
  }

  /**
   * Decodifica un JWT token (o mock token)
   */
  decodeToken(token: string): (UserInfo & { exp?: number }) | null {
    try {
      // Para mock tokens
      if (token.startsWith('mock_jwt_')) {
        const mockData = token.replace('mock_jwt_', '');
        return JSON.parse(atob(mockData));
      }
      
      // Para JWT reales
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Obtiene la información del usuario del token
   */
  getUserInfo(): UserInfo | null {
    const token = this.getAccessToken();
    if (!token) return null;
    return this.decodeToken(token);
  }

  /**
   * Verifica si el usuario tiene un rol específico
   */
  hasRole(role: string): boolean {
    const userInfo = this.getUserInfo();
    if (!userInfo?.realm_access?.roles) return false;
    return userInfo.realm_access.roles.includes(role);
  }

  /**
   * Obtiene los roles del usuario
   */
  getUserRoles(): string[] {
    const userInfo = this.getUserInfo();
    return userInfo?.realm_access?.roles || [];
  }

  /**
   * Maneja los errores de las peticiones
   */
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ 
        error_description?: string; 
        message?: string;
        error?: string;
      }>;
      
      // Errores específicos de Keycloak
      if (axiosError.response?.data?.error === 'invalid_grant') {
        return new Error('Usuario o contraseña incorrectos');
      }
      
      const message = 
        axiosError.response?.data?.error_description || 
        axiosError.response?.data?.message || 
        'Error al iniciar sesión';
      
      return new Error(message);
    }
    
    if (error instanceof Error) {
      return error;
    }
    
    return new Error('Error de conexión');
  }
}

export default new AuthService();