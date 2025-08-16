import React, { useState } from 'react';
import './Login.css';

// ⚠️ Change API_BASE si ton backend est sur un autre port/URL
const API_BASE = 'http://localhost:3000';

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
    console.log('SUBMIT values (avant envoi) :', { username, password });

    // Validation basique côté client
    if (!username.trim() || !password) {
      alert('Veuillez renseigner username et password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 👇 Aligne avec ton backend : { username, password } ou { username, mdp: password }
        body: JSON.stringify({ username, mdp: password }),
        // credentials: 'include', // décommente si tu utilises des cookies côté serveur
      });

      console.log('Réponse HTTP:', res.status, res.statusText);

      // récupère le corps brut pour debug si ce n'est pas JSON
      const raw = await res.text();
      console.log('Raw response:', raw);

      if (!res.ok) {
        // Essaie d'extraire un message d'erreur JSON, sinon utilise le texte brut
        let message = `Erreur serveur (${res.status})`;
        try {
          const parsed = JSON.parse(raw);
          message = parsed?.message || JSON.stringify(parsed) || message;
        } catch {
          if (raw) message = raw;
        }
        throw new Error(message);
      }

      // parse JSON (on suppose que la réponse est JSON valide)
      const data = JSON.parse(raw);
      console.log('JSON reçu:', data);

      if (!data?.token) {
        throw new Error('Token manquant dans la réponse du serveur.');
      }

      // Stocke le token et redirige
      localStorage.setItem('token', data.token);
      const redirectURL = data.redirectURL || '/dashboard';
      window.location.href = redirectURL;
    } catch (err) {
      console.error('Erreur login:', err);
      alert(err.message || 'Erreur lors de la connexion');
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
