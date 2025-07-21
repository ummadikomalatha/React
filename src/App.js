import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Homepage';
import ProductPage from './pages/Productpage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/Registerpage';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      fetchCart(token);
    }
    
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      
      const catResponse = await axios.get('http://localhost:5000/api/products/categories');
      setCategories(catResponse.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCart(response.data.items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      await fetchCart(response.data.access_token);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCart([]);
  };

  const addToCart = async (productId) => {
    if (!user) return false;
    
    try {
      await axios.post('http://localhost:5000/api/cart', { product_id: productId }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      await fetchCart(localStorage.getItem('token'));
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await axios.delete( `http://localhost:5000/api/cart/${cartItemId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')} `}
      });
      await fetchCart(localStorage.getItem('token'));
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar user={user} cartCount={cart.length} onLogout={handleLogout} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage products={products} categories={categories} addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductPage products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={
              user ? <CartPage cart={cart} removeFromCart={removeFromCart} /> : <Navigate to="/login" />
            } />
            <Route path="/login" element={
              user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />
            } />
            <Route path="/register" element={
              user ? <Navigate to="/" /> : <RegisterPage />
            } />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;