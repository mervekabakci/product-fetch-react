export default function CardItem({ filteredProducts }){
    return(
        <>
            {
                filteredProducts.map(x => 
                  <div className="card" key={x.id}>
                    <span className="category">{x.category}</span>
                    <figure>
                        <img src={x.thumbnail} alt={x.thumbnail} />
                    </figure>
                    <div className="card-body">
                        <div className="title">{x.title}</div>
                        <div className="description line-clamp_3">{x.description}</div>
                    </div>
                    <div className="card-footer">
                        <div className="prod-prop">
                            <span className="price">{x.price} TL</span>
                            <span className="stock">Stok: {x.stock} adet</span>
                        </div>
                    </div>
                  </div>
                )
              }
        </>
    )
}