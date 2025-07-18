import { useContext } from "react"
import { CartContext } from "./CartContext"
import ShoppingCartItem from "./ShoppingCartItem";

export default function ShoppingCart({ cartOpened, toggleCart }){
    const { cart, clearCart } = useContext(CartContext);

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    return(
        <>
            <div className={`shoppingCartWrapper ${cartOpened ? "opened" : ""}`}>
                <button className="closeCart" onClick={toggleCart}>×</button>
                <div className="summaryWrapper">
                    <div className="item">
                        <b>Toplam Ürün adedi</b>
                        <span>{totalQuantity}</span>
                    </div>
                    <div className="item">
                        <b>Toplam fiyat</b>
                        <span>{totalPrice.toFixed(2)} tl</span>
                    </div>
                </div>
                {cart.length > 0 &&  <button className="clearCarts fixBtn button-secondary-outline" onClick={clearCart}>Sepeti Temizle</button>}
                <div className="shoppingCards">
                    {cart.map((item) => (
                        <ShoppingCartItem key={item.id} item={item} />
                    ))}
                </div> 
                
            </div>

        </>
    )
}