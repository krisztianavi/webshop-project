import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setMessage('Registration successful.');
        navigate('/login');
      } else {
        setMessage('Registration failed.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('An error occurred.');
    }
  };

  return (
    <form onSubmit={handleRegister} className="mt-4">
      <h2>Register</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Register
      </button>
      {message && <p className="mt-3">{message}</p>}
    </form>
  );
}

export default Register;
