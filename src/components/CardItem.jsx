import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../pages/CartContext";

export default function CardItem({ product }){
    const { addToCart } = useContext(CartContext);

    return(
        <>
            <div className="card" key={product.id}>
                <span className="category">{product.category}</span>
                <div>
                    <figure>
                        <img src={product.thumbnail} alt={product.title} />
                    </figure>
                </div>
                <div className="card-body">
                    <div className="title">{product.title}</div>
                    <div className="description line-clamp_3">{product.description}</div>
                </div>
                <div className="card-footer">
                    <div className="prod-prop">
                        <span className="price">{product.price} TL</span>
                        <span className="stock">Stok: {product.stock} adet</span>
                    </div>
                    <button
                        disabled={product.stock <= 0}
                        onClick={() => addToCart(product)} className="fixBtn button-primary">
                        {product.stock <= 0 ? "Stok Tükendi" : "Sepete Ekle"}
                    </button>
                </div>
            </div>
          
        </>
    )
}