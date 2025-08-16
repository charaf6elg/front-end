import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

function LoginFinal() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (e) => {
    console.log('onChange username:', e.target.value);
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    console.log('onChange password:', e.target.value);
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.clear();
    console.log("SUBMIT values (avant envoi) :", { username, password });
  
    if (!username.trim() || !password) {
      alert("Veuillez renseigner username et password.");
      return;
    }
  
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        { username, mdp: password }, // Axios automatically JSON-encodes
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true, // enable if backend uses cookies
        }
      );
  
      console.log("Réponse HTTP:", res.status, res.statusText);
      console.log("JSON reçu:", res.data);
  
      if (!res.data?.token) {
        throw new Error("Token manquant dans la réponse du serveur.");
      }
  
      // Save token & redirect
      localStorage.setItem("token", res.data.token);
      const redirectURL = res.data.redirectURL || "/dashboard";
      window.location.href = redirectURL;
    } catch (err) {
      console.error("Erreur login:", err);
      if (err.response) {
        // Server responded with error status
        alert(err.response.data?.message || `Erreur ${err.response.status}`);
      } else if (err.request) {
        // Request sent but no response
        alert("Aucune réponse du serveur (peut-être problème CORS ou backend éteint)");
      } else {
        // Something else happened
        alert(err.message || "Erreur lors de la connexion");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <img src="/logo192.png" alt="Logo" className="logo" />

      <div className="login-box">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="User Icon"
          className="user-icon"
        />
        <h2>Welcome to your account !</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username" style={{ display: 'none' }}>Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            required
            autoComplete="username"
          />

          <label htmlFor="password" style={{ display: 'none' }}>Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
            autoComplete="current-password"
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Connexion…' : 'Login'}
          </button>
        </form>

        {/* Bloc debug visible pour confirmer l'état en temps réel */}
        <div style={{ marginTop: 12, fontSize: 13, color: '#333' }}>
          <strong>State live:</strong>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify({ username, password }, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default LoginFinal;
