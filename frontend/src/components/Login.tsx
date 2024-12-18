import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartCon';

function Login() {
  const context = useContext(CartContext);

  if (!context) {
    return <p>Hiba az oldalon - A CartContext nem elérhető.</p>;
  }

  const { setIsLoggedIn } = context;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json(); 
        localStorage.setItem('token', data.token); 
        setIsLoggedIn(true);
        navigate('/products');
      } else {
        setMessage('A bejelentkezés sikertelen');
      }
    } catch (error) {
      console.error('Hiba történt:', error);
      setMessage('Hiba az oldalon');
    }
  };  

  return (
    <form onSubmit={handleLogin} className="mt-4">
      <h2>Bejelentkezés</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Felhasználónév"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          placeholder="Jelszó"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Belépek</button>
      {message && <div className="mt-3">{message}</div>}
    </form>
  );
}

export default Login;
