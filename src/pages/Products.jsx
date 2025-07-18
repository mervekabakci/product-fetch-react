import { useContext, useState } from 'react';
import Cards from './../components/Cards';
import Filter from './../components/Filter';
import FilterSearch from './../components/FilterSearch';
import FilterSelect from './../components/FilterSelect';
import { UserContext } from './auth/UserContext';
import ShoppingCart from './ShoppingCart';

export default function Products({ cartOpened, toggleCart }) {
  const { user } = useContext(UserContext);
  return (
    <>
      {user && <ShoppingCart cartOpened={cartOpened} toggleCart={toggleCart} />}
      <div className="center">
        <div className="container">
            <h1>Product List</h1>
            <div className="twiceColumn">
              <Filter>
                <FilterSearch />
                <FilterSelect />
              </Filter>
              <Cards />
            </div>
        </div>
      </div>
    </>
  )
}