import { useContext } from "react"
import { ProductContext } from "../pages/ProductContext"

export default function FilterSelect() {
    const { categories, handleChangeSelect } = useContext(ProductContext);
    return(
        <div className="selectColumn">
            <select onChange={handleChangeSelect}>
                <option value="">Filter Categories</option>
                {categories.map((x, i) => <option key={i} value={x.slug}>{x.name}</option>)}
            </select>
        </div>
    )
}