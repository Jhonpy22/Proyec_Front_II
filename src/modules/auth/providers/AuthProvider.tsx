import { AuthContext } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { authService } from '../services/authService'

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsAuthenticated(!!token)
        setIsLoading(false)
    }, [])

    const logout = async () => {
        authService.logout()
        setIsAuthenticated(false)
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex items-center space-x-2 text-blue-600 animate-pulse">
                    <svg 
                        className="w-5 h-5 animate-spin" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                    >
                        <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                        />
                        <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span className="text-lg font-medium">Verificando sesión…</span>
                </div>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}