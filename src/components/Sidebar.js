import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remplace par ta logique réelle si nécessaire (API logout, clear tokens, etc.)
    localStorage.clear();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">Menu<br/>Responsable</div>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/responsable" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
            <span className="menu-icon">📊</span>
            <span className="menu-text">Demandes</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/produits" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
            <span className="menu-icon">📦</span>
            <span className="menu-text">Produits</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/utilisateurs" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
            <span className="menu-icon">👤</span>
            <span className="menu-text">Utilisateurs</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/fournisseurs" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
            <span className="menu-icon">🏢</span>
            <span className="menu-text">Fournisseurs</span>
          </NavLink>
        </li>

        {/* Paramètres : groupé */}
        <li className="sidebar-section">
          <div className="sidebar-section-title">
            <span className="section-icon">⚙️</span>
            <span>Paramètres</span>
          </div>

          <ul className="sidebar-submenu">
            <li>
              <NavLink to="/reset-password" className={({ isActive }) => isActive ? 'submenu-link active' : 'submenu-link'}>
                <span className="subbullet" aria-hidden="true">○</span>
                <span className="submenu-text">🔑 Réinitialiser mot de passe</span>
              </NavLink>
            </li>

            <li>
              <button
                type="button"
                className="submenu-link logout-btn"
                onClick={handleLogout}
                aria-label="Se déconnecter"
              >
                <span className="subbullet" aria-hidden="true">○</span>
                <span className="submenu-text">📘 Se déconnecter</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
