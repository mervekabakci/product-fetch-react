import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./auth/UserContext";

export default function Header(){
    const { user, setUser } = useContext(UserContext);
    return(
        <>
            <header>
                <div className="header">

                <ul className="navbar">
                    <li><Link to="/products">Ürünler</Link></li>
                    <li><a href="#">Profilim</a></li>
                    <li>Hoşgeldin {user.ad.slice(0,1)}.{user.soyad.slice(0,1)} </li>
                    <li><Link to="shopping-cart">Sepetim () </Link></li>
                </ul>
                </div>
            </header>
        </>
    )
}