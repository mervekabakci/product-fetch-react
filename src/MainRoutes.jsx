import { useContext } from 'react';
import { BrowserRouter  as Router, Route, Routes, Navigate  } from 'react-router-dom';
import { UserContext } from './pages/auth/UserContext';
import Auth from './pages/auth';
import Header from './pages/Header';
import Products from './pages/Products';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';

export default function MainRoutes(){
    const { user } = useContext(UserContext);

    return(
        <>
            <Router>
            {user && <Header />}
                <Routes>
                    <Route path="/auth" element={<Auth />} />
                    {user ? (
                    <>
                        <Route path="/products" element={<Products />} />
                        <Route path="/shopping-cart" element={<ShoppingCart />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="*" element={<Navigate to="/products" />} />
                    </>
                    ) : (
                    <Route path="*" element={<Navigate to="/auth" />} />
                    )}
                </Routes>
            </Router>
        </>
    )
}