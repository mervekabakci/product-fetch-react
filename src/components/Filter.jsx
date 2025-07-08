export default function Filter({ children}) {
    return(
        <div className='searchColumn'>
            <div className="top">
                <span className="title"><span class="icon-filter"></span><span>Ürünleri Filtrele</span></span>
            </div>
                
            {children}
        </div>
    )
}