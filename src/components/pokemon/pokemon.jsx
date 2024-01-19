import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./pokemon.css";
import UserLogged from "../userlogged/userlogged";

function PokemonPage(){
    const [data, setdata] = useState({
      id: "",
      name: 0,
      image: "",
      rarity: "",
      type:[]
    });

    const rarityColors = {
      M: 'linear-gradient(180deg, #ff0055, #cc00ff)',
      L: 'linear-gradient(180deg, #cc00ff, rgb(106, 180, 245))',
    };

    const location = useLocation();
    var pokemonid = new URLSearchParams(location.search).get('pokemonid');
  
    useEffect(() => {
      fetch("/pokemon/" + pokemonid)
        .then((res) => res.json())
        .then((data) => {
          setdata(data);
          })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },[pokemonid]);  

    return (
      <div>
        <UserLogged/>
        <div className="infopokemon">
          <div key={data.id} className="pokemon" style={{ background: rarityColors[data.rarity] || '' }}>
            <img src={data.image} alt={data.name} />
            <span>{data.name}</span>
          </div>
          <div className='descricao'>
            <fieldset>
              <legend>Tipos</legend>
              {data.type.map((tipo)=>(
                <h2 className={"padrao_tipo " + tipo.toLowerCase()}>{tipo}</h2>
              ))}
            </fieldset>
          </div>
        </div> 
      </div>
    );
  };
  
  export default PokemonPage;
