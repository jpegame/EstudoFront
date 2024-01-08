import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',  // Include credentials for cross-origin requests
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.replace('/login');
      } else {
        console.error('Register failed:', data.message);
      }
    } catch (error) {
      console.error('Error during register:', error.message);
    }
  };

  return (
    <div className='login'>
      <h2>Criar conta</h2>
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
      <button className='buttonlogin' onClick={handleLogin}>Registrar</button>
      <a href='/login'>Já possui uma conta? Fazer login</a>
    </div>
  );
};

export default Register;
