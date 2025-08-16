import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './components/Login.js';
import Responsable from './components/Responsable.js';
import Produits from './components/Produits.js';
import Utilisateurs from './components/Utilisateurs.js';
import Sidebar from './components/Sidebar.js';
import AdminSidebar from './components/AdminSidebar.js';
import AdminDemandes from './components/AdminDemandes.js';
import Fournisseurs from './components/Fournisseurs.js';
import EmployeSidebar from './components/EmployeSidebar.js';
import EmployeDemandes from './components/EmployeDemandes.js';
import ResetPassword from './components/ResetPassword.js';

// === Composant PrivateRoute ===
function PrivateRoute({ element, allowedRoles }) {
  const role = localStorage.getItem('role'); // Rôle défini après login
  return allowedRoles.includes(role) ? element : <Navigate to="/login" replace />;
}

// === Layout avec Sidebars dynamiques ===
function Layout() {
  const location = useLocation();
  const role = localStorage.getItem('role');

  // Déterminer la sidebar à afficher selon le rôle
  const getSidebarComponent = () => {
    if (role === 'admin') return <AdminSidebar />;
    if (role === 'employe') return <EmployeSidebar />;
    if (role === 'responsable') return <Sidebar />;
    return null;
  };

  return (
    <div style={{ display: 'flex' }}>
      {getSidebarComponent()}
      <div
        style={{
          flex: 1,
          marginLeft: getSidebarComponent() ? '220px' : '0',
          padding: '1rem',
          transition: 'margin-left 0.3s ease'
        }}
      >
        <Routes>
          {/* Public */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Responsable */}
          <Route path="/responsable" element={<PrivateRoute element={<Responsable />} allowedRoles={['responsable']} />} />
          <Route path="/produits" element={<PrivateRoute element={<Produits />} allowedRoles={['responsable']} />} />
          <Route path="/utilisateurs" element={<PrivateRoute element={<Utilisateurs />} allowedRoles={['responsable']} />} />
          <Route path="/fournisseurs" element={<PrivateRoute element={<Fournisseurs />} allowedRoles={['responsable']} />} />
          <Route path="/reset-password" element={<PrivateRoute element={<ResetPassword />} allowedRoles={['responsable']} />} />

          {/* Admin */}
          <Route path="/admin/demandes" element={<PrivateRoute element={<AdminDemandes />} allowedRoles={['admin']} />} />

          {/* Employé */}
          <Route path="/employe/demandes" element={<PrivateRoute element={<EmployeDemandes />} allowedRoles={['employe']} />} />

          {/* Si aucune route trouvée */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
}

// === App principale ===
export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
