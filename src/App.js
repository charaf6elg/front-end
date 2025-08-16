import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import LoginPage from './components/Login.js';
import Responsable from './components/Responsable.js';
import Produits from './components/Produits.js';
import Utilisateurs from './components/Utilisateurs.js';
import Sidebar from './components/Sidebar.js';
import AdminSidebar from './components/AdminSidebar.js';
import AdminDemandes from './components/AdminDemandes.js';
import Fournisseurs from './components/Fournisseurs.js';
import EmployeSidebar from './components/EmployeSidebar.js';     // ✅ nouveau
import EmployeDemandes from './components/EmployeDemandes.js';   // ✅ nouveau

function HomePage() {
  return (
    <>
      <Navbar />
      <main style={{ marginLeft: 0, padding: '1rem' }}>
        <h1>Bienvenue sur mon site React</h1>
        <p>Ceci est la page d'accueil</p>
      </main>
      <Footer />
    </>
  );
}

function Layout() {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');
  const isEmploye = location.pathname.startsWith('/employe'); // ✅ nouveau
  const showRespSidebar = ['/responsable', '/produits', '/utilisateurs', '/fournisseurs'].includes(location.pathname);

  // Choix de la sidebar selon le contexte
  const sidebar = isAdmin ? <AdminSidebar /> : isEmploye ? <EmployeSidebar /> : (showRespSidebar && <Sidebar />);

  return (
    <div style={{ display: 'flex' }}>
      {sidebar}
      <div style={{ flex: 1, marginLeft: sidebar ? 220 : 0, padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Responsable */}
          <Route path="/responsable" element={<Responsable />} />
          <Route path="/produits" element={<Produits />} />
          <Route path="/utilisateurs" element={<Utilisateurs />} />
          <Route path="/fournisseurs" element={<Fournisseurs />} />

          {/* Admin */}
          <Route path="/admin/demandes" element={<AdminDemandes />} />

          {/* Employé */}
          <Route path="/employe/demandes" element={<EmployeDemandes />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
