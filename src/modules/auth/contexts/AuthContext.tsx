import { createContext, useContext } from 'react';


export type AuthContextType = {
    
    isAuthenticated: boolean
    logout: () => Promise<void>;
    isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
    throw new Error('useAuthContext debe usarse dentro de <AuthProvider>');
}
return context;
};
