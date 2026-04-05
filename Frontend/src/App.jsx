import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import SellProduct from './pages/SellProduct';
import MyProducts from './pages/MyProducts';
import Profile from './pages/Profile';
import HowItWorks from './pages/HowItWorks';
import CommunityGuidelines from './pages/CommunityGuidelines';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/community-guidelines" element={<CommunityGuidelines />} />
          
          {/* Protected Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/sell" element={
            <ProtectedRoute>
              <SellProduct />
            </ProtectedRoute>
          } />
          <Route path="/my-products" element={
            <ProtectedRoute>
              <MyProducts />
            </ProtectedRoute>
          } />

          
          <Route path="/products" element={<div className="text-center py-20 text-xl">All Products Page (Coming Soon)</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
