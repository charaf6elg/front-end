import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">Menu Responsable</div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/responsable" className={({ isActive }) => isActive ? 'active' : ''}>
            📊 Demandes
          </NavLink>
        </li>
        <li>
          <NavLink to="/produits" className={({ isActive }) => isActive ? 'active' : ''}>
            📦 Produits
          </NavLink>
        </li>
        <li>
          <NavLink to="/utilisateurs" className={({ isActive }) => isActive ? 'active' : ''}>
            👤 Utilisateurs
          </NavLink>
        </li>
        <li>
          <NavLink to="/fournisseurs" className={({ isActive }) => isActive ? 'active' : ''}>
            🏢 Fournisseurs
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
