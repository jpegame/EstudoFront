import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
	// usestate for setting a javascript
	// object for storing and using data
	const [data, setdata] = useState([{
		id: "",
		name: 0,
		image: "",
		rarity: "",
	}]);

	// Using useEffect for single rendering
	useEffect(() => {
		// Using fetch to fetch the api from 
		// flask server it will be redirected to proxy
		fetch("/pokemon").then((res) =>
			res.json().then((data) => {
        setdata(data);
			})
		);
	}, []);

	return (
		<body>
      <div class="gridpokemon">
        {data.map((pokemon) => (
          <div class="pokemon">
            <img src={pokemon.image} alt={pokemon.name} />
            <span>{pokemon.name}</span>
          </div>
        ))}
      </div>
		</body>
	);
}

export default App;
