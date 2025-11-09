// src/router/route.tsx
import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'

import { PublicLayout } from '../layout/public/PublicLayout'
import AdminLayout from '../layout/admin/AdminLayout'

import LandingPage from '../landing/LandingPage'
import LoginPage from '../modules/auth/pages/LoginPage'
import ProductsPage from '../modules/products/pages/ProductsPage'


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


const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: PublicLayout,
})


const indexRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: LandingPage,
})


const loginRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/login',
  component: LoginPage,
})


const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'admin',
  component: AdminLayout,
})


const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin',
  component: () => <div className="p-6">Bienvenido al panel de administración</div>,
})


const productsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/products',
  component: ProductsPage,
})


const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([indexRoute, loginRoute]),
  adminLayoutRoute.addChildren([adminIndexRoute, productsRoute]),
])


export const route = createRouter({
  routeTree,
})


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof route
  }
}