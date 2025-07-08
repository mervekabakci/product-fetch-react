export default function FilterSelect({ categories, handleChangeSelect }) {
    return(
        <div className="selectColumn">
            <select onChange={handleChangeSelect}>
                <option value="">Filter Categories</option>
                {categories.map(x => <option key={x}>{x}</option>)}
            </select>
        </div>
    )
}