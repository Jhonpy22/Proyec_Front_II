import React from 'react'
import { Link, useRouterState,} from '@tanstack/react-router'
import { useAuthContext } from '../../modules/auth/contexts/AuthContext'

interface MenuItem {
  id: string
  label: string
  path: string
  icon: React.ReactNode
}

export const Sidebar: React.FC = () => {
  const router = useRouterState()
  const { logout } = useAuthContext()
  
  const currentPath = router.location.pathname

  const menuItems: MenuItem[] = [
    {
      id: 'simulation',
      label: 'Control de Simulación',
      path: '/admin/simulation-control',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      id: 'profile',
      label: 'Datos Personales',
      path: '/admin/profile',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: 'products',
      label: 'Productos',
      path: '/admin/products',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
  ]

  const handleLogout = async () => {
    await logout()
  }

  return (
    <nav className="flex-1 p-4 space-y-2">
      {menuItems.map((item) => {
        const isActive = currentPath === item.path
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              isActive
                ? 'bg-blue-700 text-white shadow-lg'
                : 'text-blue-100 hover:bg-blue-700 hover:bg-opacity-50'
            }`}
          >
            <span className={isActive ? 'text-white' : 'text-blue-300'}>
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </Link>
        )
      })}
      
      
      <button
        onClick={handleLogout}
        className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-red-600 hover:text-white transition-all mt-4"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span className="font-medium">Cerrar Sesión</span>
      </button>
    </nav>
  )
}