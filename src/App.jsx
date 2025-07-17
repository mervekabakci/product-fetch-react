import { useContext } from 'react';
import { BrowserRouter  as Router, Route, Routes, Navigate  } from 'react-router-dom';
import './App.css'
import Auth from './pages/auth';
import Header from './pages/Header';
import Products from './pages/Products';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';
import UserProvider from './pages/auth/UserContext';
import MainRoutes from './MainRoutes';
import CartProvider from './pages/CartContext';
import ProductProvider from './pages/ProductContext';

export default function App() {

  return (
    <>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <MainRoutes />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </>
  )
}



