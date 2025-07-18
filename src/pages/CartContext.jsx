import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./auth/UserContext";
import { ProductContext } from "./ProductContext";

export const CartContext = createContext();

export default function CartProvider({ children }){
    const { user } = useContext(UserContext);
    const { products, setProducts } = useContext(ProductContext);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if(user && user.email){
            const savedCart = JSON.parse(localStorage.getItem(`cart-${user.email.toLowerCase()}`)) || [];
            setCart(savedCart);
        }
        else{
            setCart([]);
        }
    }, [user]);

    useEffect(() => {
        if (user && user.email) {
            localStorage.setItem(`cart-${user.email.toLowerCase()}`, JSON.stringify(cart));
        }
    }, [cart, user]);

    const addToCart = (product) => {
        const productInStock = products.find((p) => p.id === product.id);

        if (!productInStock || productInStock.stock <= 0) {
            alert("Stokta yeterli ürün yok.");
            return;
        }

        const updatedProducts = products.map((p) =>
            p.id === product.id ? { ...p, stock: p.stock - 1 } : p
        );
        setProducts(updatedProducts);

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
    };
    const removeFromCart = (id) => {
        const item = cart.find(i => i.id === id);
        if (!item) return;

        let updatedCart;
        if (item.quantity > 1) {
            updatedCart = cart.map(i =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            );
        } else {
            updatedCart = cart.filter(i => i.id !== id);
        }

        const updatedProducts = products.map(p =>
            p.id === id ? { ...p, stock: p.stock + 1 } : p
        );

        setCart(updatedCart);
        setProducts(updatedProducts);
    };

    const updateQuantity = (id, quantity) => {
        setCart(prev => {
            const currentItem = prev.find(item => item.id === id);
            if (!currentItem) return prev;

            const quantityDiff = quantity - currentItem.quantity;

            setProducts(products.map(product => 
            product.id === id
                ? { ...product, stock: product.stock - quantityDiff }
                : product
            ));

            return prev.map(item =>
            item.id === id ? { ...item, quantity } : item
            );
        });
    };

    function clearCart() {
        const updatedProducts = products.map(product => {
            const cartItem = cart.find(item => item.id === product.id);
            if (cartItem) {
            return { ...product, stock: product.stock + cartItem.quantity };
            }
            return product;
        });

        setProducts(updatedProducts);
        setCart([]); 
    }
    return(
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}