export default function FilterSearch({ handleChange }){
    return(
        <div className="inputColumn">
            <input type="text" onChange={handleChange} placeholder='Kelime İle Arama' />
            <span className="icon-search"></span>
        </div>
    )
}