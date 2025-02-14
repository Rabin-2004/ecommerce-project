import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CategoryPage from './components/CategoryPage';
import Checkout from './components/Checkout';
import OrderConfirmed from './components/OrderConfirmed';

const App = () => {
    return (
        <CartProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/category/:category" element={<CategoryPage />} /> 
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmed" element={<OrderConfirmed />} />
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;



