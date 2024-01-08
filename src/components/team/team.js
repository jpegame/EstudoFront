import React, { useState, useEffect } from "react";
import "./team.css";
import UserLogged from "../userlogged/userlogged";


function Team() {

    const [data, setdata] = useState([{
		id: 0,
		name: "",
		user: ""
	}]);

	useEffect(() => {
		fetch("/team")
		  .then((res) => res.json())
		  .then((data) => {
			setdata(data);
		  })
		  .catch((error) => {
			console.error("Error fetching data:", error);
		  });
	  }, []);

    const AbrirTeam = (id,mode) =>{
		window.location.href = `/teamwp?mode=${mode}&teamid=${id}`
	}

	const DeleteTeam = (id) =>{
		fetch("/team/"+ id,{
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
            <button onClick={() => AbrirTeam(0, 'INS')} className="insertButton" style={{background: '#07b874'}}>Inserir</button>

			<div className="gridteam">
				{data.map((time) => (
					<div key={time.id}>
                    <h2>{time.name}</h2>
                    <h2>{time.user}</h2>
                    <div className="BotaoLinha">
                        <button onClick={() => AbrirTeam(time.id, 'DSP')} style={{background: '#07b874'}}>Visualizar</button>
                        <button onClick={() => AbrirTeam(time.id, 'UPD')} style={{background: '#07b874'}}>Modificar</button>
                        <button type="button" onClick={() => DeleteTeam(time.id)} style={{background: '#07b874'}}>Excluir</button>
                    </div>

                  </div>
				))}
			</div>

		</div>
	);
}

export default Team;
