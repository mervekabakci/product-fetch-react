export default function Filter({ children}) {
    return(
        <div className='searchColumn'>
            <div className="top">
                <span className="title"><span className="icon-filter"></span><span>Ürünleri Filtrele</span></span>
            </div>
                
            {children}
        </div>
    )
}