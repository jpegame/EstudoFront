// TeamDetails.js

import React, { useEffect } from 'react';
import './teamdetails.css'; // Import the CSS file

const TeamDetails = ({ teamDetails, position, onClose }) => {

    console.log(teamDetails)

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
        const handleClickOutside = (event) => {
            const isOutside = !document.getElementById('team-details').contains(event.target);
            if (isOutside) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="team-details" id="team-details"
            style={{
                position: 'absolute',
                top: `${position.y}px`
            }}>
            <div className="team-details-header">{teamDetails.name}</div>
            <div className="gridpokemon">
                {teamDetails.pokemons.map((pokemon) => (
                    <div key={pokemon.id} className="pokemon"
                        style={{ background: `linear-gradient(180deg, ${pokemon.type.reduce((acc, type) => acc.concat(typeColors[type] || []), []).join(', ')})` }}>
                        <img src={pokemon.image} alt={pokemon.name}/>
                        <span>{pokemon.name}</span>
                    </div>
                ))}
            </div>
            <button onClick={onClose}>Fechar</button>
        </div>
    );
};

export default TeamDetails;
