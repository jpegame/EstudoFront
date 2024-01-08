import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import UserLogged from "../userlogged/userlogged";

function Battle() {
  const [data, setdata] = useState([{
    pokemon: {
      id: 0,
      name: '',
      image: "",
      rarity: "",
      type: []
    },
    userid: 0
  }]);

  const location = useLocation();
  const salaid = new URLSearchParams(location.search).get('s');

  useEffect(() => {
    const receivedData = sessionStorage.getItem('Pokemons_' + salaid)
    const JsonData = JSON.parse(receivedData);
    console.log(JsonData)
    setdata(JsonData)
  }, [salaid]);

  return (
    <div>
      <UserLogged />
      {data.map((item) => (
        <div key={`${item.pokemon.id}-${item.userid}`}>
          <p>Name: {item.pokemon.name}</p>
          <p>ID: {item.pokemon.id}</p>
          <p>Image: {item.pokemon.image}</p>
          <p>Rarity: {item.pokemon.rarity}</p>
          <p>Type: {item.pokemon.type.join(', ')}</p>
          <p>User ID: {item.userid}</p>
        </div>
      ))}
    </div>
  );

};

export default Battle;
