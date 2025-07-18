import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./auth/UserContext";
import { CartContext } from "./CartContext";

export default function Header({ onToggleCart }){
    const { user, setUser } = useContext(UserContext);
    const { cart } = useContext(CartContext);

    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0)
    return(
        <>
            <header>
                <div className="header container">
                    <ul className="navbar nav">
                        <li className="navItem"><Link className="navLink" to="/products">Ürünler</Link></li>
                    
                    </ul>
                    {user && 
                        <ul className="userNavBar nav">
                            <li className="navItem"><a href="#" onClick={onToggleCart} className="navLink">Sepetim ({totalQuantity})</a></li>
                            <li className="navItem"><Link className="navLink" to="/auth">Profilim</Link></li>
                            <li className="navItem">Hoşgeldin <span className="userName"> {user.ad.slice(0,1)}.{user.soyad.slice(0,1)}</span> </li>
                        </ul>
                    }
                </div>
            </header>
        </>
    )
}