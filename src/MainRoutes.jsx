import { useContext, useState } from 'react';
import { BrowserRouter  as Router, Route, Routes, Navigate  } from 'react-router-dom';
import { UserContext } from './pages/auth/UserContext';
import Auth from './pages/auth';
import Header from './pages/Header';
import Products from './pages/Products';

export default function MainRoutes(){
    const { user } = useContext(UserContext);
    const [cartOpened, setCartOpened] = useState(false);
    const toggleCart = () => setCartOpened(prev => !prev);

    return(
        <>
            <Router>
            {user && <Header onToggleCart={toggleCart} />}
                <Routes>
                    <Route path="/auth" element={<Auth />} />
                    {user ? (
                    <>
                        <Route path="/products" element={<Products cartOpened={cartOpened} toggleCart={toggleCart} />} />
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