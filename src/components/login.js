import React, { useState } from 'react';
import './login.css';
import { useHistory } from 'react-router-dom'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const authenticationEndpoint = 'http://localhost:8080/registration/login';

    fetch(authenticationEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          // Successful login
          return response.json().then((data) => {
            console.log(data);
            const { token } = data;
            localStorage.setItem('jwtToken', token);
            window.location.href = '/home'; 
            
          });
        } else {
          // Authentication error
          throw new Error('Authentication failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
        // Display an error message to the user
        setErrorMessage('Mot de passe ou email incorrect');
      });
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Entrez votre email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Entrez votre mot de passe"
          />
        </div>
        <button type="button" onClick={handleLogin} className="login-button">
          Se connecter
        </button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default Login;
