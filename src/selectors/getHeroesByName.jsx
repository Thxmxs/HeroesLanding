import React from 'react'
import { heroes } from '../data/heroes';

export const getHeroesByName = (name ='') => {
//   name = name.toLocaleLowerCase();

//   return heroes.filter((hero) => {  })
if(name.length ===0){
    return heroes;
}
else{
     return heroes.filter(hero =>  hero.superhero.toLowerCase().includes(name) )
     
}

}
