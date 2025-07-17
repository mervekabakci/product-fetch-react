import { useContext } from "react"
import { ProductContext } from "../pages/ProductContext"

export default function FilterSearch(){
    const { searchPro, handleChange} = useContext(ProductContext);
    return(
        <div className="inputColumn">
            <input 
                type="text" 
                value={searchPro}
                onChange={handleChange} 
                placeholder='Kelime İle Arama' 
            />
            <span className="icon-search"></span>
        </div>
    )
}