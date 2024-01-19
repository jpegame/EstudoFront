import React from "react";
import "./header.css";

function Header() {

    const Logout = async () => {
        try {
            const response = await fetch('/logout', {
              method: 'POST',
            });
            const data = await response.json();
      
            if (response.ok) {
              window.location.replace('/login');
            } else {
              console.error('Logout failed:', data.message);
            }
          } catch (error) {
            console.error('Error during logout:', error.message);
          }
    };

	return (
        <header>
            <a href="/" className="logo">Pokedex</a>
            <nav>
              <a href="/">Home</a>
              <a href='/torneio'>Torneio</a>
              <a href='/team'>Times</a>
              <a href='/partidas'>Partidas</a>
              <button onClick={Logout}>Logout</button>
            </nav>
        </header>
	);
}

export default Header;
