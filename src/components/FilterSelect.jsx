import { useContext } from "react"
import { ProductContext } from "../pages/ProductContext"

export default function FilterSelect() {
    const { categories, handleChangeSelect } = useContext(ProductContext);
    return(
        <div className="selectColumn">
            <select onChange={handleChangeSelect}>
                <option value="">Filter Categories</option>
                {categories.map((category, index) => (
                     <option key={index} value={category.slug}>{category.name}</option>
                ))}
            </select>
        </div>
    )
}