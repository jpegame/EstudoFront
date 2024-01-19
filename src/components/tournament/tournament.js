import React, { useState, useEffect } from "react";
import "./tournament.css";
import UserLogged from "../userlogged/userlogged";


function Tournament() {

    const [data, setdata] = useState([{
		id: 0,
		name: "",
		start_date: "",
		end_date:""
	}]);

	useEffect(() => {
		fetch("/tournament")
		  .then((res) => res.json())
		  .then((data) => {
			setdata(data);
		  })
		  .catch((error) => {
			console.error("Error fetching data:", error);
		  });
	  }, []);

    const AbrirTorneio = (id,mode) =>{
		window.location.href = `/torneiowp?mode=${mode}&tournamentid=${id}`
	}

	const DeleteTorneio = (id) =>{
		fetch("/tournament/"+ id,{
			method: 'DELETE'
		})
		  .then((res) => window.location.reload())
		  .catch((error) => {
			console.error("Error deleting data:", error);
		});

	}

	return (
		<div className="torneio">
			<UserLogged/>
            <button onClick={() => AbrirTorneio(0, 'INS')} className="insertButton">Inserir</button>

			<div className="gridtorneio">
				{data.map((torneio) => (
					<div key={torneio.id}>
                    <h2>{torneio.name}</h2>
                    <h2>Início: {new Date(torneio.start_date).toLocaleDateString()}</h2>
					<h2>Fim: {new Date(torneio.end_date).toLocaleDateString()}</h2>
                    <div className="BotaoLinha">
                        <button onClick={() => AbrirTorneio(torneio.id, 'DSP')}>Visualizar</button>
                        <button onClick={() => AbrirTorneio(torneio.id, 'UPD')}>Modificar</button>
                        <button type="button" onClick={() => DeleteTorneio(torneio.id)}>Excluir</button>
                    </div>

                  </div>
				))}
			</div>

		</div>
	);
}

export default Tournament;
