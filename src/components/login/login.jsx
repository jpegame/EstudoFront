import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Include credentials for cross-origin requests
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.replace('/');
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Nome do usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='buttonlogin' onClick={handleLogin}>Login</button>
      <a href='/register'>Não possui uma conta? Criar conta</a>
    </div>
  );
};

export default Login;
