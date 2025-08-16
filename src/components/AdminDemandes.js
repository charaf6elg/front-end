import React, { useState } from 'react';
import './Responsable.css';

const produitsDisponibles = [
  { id: 1, nom: "Stylo", stock: 50, prix: 2.5 },
  { id: 2, nom: "Cahier", stock: 30, prix: 5 },
  { id: 3, nom: "Classeur", stock: 20, prix: 8 },
  { id: 4, nom: "Toner", stock: 10, prix: 50 },
];

const demandesInitiales = [
  { id: 1, nom: "Charaf", demandeId: "AB12", produit: "Stylo", quantite: 12, date: "2025-07-01" },
  { id: 2, nom: "Sophie", demandeId: "CD34", produit: "Cahier", quantite: 5, date: "2025-06-15" },
  { id: 3, nom: "Jean", demandeId: "EF56", produit: "Classeur", quantite: 8, date: "2025-07-03" }
];

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR");
}

export default function AdminDemandes() {
  const [demandes, setDemandes] = useState(demandesInitiales);
  const [showForm, setShowForm] = useState(false);
  const [selectionProduits, setSelectionProduits] = useState([]);

  const toggleProduit = (produit) => {
    const exists = selectionProduits.find(p => p.id === produit.id);
    if (exists) {
      setSelectionProduits(selectionProduits.filter(p => p.id !== produit.id));
    } else {
      setSelectionProduits([...selectionProduits, { ...produit, quantite: 1 }]);
    }
  };

  const handleQuantiteChange = (id, value) => {
    setSelectionProduits(selectionProduits.map(p => p.id === id ? { ...p, quantite: Number(value) } : p));
  };

  const confirmerCommande = () => {
    if (!selectionProduits.length) return alert("Veuillez sélectionner au moins un produit !");
    const nouvellesDemandes = selectionProduits.map((p, index) => ({
      id: demandes.length + index + 1,
      nom: "Admin", // ou choisir un utilisateur si nécessaire
      demandeId: Math.random().toString(36).substring(2, 6).toUpperCase(),
      produit: p.nom,
      quantite: p.quantite,
      date: new Date().toISOString().split("T")[0]
    }));
    setDemandes([...demandes, ...nouvellesDemandes]);
    setSelectionProduits([]);
    setShowForm(false);
  };

  const traiterDemande = (id, action) => {
    const message = action === 'accept' ? 'acceptée' : 'refusée';
    alert(`Demande ${id} ${message} !`);
  };

  return (
    <div className="main-content" style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Liste des demandes (Admin)</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          Ajouter une demande
        </button>
      </div>

      {showForm && (
        <div className="card mb-3">
          <div className="card-body">
            <h5>Ajouter une demande</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Choisir</th>
                  <th>Produit</th>
                  <th>Stock disponible</th>
                  <th>Prix unitaire</th>
                  <th>Quantité</th>
                </tr>
              </thead>
              <tbody>
                {produitsDisponibles.map(p => {
                  const selected = selectionProduits.find(sp => sp.id === p.id);
                  return (
                    <tr key={p.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={!!selected}
                          onChange={() => toggleProduit(p)}
                        />
                      </td>
                      <td>{p.nom}</td>
                      <td>{p.stock}</td>
                      <td>{p.prix} €</td>
                      <td>
                        {selected && (
                          <input
                            type="number"
                            min="1"
                            max={p.stock}
                            value={selected.quantite}
                            onChange={(e) => handleQuantiteChange(p.id, e.target.value)}
                            style={{ width: "60px" }}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className="btn btn-success" onClick={confirmerCommande}>
              Confirmer
            </button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>N° Demande</th>
                  <th>Produit</th>
                  <th>Dernière commande</th>
                  <th>Quantité</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {demandes.map(d => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.nom}</td>
                    <td className="text-primary font-weight-bold">{d.demandeId}</td>
                    <td>{d.produit}</td>
                    <td>{formatDate(d.date)}</td>
                    <td>{d.quantite}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => traiterDemande(d.demandeId, 'accept')}
                      >
                        Accepter
                      </button>{' '}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => traiterDemande(d.demandeId, 'reject')}
                      >
                        Refuser
                      </button>
                    </td>
                  </tr>
                ))}
                {!demandes.length && (
                  <tr>
                    <td colSpan="7" className="text-center">Aucune demande</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
