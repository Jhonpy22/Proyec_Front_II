import { tokenStorage } from './tokenStorage';
import { loginToKeycloak, refreshKeycloakToken, logoutFromKeycloak } from './keycloakService';
import type { LoginCredentials, KeycloakTokenResponse, UserInfo, } from '../../../models/types/authTypes';

class AuthService {
  async login(credentials: LoginCredentials): Promise<KeycloakTokenResponse> {
    const data = await loginToKeycloak(credentials);
    tokenStorage.set(data.access_token, data.refresh_token);
    return data;
  }

  async refreshToken(): Promise<KeycloakTokenResponse> {
    const refresh = tokenStorage.getRefresh();
    if (!refresh) throw new Error('No refresh token disponible');

    const data = await refreshKeycloakToken(refresh);
    tokenStorage.set(data.access_token, data.refresh_token);
    return data;
  }

  async logout(): Promise<void> {
    const refresh = tokenStorage.getRefresh();
    if (refresh) await logoutFromKeycloak(refresh);
    tokenStorage.clear();
  }

  getAccessToken(): string | null {
    return tokenStorage.getAccess();
  }

  getUserInfo(): UserInfo | null {
    const token = tokenStorage.getAccess();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload as UserInfo;
    } catch {
      return null;
    }
  }

  hasRole(role: string): boolean {
    const user = this.getUserInfo();
    return !!user?.realm_access?.roles.includes(role);
  }
}

export const authService = new AuthService();
