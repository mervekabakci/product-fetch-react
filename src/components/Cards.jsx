import { useContext } from "react";
import CardItem from "./CardItem";
import { ProductContext } from "../pages/ProductContext";

export default function Cards(){
    const { moreHandleClick, products, isLoading, total, filteredProducts } = useContext(ProductContext);
    
    if (!products) return <div>Yükleniyor...</div>;

    return(
        <>
            <div className="rightColumn">
                <div className="cards productCards">
                     {filteredProducts.map((product) => (
                        <CardItem key={product.id} product={product} />
                    ))}
                </div>

                <div className="d-flex">
                    <button className="fixBtn button-secondary moreButton"
                        onClick={moreHandleClick}
                        disabled={products.length >= total || isLoading}
                    >
                        {isLoading ? "Yükleniyor..." : "Daha Fazla Göster"}
                    </button>
                </div>
            </div>
        </>
    )
}