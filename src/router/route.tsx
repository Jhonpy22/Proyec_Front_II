// src/router/route.tsx
import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'

import { PublicLayout } from '../layout/public/PublicLayout'
import AdminLayout from '../layout/admin/AdminLayout'

import LandingPage from '../landing/LandingPage'
import LoginPage from '../modules/auth/pages/LoginPage'
import ProductsPage from '../modules/products/pages/ProductsPage'

// ✅ Ruta raíz - Solo una instancia
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Toaster />
      <Suspense fallback={<div className="p-6 text-center">Cargando…</div>}>
        <Outlet />
      </Suspense>
    </>
  ),
})

// ✅ Layout público - SIN PATH, solo un wrapper
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: PublicLayout,
})

// ✅ Página principal (landing)
const indexRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: LandingPage,
})

// ✅ Login
const loginRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/login',
  component: LoginPage,
})

// ✅ Layout admin - SIN PATH, solo un wrapper
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'admin',
  component: AdminLayout,
})

// ✅ Dashboard admin
const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin',
  component: () => <div className="p-6">Bienvenido al panel de administración</div>,
})

// ✅ Productos
const productsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/products',
  component: ProductsPage,
})

// ✅ Árbol de rutas
const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([indexRoute, loginRoute]),
  adminLayoutRoute.addChildren([adminIndexRoute, productsRoute]),
])

// ✅ Exportar router
export const route = createRouter({
  routeTree,
})

// ✅ Type safety para TypeScript
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof route
  }
}