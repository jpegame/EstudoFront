import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import UserLogged from '../userlogged/userlogged';

const EventStarter = () => {
    const socketRef = useRef(null);
    const [User1Ready, SetUser1Ready] = useState(false);
    const [User2Ready, SetUser2Ready] = useState(false);
    const [TeamData, SetTeam] = useState(null);
    const [UserData, SetUserData] = useState(null);
    const [PokemonSelected, SetPokemonSelected] = useState({
        id: 0,
        name: '',
        image: '',
        rarity: '',
        type: []
    });
    const location = useLocation();
    const salaid = new URLSearchParams(location.search).get('s');
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

    useEffect(() => {
        if (!UserData){
            fetch('/user_info')
            .then((response) => response.json())
            .then((data) => {
                SetUserData(data)
            })
            .catch((error) => console.error('Error fetching options:', error));
        }

        if (!TeamData && UserData){
            fetch('/teambyuser/' + UserData.userid)
            .then((response) => response.json())
            .then((data) => {
                SetTeam(data)
            })
            .catch((error) => console.error('Error fetching options:', error));
        }

    }, [UserData, TeamData]);

    useEffect(() => {
        socketRef.current = io("http://127.0.0.1:3001");

        socketRef.current.on('user1_ready' + salaid, () => {
            SetUser1Ready(true)
        });

        socketRef.current.on('user2_ready' + salaid, () => {
            SetUser2Ready(true)
        });

        socketRef.current.on('pokemonbothselected' + salaid, (msg) => {
            sessionStorage.setItem('Pokemons_' + salaid, msg);
            window.location.href = '/battle?s=' + salaid
        });

        return () => {
            socketRef.current.disconnect(); // Clean up the socket connection when the component unmounts
        };
    }, [salaid]);

    const handleUserReady = (userId) => {
        socketRef.current.emit('user_ready', { user_id: userId, salaid: salaid });
    };

    const HandlePokemonClick = (pokemon) => {
        SetPokemonSelected(pokemon)
    }

    const HandleConfirm = () => {
        socketRef.current.emit('pokemon_selected', {salaid: salaid, pokemon: PokemonSelected, userid: UserData.userid});
    }

    return (
        <div>
            <UserLogged />
            <h1>{UserData ? UserData.username : 'não carregou'}</h1>
            <button style={{ backgroundColor: User1Ready ? 'green' : '' }} onClick={() => handleUserReady(1)}>User 1 Ready</button>
            <button style={{ backgroundColor: User2Ready ? 'green' : '' }} onClick={() => handleUserReady(2)}>User 2 Ready</button>
            {User1Ready && User2Ready && (
                <div className="team-details" id="team-details">
                <div className="team-details-header">{TeamData.name}</div>
                <div className="gridpokemon">
                    {TeamData.pokemons.map((pokemon) => (
                        <div key={pokemon.id} className="pokemon" onClick={() => HandlePokemonClick(pokemon)}
                            style={{ background: `linear-gradient(180deg, ${pokemon.type.reduce((acc, type) => acc.concat(typeColors[type] || []), []).join(', ')})`, 
                                    cursor: 'pointer',
                                    borderColor: PokemonSelected.id === pokemon.id ? '#03fc35' : '',
                                    boxShadow: PokemonSelected.id === pokemon.id ? "0px 0px 20px #03fc35": ''
                                    }}>
                            <img src={pokemon.image} alt={pokemon.name}/>
                            <span>{pokemon.name}</span>
                        </div>
                    ))}
                    <button onClick={() => HandleConfirm()}>Confimar</button>
                </div>
            </div>
            )}
        </div>
    );
};

export default EventStarter;
