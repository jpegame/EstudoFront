import React, { useState, useEffect } from "react";
import "./home.css";
import UserLogged from "../userlogged/userlogged";

function Home() {
  const rarityColors = {
    M: 'linear-gradient(180deg, #ff0055, #cc00ff)',
    L: 'linear-gradient(180deg, #cc00ff, rgb(106, 180, 245))',
  };

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch("/pokemon")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const AbrirPokemon = (id) => {
    window.location.href = '/pokemon?pokemonid=' + id;
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    if (!value) {
      // If the search bar is empty, show the original data
      setFilteredData([]);
    } else {
      // If there is a search value, filter the data
      const filteredPokemon = data.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filteredPokemon);
    }
  };

  return (
    <div>
      <UserLogged />
      <input
        className="searchbar"
        type="text"
        name="search"
        autoComplete="off"
        placeholder="Pesquisar..."
        onChange={handleInputChange}
        value={searchValue}
      />
      <div className="gridpokemon">
        {(searchValue ? filteredData : data).map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon"
            style={{ background: rarityColors[pokemon.rarity] || '' }}
            onClick={() => AbrirPokemon(pokemon.id)}
          >
            <img src={pokemon.image} alt={pokemon.name} />
            <span>{pokemon.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
