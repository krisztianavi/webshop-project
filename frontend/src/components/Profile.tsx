import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        navigate('/login');
      } else {
        setToken(storedToken);
      }
    }
  }, [token, navigate]);

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleUsernameChange = async () => {
    if (username.trim() === '') {
      setUsernameError('A felhasználónév nem lehet üres.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/profile/username', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        setMessage('A felhasználónév sikeresen frissítve.');
        setUsernameError('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Nem sikerült a felhasználónevet frissíteni.');
      }
    } catch (error) {
      console.error('Hiba a felhasználónév frissítése során:', error);
      setMessage('Hiba történt.');
    }
  };

  const handlePasswordChange = async () => {
    if (!validatePassword(password)) {
      setPasswordError('A jelszónak legalább 6 karakter hosszúnak kell lennie, tartalmaznia kell egy nagybetűt, egy kisbetűt és egy számot.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/profile/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ password }), 
      });

      if (response.ok) {
        setMessage('A jelszó sikeresen frissítve.');
        setPasswordError('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Nem sikerült a jelszót frissíteni.');
      }
    } catch (error) {
      console.error('Hiba a jelszó frissítése során:', error);
      setMessage('Hiba történt.');
    }
  };

  return (
    <div>
      <h2>Profil</h2>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Új felhasználónév"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && <div style={{ color: 'red' }}>{usernameError}</div>}
        <button onClick={handleUsernameChange} className="btn btn-primary mt-2">
          Felhasználónév Frissítése
        </button>
      </div>

      <div className="mb-3">
        <input
          type="password"
          placeholder="Új jelszó"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
        <button onClick={handlePasswordChange} className="btn btn-primary mt-2">
          Jelszó Frissítése
        </button>
      </div>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default Profile;
