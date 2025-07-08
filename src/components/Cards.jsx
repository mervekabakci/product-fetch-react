export default function Cards({ children, moreHandleClick, products, isLoading, total }){
    return(
        <>
            <div className="rightColumn">
                <div className="cards productCards">
                    {children}
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