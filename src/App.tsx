/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Checkout from '@/pages/Checkout';
import AdminDashboard from '@/pages/Admin';
import Wishlist from '@/pages/Wishlist';
import Login from '@/pages/Login';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 border-t-2 border-white rounded-full animate-spin"></div></div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

