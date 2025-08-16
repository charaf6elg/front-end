import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // tu peux réutiliser le même CSS

export default function AdminSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">Menu Admin</div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/demandes" className={({ isActive }) => (isActive ? "active" : "")}>
            📋 Listes de demandes
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
