import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // tu peux réutiliser le même CSS

export default function AdminSidebar() {
  const handleLogout = () => {
    // adapte selon ta logique d'authentification
    try {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    } finally {
      window.location.href = "/login";
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">Menu Admin</div>

      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/admin/demandes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            📋 Listes de demandes
          </NavLink>
        </li>

        {/* Paramètres : groupé */}
        <li className="sidebar-section">
          <div className="sidebar-section-title" role="heading" aria-level={2}>
            <span className="section-icon" aria-hidden="true">⚙️</span>
            <span>Paramètres</span>
          </div>

          <ul className="sidebar-submenu" role="menu">
            <li role="none">
              <NavLink
                to="/reset-password"
                role="menuitem"
                className={({ isActive }) =>
                  isActive ? "submenu-link active" : "submenu-link"
                }
              >
                <span className="subbullet" aria-hidden="true">○</span>
                <span className="submenu-text">🔑 Réinitialiser mot de passe</span>
              </NavLink>
            </li>

            <li role="none">
              <button
                type="button"
                className="submenu-link logout-btn"
                onClick={handleLogout}
                aria-label="Se déconnecter"
                role="menuitem"
              >
                <span className="subbullet" aria-hidden="true">○</span>
                <span className="submenu-text">📘 Se déconnecter</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
