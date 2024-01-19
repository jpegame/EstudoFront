import React, { useState, useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./battle.css";
import HealthBar from "../healthbar/healthbar";
import io from 'socket.io-client';
import UserLogged from "../userlogged/userlogged";

function Battle() {
  const socketRef = useRef(null);
  const [pokemonStats, setPokemonStats] = useState([{
    "id": 0,
    "attack": 0,
    "name":'',
    "defense": 0,
    "hp": 0,
    "moves": [
      {
        "name": "",
        "power": 0,
        "pp": 0,
        "type": ""
      }
    ]
  }]);
  const [pokemonEnemyStats, setPokemonEnemyStats] = useState([{
    "id": 0,
    "attack": 0,
    "defense": 0,
    "hp": 0,
    "name":'',
    "moves": [
      {
        "name": "",
        "power": 0,
        "pp": 0,
        "type": ""
      }
    ]
  }]);
  const [showCaption, setshowCaption] = useState(null);
  const [CurrentHP, setCurrentHP] = useState(null)
  const [CurrentEnemyHP, setCurrentEnemyHP] = useState(null)
  const [dataFetched, setDataFetched] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [attackHover, setAttackHover] = useState(null);
  const [userData, setuserData] = useState(null);
  const location = useLocation();
  const salaid = new URLSearchParams(location.search).get('s');

  useEffect(() => {
    const receivedData = sessionStorage.getItem('Pokemons_' + salaid);
    const parsedData = JSON.parse(receivedData);
    setJsonData(parsedData);
    VerifyUser(parsedData);
  }, [salaid]);

  const VerifyUser = (data) => {
    fetch("/user_info")
      .then((res) => res.json())
      .then((userData) => {
        const updatedData = data.map(element => {
          element.userlogged = false;
          if (element.userid === userData.userid) {
            element.userlogged = true;
          }
          PokemonAbility(element.pokemon.id, element.userlogged);
          return element;
        });
        setuserData(userData)
        setJsonData(updatedData);
        setDataFetched(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const PokemonAbility = (id, userlogged) => {
    if (!pokemonStats.hp || !pokemonEnemyStats.hp) {
      fetch(`/pokemon-stats?id=${id}&level=80`)
        .then((res) => res.json())
        .then((data) => {
          if (userlogged) {
            setPokemonStats(data);
            setCurrentHP(data.hp)
          } else {
            setPokemonEnemyStats(data)
            setCurrentEnemyHP(data.hp)
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }

  useEffect(() => {
    socketRef.current = io("http://127.0.0.1:3001", { transports: ['websocket'], debug: true });

    socketRef.current.on('update_life' + salaid, (msg) => {
      const parsedData = msg
      if (parsedData.userid !== userData.userid) {
        var danoTomado = CurrentHP - parsedData.damage
        setCurrentHP(danoTomado)
      } else {
        var danoCausado = CurrentEnemyHP - parsedData.damage
        setCurrentEnemyHP(danoCausado)
      }
      if (danoTomado <= 0) {
        alert('Você perdeu!')
      } else if (danoCausado <= 0) {
        alert('Você ganhou!')
      }
    });

    return () => {
      socketRef.current.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, [salaid, CurrentHP, CurrentEnemyHP, userData]);

  const HandleAttack = (item) => {
    setshowCaption(item.name)

    const timeoutId = setTimeout(() => {
      socketRef.current.emit('take_damage', { salaid: salaid, userid: userData.userid, damage: item.power });
      setshowCaption(null)
    }, 2000);
    return () => clearTimeout(timeoutId);
  }

  const RenderMoves = () => {
    const setattackHover = (move) => {
      setAttackHover(move);
    };
    if (pokemonStats.hp) {
      return (
        <div className="PokemonContainer">
          <div className="pokemonStats">
            <div className="row">
              {pokemonStats.moves.slice(0, 2).map((item) => (
                <h1
                  key={item.name}
                  onMouseEnter={() => setattackHover(item)}
                  onMouseLeave={() => setattackHover(null)}
                  onClick={() => HandleAttack(item)}
                >
                  {item.name}
                </h1>
              ))}
            </div>
            <div className="row">
              {pokemonStats.moves.slice(2, 4).map((item) => (
                <h1
                  key={item.name}
                  onMouseEnter={() => setattackHover(item)}
                  onMouseLeave={() => setattackHover(null)}
                  onClick={() => HandleAttack(item)}
                >
                  {item.name}
                </h1>
              ))}
            </div>
          </div>
          {attackHover ? (
            <div className="pokemon-info">
              <h1>PP {attackHover.pp}</h1>
              <h1>TYPE/{attackHover.type.toUpperCase()}</h1>
            </div>
          ) : (
            <div className="pokemon-info">
            </div>
          )}
        </div>
      );
    }
  };

  const RenderedItems = () => {
    const SortedData = jsonData.sort((a, b) => a.userlogged - b.userlogged);
    return (SortedData.map(item => {
      if (item.userlogged) {
        if (pokemonStats.hp) {
          return (
            <div key={`${item.pokemon.id}-${item.userid}`} className="bottom-left">
              <img alt={item.pokemon.name} src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/' + item.pokemon.id + '.gif'} />
              <div className="NameBox">
                <div className="name-row">
                  <h1>{item.pokemon.name}</h1>
                  <h1>Lv80</h1>
                </div>
                <div className="health-bar-container">
                  <HealthBar initialHealth={CurrentHP} maxHealth={pokemonStats.hp} />
                </div>
              </div>

            </div>
          );
        }
        return (<div></div>)
      } else {
        if (pokemonEnemyStats.hp) {
          return (
            <div key={`${item.pokemon.id}-${item.userid}`} className="top-right">
              <div className="NameBox">
                <div className="name-row">
                  <h1 className="pokemonNome">{item.pokemon.name}</h1>
                  <h1 className="level">Lv80</h1>
                </div>
                <div className="health-bar-container">
                  <HealthBar initialHealth={CurrentEnemyHP} maxHealth={pokemonEnemyStats.hp} />
                </div>
              </div>
              <img alt={item.pokemon.name} src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' + item.pokemon.id + '.gif'} />
            </div>
          );
        }
        return (<div></div>)
      }
    }));
  }

  return (
    <div className="battle">
      <div className='battlecontainer'>
        <UserLogged />
        {dataFetched ? (<RenderedItems />) : (<h1>Carregando página</h1>)}
      </div>
      {showCaption ? (<div className="pokemonStats Attack" ><h1 className="AttackUsed">{pokemonStats.name} used {showCaption}!</h1></div>) :(<RenderMoves />)}
    </div>
  );
};

export default Battle;
