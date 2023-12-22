import React, { useState, useEffect } from "react";
import "./tournament.css";
import UserLogged from "../userlogged/userlogged";


function Tournament() {

    const [data, setdata] = useState([{
		id: 0,
		name: "",
		date: ""
	}]);

	useEffect(() => {
		fetch("/tournament")
		  .then((res) => res.json())
		  .then((data) => {
            console.log(data)
			setdata(data);
		  })
		  .catch((error) => {
			console.error("Error fetching data:", error);
		  });
	  }, []);

    const AbrirTorneio = (id,mode) =>{
		// window.location.href = '/pokemon?pokemonid=' + id
	}

	return (
		<div className="torneio">
			<UserLogged/>
            <button class="insertButton">Inserir</button>

			<div className="gridtorneio">
				{data.map((torneio) => (
					<div key={torneio.id}>
                    <h2>{torneio.name}</h2>
                    <h2>{new Date(torneio.date).toLocaleDateString() /*format(new Date(torneio.date), 'MMMM dd, yyyy HH:mm:ss')*/}</h2>
                    <div className="BotaoLinha">
                        <button onClick={() => AbrirTorneio(torneio.id, 'DSP')}>Visualizar</button>
                        <button onClick={() => AbrirTorneio(torneio.id, 'UPD')}>Modificar</button>
                        <button >Excluir</button>
                    </div>

                  </div>
				))}
			</div>

		</div>
	);
}

export default Tournament;
