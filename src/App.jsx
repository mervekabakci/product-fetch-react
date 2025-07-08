import { useEffect, useState } from 'react';
import './App.css'
import Cards from './components/Cards';
import CardItem from './components/CardItem';
import Filter from './components/Filter';
import FilterSearch from './components/FilterSearch';
import FilterSelect from './components/FilterSelect';

export default function App() {
  const [products, setProducts] = useState([]);
  const [searchPro, setSearchPro] = useState("")
  const [category, setCategory] = useState("");

  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const limit = 30; 

  const getProducts = async () => {
    setIsLoading(true);
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    const data = await res.json();

    setProducts(prev => [...prev, ...data.products]);
    setTotal(data.total);
    setIsLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, [skip]);


  const categories = Array.from(new Set(products.map(x => x.category)));

  function handleChangeSelect(e){
    setCategory(e.target.value);
  }
  function handleChange(e){
    setSearchPro(e.target.value.toLowerCase());
  }
  function moreHandleClick() {
     if (products.length < total) {
      setSkip(prev => prev + limit);
    }
  }
  const filteredProducts = products
    .filter(x => x.title.toLowerCase().includes(searchPro) && x.category.includes(category));

  return (
    <>
      <div className="center">
        <div className="container">
            <h1>Product List</h1>
            <div className="twiceColumn">
              <Filter>
                <FilterSearch
                  handleChange={handleChange}
                />
              <FilterSelect
                handleChangeSelect={handleChangeSelect}
                categories={categories}
              />
              </Filter>

              <Cards
                moreHandleClick={moreHandleClick}
                products={products}
                isLoading={isLoading}
                total={total}
              >
                <CardItem
                  filteredProducts = {filteredProducts}
                />
              </Cards>
            </div>

        </div>
      </div>

    </>
  )
}