import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./auth/UserContext";

export const CartContext = createContext();

export default function CartProvider({ children }){
    const { user } = useContext(UserContext);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if(user){
            const savedCart = JSON.parse(localStorage.getItem(`cart-${user.ad}`)) || [];
            setCart(savedCart);
        }
        else{
            setCart([]);
        }
    }, [user]);

    useEffect(() => {
        if(user){
            localStorage.setItem(`cart-${user.ad}`, JSON.stringify(cart));
        }
    }, [cart, user]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    }
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter(item => item.id !== id));
    }
    const updateQuantity = (id, quantity) => {
        setCart((prev) =>
            prev.map((item) => 
                item.id === id ? { ...item, quantity} : item
            )
        );
    }
    return(
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity}}>
            {children}
        </CartContext.Provider>
    )
}