// routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MainLayout from '../layout/MainLayout/MainLayout';
import PrivateRoute from './PrivateRoute';

// Páginas temporales (las crearemos después)
import SimulationControlPage from '../pages/SimulationControlPage';
import ProfilePage from '../pages/ProfilePage';
import ProductsPage from '../pages/ProductsPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública - Login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rutas protegidas con Layout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          {/* Redirección por defecto */}
          <Route index element={<Navigate to="/simulation-control" replace />} />
          
          {/* Páginas protegidas */}
          <Route path="simulation-control" element={<SimulationControlPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="products" element={<ProductsPage />} />
        </Route>
        
        {/* Ruta 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;