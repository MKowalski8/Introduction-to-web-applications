import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import './logowanie.css';

const URL = 'http://localhost:5000';

export default function Logowanie() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const response = await axios.post(`${URL}/login`, {
        username: username,
        password: hashedPassword,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      setLoggedIn(true);
      setError(''); 
    } catch (error) {
      setLoggedIn(false);
      setUsername('')
      setPassword('')
      setError('Invalid username or password. Please try again.');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUsername('')
    setPassword('')
  };

  return (
    <div className="logowanie">
      <h2>Logowanie</h2>
      {loggedIn ? (
        <div>
          <p>You are logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}