import React, { useState } from 'react';
import './Responsable.css';

const demandesInitiales = [
  { id: 1, nom: "Charaf", demandeId: "AB12", produit: "Stylo", quantite: 12, date: "2025-07-01", status: "En attente" },
  { id: 2, nom: "Sophie", demandeId: "CD34", produit: "Cahier", quantite: 5, date: "2025-06-15", status: "En attente" },
  { id: 3, nom: "Jean", demandeId: "EF56", produit: "Classeur", quantite: 8, date: "2025-07-03", status: "En attente" }
];

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d) ? "" : d.toLocaleDateString("fr-FR");
}

export default function Responsable() {
  const [demandes, setDemandes] = useState(demandesInitiales);

  const traiterDemande = (id, action) => {
    setDemandes(prev =>
      prev.map(d =>
        d.id === id
          ? { ...d, status: action === 'accept' ? 'Accepté' : 'Refusé' }
          : d
      )
    );
  };

  return (
    <div className="main-content" style={{ padding: '1rem' }}>
      <h2>Liste des demandes</h2>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>ID</th>
                  <th>N° Demande</th>
                  <th>Produit</th>
                  <th>Date</th>
                  <th>Quantité</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {demandes.map(d => (
                  <tr key={d.id}>
                    <td>{d.nom}</td>
                    <td>{d.id}</td>
                    <td className="text-primary font-weight-bold">{d.demandeId}</td>
                    <td>{d.produit}</td>
                    <td>{formatDate(d.date)}</td>
                    <td>{d.quantite}</td>
                    <td>{d.status}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => traiterDemande(d.id, 'accept')}
                        disabled={d.status === 'Accepté'}
                      >
                        Accepter
                      </button>{' '}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => traiterDemande(d.id, 'reject')}
                        disabled={d.status === 'Refusé'}
                      >
                        Refuser
                      </button>
                    </td>
                  </tr>
                ))}
                {!demandes.length && (
                  <tr>
                    <td colSpan="8" className="text-center">Aucune demande</td>
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