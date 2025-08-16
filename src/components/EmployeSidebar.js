import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // même style que les autres sidebars

export default function EmployeSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">Menu Employé</div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/employe/demandes" className={({ isActive }) => (isActive ? "active" : "")}>
            📋 Mes demandes
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
