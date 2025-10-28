import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService'
import type { LoginCredentials, UserInfo, LoginResult } from '../../../models/types/authTypes';

interface UseAuthReturn {
  isAuthenticated: boolean;
  user: UserInfo | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResult>;
  logout: () => Promise<void>;
  refreshAuth: () => void;
  hasRole: (role: string) => boolean;
  getRoles: () => string[];
}
/*PRUEBA*/
export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = useCallback((): void => {
    const authenticated = authService.isAuthenticated();
    setIsAuthenticated(authenticated);
    
    if (authenticated) {
      const userInfo = authService.getUserInfo();
      setUser(userInfo);
    } else {
      setUser(null);
    }
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
    try {
      await authService.login(credentials);
      checkAuth();
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return { success: false, error: errorMessage };
    }
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const refreshAuth = (): void => {
    checkAuth();
  };

  const hasRole = (role: string): boolean => {
    return authService.hasRole(role);
  };

  const getRoles = (): string[] => {
    return authService.getUserRoles();
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    refreshAuth,
    hasRole,
    getRoles,
  };
};