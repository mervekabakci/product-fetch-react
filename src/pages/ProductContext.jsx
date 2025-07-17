import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export default function ProductProvider({ children}){
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchPro, setSearchPro] = useState("")
    const [category, setCategory] = useState("");

    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch('https://dummyjson.com/products/categories');
            const data = await res.json();
            setCategories(data);
        }
        fetchCategories();
    }, []);
    
    const limit = 6; 
    
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

    useEffect(() => {
        const uniqueCategories = Array.from(new Set(products.map(x => x.category)));
        setCategories(uniqueCategories);
    }, [products]);


    // const categories = Array.from(new Set(products.map(x => x.category)));

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
    
    return(
        <ProductContext.Provider value={{
            products,
            filteredProducts,
            categories,
            searchPro,
            category,
            isLoading,
            total,
            handleChange,
            handleChangeSelect,
            moreHandleClick,
        }}>
            {children}
            {/* <CartProvider>
                <Products />
            </CartProvider> */}
        </ProductContext.Provider>
    )
}