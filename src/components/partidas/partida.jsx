import React, { useState, useEffect } from "react";
import UserLogged from "../userlogged/userlogged";

const Partida = () => {
    const [matchData, setMatchData] = useState([{
        id: 0,
        status: '',
        team1: '',
        team2: ''
    }]);
    useEffect(() => {
        fetch("/matches")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setMatchData(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleClick = async (item) => {
        const messageHash = item.id + '-' + item.team1 + '-' + item.team2 
        try {
            const response = await fetch('/hash', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',  // Include credentials for cross-origin requests
                body: JSON.stringify({message: messageHash}),
            });

            const data = await response.json();

            if (response.ok) {
                window.location.replace('/start?s=' + data.hash);
            } else {
                console.error('POST failed:', data.message);
            }
        } catch (error) {
            console.error('Error during POST:', error.message);
        }
    }


    return (
        <div style={{ width: '50%', margin: '10px' }}>
            <UserLogged />
            {matchData.map((item) => (
                <div key={item.id} className="team" onClick={() => handleClick(item)}>
                    <h1>{item.team1} x {item.team2}</h1>
                </div>
            ))}
        </div>
    )
}

export default Partida;