import { useContext } from "react"
import { CartContext } from "./CartContext"

export default function ShoppingCart(){
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    return(
        <>
        <div className="row">
            <div className="col-md-8">
                <div className="shoppingCards">
                    <div className="shoppingCard" key={item.id}>
                        <figure>
                            <div className="imageWrapper">
                                <img src={item.thumbnail} alt={item.title} />
                            </div>
                        </figure>
                        <div className="info">
                            <div>
                                <div className="name">{item.title}</div>
                                <div className="category">{item.category}</div>
                            </div>
                            <div className="numericCounter">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="decCountButton">-</button>
                                <input type="text" name="CounterInput" value="1" aria-label="Ürün adedi" />
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="incCountButton">+</button>
                            </div>
                            <div>
                                <button onClick={() => removeFromCart(item.id)} className="deleteButton">Sil</button>
                                <div className="totalPayment">{item.price * item.quantity} TL</div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div className="col-md-4">
                <div className="summaryWrapper">
                    <div className="item">
                        <b>Toplam Ürün adedi</b>
                        <span>{cart.lenght}</span>
                    </div>
                    <div className="item">
                        <b>Toplam fiyat</b>
                        <span>{totalPrice} tl</span>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}