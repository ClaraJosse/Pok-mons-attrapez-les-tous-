import React, { useEffect, useState } from 'react';
import '../App.css';


function Pokemon() {

    const[pokemon, setPokemon] =useState(null);
    const[isShiny, setIsShiny] =useState(false);

    useEffect(()=>{ // Equivaut au componentDidMount 
        const idPokemon = Math.floor(Math.random() * 250) + 1 // Prend un ID de pokémon aléatoirement
        fetch("https://pokeapi.co/api/v2/pokemon/"+idPokemon)
            .then((resp)=>resp.json())
            .then((data) => setPokemon(data));
    },[]);

    function setShiny(v){ // Stock le state
        setIsShiny(v);
    }

    function getPokemonImage() { //Changement d'image en fonction de setIsShiny
        if(isShiny){
            return pokemon.sprites.front_shiny; //true
        }else{
            return pokemon.sprites.front_default; //false
        }
    }

    return(
        <>
            {
                pokemon != null &&
                <div className='divPokemon' onMouseOver={()=>setShiny(true)} onMouseLeave={(()=>setIsShiny(false))}>
                    <img src={getPokemonImage()}/>
                    <h3>{pokemon.name}</h3>

                    {
                        pokemon.stats.map((s, i)=>
                        <div key={s.base_stat+i}>
                            <p>{s.base_stat}</p>
                        </div>
                        )
                    }
                </div>
            }
        </>
    );
}

export default Pokemon;