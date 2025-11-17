import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'
import { Suspense } from 'react'

import { PublicLayout } from '../layout/public/PublicLayout'
import AdminLayout from '../layout/admin/AdminLayout'

import LandingPage from '../landing/LandingPage'
import LoginPage from '../modules/auth/pages/LoginPage'
import ProductsPage from '../modules/products/pages/ProductsPage'
import SobreNosotros from '../components/ui/SobreNosotros'
import SimulationControlPage from '../modules/simulationControl/pages/SimulationControlPage'
import ProfilePage from '../modules/profile/pages/ProfilePage'


const rootRoute = createRootRoute({
  component: () => (
    <>
    <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: '#0d0d0d',
            border: '1px solid #3dc2e4',
            color: 'white',
            padding: '10px 16px',
            fontSize: '15px',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#0ed9ff',
              secondary: '#ffffff',
            },
            style: {
              border: '1px solid #0ed9ff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4444',
              secondary: '#ffffff',
            },
            style: {
              border: '1px solid #ff4444',
            },
          },
        }}
      />

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
const aboutUsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/sobre-nosotros',
  component: SobreNosotros,
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


const simulationRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/simulation',
  component: SimulationControlPage,
})

const productsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/products',
  component: ProductsPage,
})

const profileRoute = createRoute({ //Este lo cambian ya que no vamos a manejar perfil
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/profile',
  component: ProfilePage,
})



const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([indexRoute, loginRoute, aboutUsRoute]),
  adminLayoutRoute.addChildren([adminIndexRoute, productsRoute, simulationRoute, profileRoute ]),
])


export const route = createRouter({
  routeTree,
})


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof route
  }
}