import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import UserLogged from "../userlogged/userlogged";
import MyForm from "./wcteam";

const TeamWP = () => {
    const [data, setdata] = useState({
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
    });

    const typeColors = {
        Normal: ['#A8A878'],
        Fire: ['#FF7F50', '#EE8130'],
        Water: ['#6890F0', '#3B9FE2'],
        Electric: ['#F8D030', '#F7D02C'],
        Grass: ['#78C850', '#7AC74C'],
        Ice: ['#98D8D8', '#98D8D8'],
        Fighting: ['#C03028', '#C03128'],
        Poison: ['#A040A0', '#A441A1'],
        Ground: ['#E0C068', '#E0C068'],
        Flying: ['#A890F0', '#A891F0'],
        Psychic: ['#F85888', '#F85888'],
        Bug: ['#A8B820', '#A8B821'],
        Rock: ['#B8A038', '#B8A038'],
        Ghost: ['#705898', '#705898'],
        Dragon: ['#7038F8', '#7038F8'],
        Dark: ['#705848', '#705848'],
        Steel: ['#B8B8D0', '#B8B8D0'],
        Fairy: ['#EE99AC', '#EE99AC'],
        // Add more types and colors as needed
    };

    const location = useLocation();
    const teamid = new URLSearchParams(location.search).get('teamid');
    const mode = new URLSearchParams(location.search).get('mode');

    const Close = () => {
        window.location.href = '/team'
    }

    useEffect(() => {
        if (!(mode === 'INS')) {
            fetch("/team/" + teamid)
                .then((res) => res.json())
                .then((data) => {
                    setdata(data);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [mode, teamid]);


    switch (mode) {
        case 'INS':
            return (
                <div className="torneio">
                    <UserLogged />
                    <MyForm TeamData={data}/>
                </div>
            );
        case 'DSP':
            console.log(data)
            return (
                <div>
                    <UserLogged />
                    <div className="team-details" id="team-details">
                        <div className="team-details-header">{data.name}</div>
                        <div className="gridpokemon">
                            {data.pokemons.map((pokemon) => (
                                <div key={pokemon.id} className="pokemon"
                                    style={{ background: `linear-gradient(180deg, ${pokemon.type.reduce((acc, type) => acc.concat(typeColors[type] || []), []).join(', ')})` }}>
                                    <img src={pokemon.image} alt={pokemon.name}/>
                                    <span>{pokemon.name}</span>
                                </div>
                            ))}
                        </div>
                        <button onClick={Close}>Fechar</button>
                    </div>
                </div>
            );
        case 'UPD':
            return (
                <div className="torneio">
                    <UserLogged />
                    <MyForm TeamData={data}/>
                </div>
            );
        default:
            return <div>Ta fazendo o que aqui?</div>;
    }
}

export default TeamWP;
