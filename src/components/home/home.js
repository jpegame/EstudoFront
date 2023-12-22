import React, { useState, useEffect } from "react";
import "./home.css";
import UserLogged from "../userlogged/userlogged";


function Home() {

	const rarityColors = {
		M: 'linear-gradient(180deg, #ff0055, #cc00ff)',
		L: 'linear-gradient(180deg, #cc00ff, rgb(106, 180, 245))',
	};

    const [data, setdata] = useState([{
		id: "",
		name: 0,
		image: "",
		rarity: "",
	}]);

	useEffect(() => {
		fetch("/pokemon")
		  .then((res) => res.json())
		  .then((data) => {
			setdata(data);
		  })
		  .catch((error) => {
			console.error("Error fetching data:", error);
		  });
	  }, []);

	const AbrirPokemon = (id) =>{
		window.location.href = '/pokemon?pokemonid=' + id
	}

	return (
		<div>
			<UserLogged/>
			<div className="gridpokemon">
				{data.map((pokemon) => (
					<div key={pokemon.id} className="pokemon" style={{ background: rarityColors[pokemon.rarity] || '' }} onClick={() => AbrirPokemon(pokemon.id)}>
						<img src={pokemon.image} alt={pokemon.name} />
						<span>{pokemon.name}</span>
					</div>
				))}
			</div>

		</div>
	);
}

export default Home;
