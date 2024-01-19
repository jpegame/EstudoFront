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
        start_date: "",
        end_date: "",
        user: "",
        matches: [
            {
                level: 0,
                status: "",
                team1: {
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
                },
                team2: {
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
                    console.log(data)
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
                    <WcTournament TournamentData={data} />
                </div>
            );
        case 'DSP':
            console.log(data)
            return (
                <div>
                    <UserLogged />
                    <div className="tournament-info" id="tournament-info">
                        <h2 id="tournament-name">{data.name}</h2>
                        <h2 id="tournament-date">Início: {new Date(data.start_date).toLocaleDateString()}</h2>
                        <h2 id="tournament-date">Fim: {new Date(data.end_date).toLocaleDateString()}</h2>
                    </div>
                    {data.matches.map((match) => (
                        <div className="teams-container">
                            <h1>{match.status}</h1>
                            {match.team1.id && (
                                <div className='team' onClick={(event) => handleClick(event, match.team1)}>
                                    {match.team1.name}
                                </div>
                            )}
                            {match.team2.id && (
                                <div className='team' onClick={(event) => handleClick(event, match.team2)}>
                                    {match.team2.name}
                                </div>
                            )}
                        </div>
                    ))}
                    {selectedTeam && (
                        <TeamDetails position={position} teamDetails={selectedTeam} onClose={handleTeamDetailsClose} />
                    )}
                </div>
            );
        case 'UPD':
            return (
                <div className="torneio">
                    <UserLogged />
                    <WcTournament TournamentData={data} />
                </div>
            );
        default:
            return <div>Ta fazendo o que aqui?</div>;
    }
}

export default TournamentWP;
