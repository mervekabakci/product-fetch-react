import './App.css'
import UserProvider, { UserContext } from './pages/auth/UserContext';
import MainRoutes from './MainRoutes';
import CartProvider from './pages/CartContext';
import ProductProvider from './pages/ProductContext';
import ShoppingCart from './pages/ShoppingCart';
import { useContext } from 'react';

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



