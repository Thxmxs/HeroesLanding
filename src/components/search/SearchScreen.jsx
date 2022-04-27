import React, { useMemo } from 'react'
import queryString from 'query-string';
import { useNavigate,useLocation } from 'react-router-dom';
import { useForm } from '../../Hooks/useForm'
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {q=''} = queryString.parse(location.search);

  const [value, handleInputChange] =useForm({searchText:q});

  const heroesFiltered =useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => { 
    e.preventDefault();
    navigate(`?q=${value.searchText}`);

   }

  return (
    <div>
        <h1>Busqueda</h1>
        <hr />

        <div className='row'>
          <div className='col-5'>
            <h4>Buscar</h4>
            <hr />
            <form onSubmit={handleSearch}>
              <input type="text"
                     name="searchText"
                     className='form-control'
                     autoComplete='off'
                     placeholder='Buscar un heroe'  
                     value={value.searchText}
                     onChange={handleInputChange}/>

              <button className='btn btn-outline-primary mt-1 btn-block' 
                      type='submit'
                      > Buscar </button>
            </form>
          </div>
          <div className='col-7'>
            <h4>resultados</h4>
            <hr />
            {
              (q==='')
              ? <div className='alert alert-info'>Buscar un heroes</div>
              : (heroesFiltered.length ===0) && <div className='alert alert-danger'>No hay resultados: {q}</div>
            }

            {
              heroesFiltered.map((hero) => { 
                return <HeroCard
                key={hero.id}
                {...hero}
                />
               })
            }
          </div>
        </div>
    </div>
  )
}
