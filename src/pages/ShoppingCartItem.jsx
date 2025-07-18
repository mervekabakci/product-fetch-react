import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function ShoppingCartItem({ item }){
        const { removeFromCart, updateQuantity } = useContext(CartContext);
    
    return(
        <>
            <div className="shoppingCard" key={item.id}>
                <figure>
                    <div className="imageWrapper">
                        <img src={item.thumbnail} alt={item.title} />
                    </div>
                </figure>
                <div className="info">
                    <div>
                        <div className="name">{item.title}</div>
                        <div className="d-flex align-items-center">
                            <div className="category">{item.category}</div>
                            <div className="price">{item.price} TL</div>
                        </div>
                    </div>
                    <div className="numericCounter">
                        <span>{item.quantity} adet</span>
                        <div className="totalPayment">{(item.price * item.quantity).toFixed(2)} TL</div>
                    </div>
                    <div>
                        <button onClick={() => removeFromCart(item.id)} className="deleteButton">Sil</button>
                    </div>
                </div>
            </div>
        </>
    )
}