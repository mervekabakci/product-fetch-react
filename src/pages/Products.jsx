import { useContext } from 'react';
import Cards from './../components/Cards';
import Filter from './../components/Filter';
import FilterSearch from './../components/FilterSearch';
import FilterSelect from './../components/FilterSelect';

export default function Products() {
  return (
    <>
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