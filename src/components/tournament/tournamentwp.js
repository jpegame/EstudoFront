import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./tournamentwp.css";
import UserLogged from "../userlogged/userlogged";
import TeamDetails from "../teamdetails/teamdetails";
import WcTournament from "./wctournament";

const TournamentWP = () => {
    const [data, setdata] = useState({
        id: 0,
        name: "",
        date: "",
        user:"",
        teams: [
            {
                id: 0,
                name: "",
                pokemons: [
                    {
                        id: 0,
                        name: "",
                        image: "",
                        rarity: "",
                        type: [""]
                    }
                ]
            }
        ]
    });


    const location = useLocation();
    const tournamentid = new URLSearchParams(location.search).get('tournamentid');
    const mode = new URLSearchParams(location.search).get('mode');

    const [selectedTeam, setSelectedTeam] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleTeamClick = (team) => {
        setSelectedTeam(team);
    };

    const handleClick = (event, team) => {
        const rect = event.target.getBoundingClientRect();
        setPosition({ x: rect.left, y: rect.bottom });
        handleTeamClick(team);
    };

    const handleTeamDetailsClose = () => {
        setSelectedTeam(null);
    };

    useEffect(() => {
        if (!(mode === 'INS')) {
            fetch("/tournament/" + tournamentid)
                .then((res) => res.json())
                .then((data) => {
                    setdata(data);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [mode, tournamentid]);


    switch (mode) {
        case 'INS':
            return (
                <div className="torneio">
                    <UserLogged />
                    <WcTournament TournamentData={data}/>
                </div>
            );
        case 'DSP':
            console.log(data)
            return (
                <div>
                    <UserLogged />
                    <div className="tournament-info" id="tournament-info">
                        <h2 id="tournament-name">{data.name}</h2>
                        <h2 id="tournament-date">{new Date(data.date).toLocaleDateString()}</h2>
                    </div>
                    <div className="teams-container">
                        {data.teams.map((team) => (
                            <div className='team' key={team.id} onClick={(event) => handleClick(event, team)}>
                                {team.name}
                            </div>
                        ))}
                        {selectedTeam && (
                            <TeamDetails position={position} teamDetails={selectedTeam} onClose={handleTeamDetailsClose} />
                        )}
                    </div>
                </div>
            );
        case 'UPD':
            return (
                <div className="torneio">
                    <UserLogged />
                    <WcTournament TournamentData={data}/>
                </div>
            );
        default:
            return <div>Ta fazendo o que aqui?</div>;
    }
}

export default TournamentWP;
