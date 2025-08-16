import React, { useMemo, useState } from "react";
import "./Responsable.css";

// Exemple d'utilisateur connecté
const currentUser = { id: 101, nom: "Charaf", email: "charaf@exemple.com" };

// Données avec champ justification
const demandesInitiales = [
  { id: 1, userId: 101, nom: "Charaf", demandeId: "AB12", produit: "Stylo", quantite: 12, date: "2025-07-01", statut: "En attente", justification: "" },
  { id: 2, userId: 102, nom: "Sophie", demandeId: "CD34", produit: "Cahier", quantite: 5, date: "2025-06-15", statut: "Acceptée", justification: "" },
  { id: 3, userId: 101, nom: "Charaf", demandeId: "XY99", produit: "Classeur", quantite: 3, date: "2025-07-10", statut: "Refusée", justification: "Produit en rupture de stock" },
  { id: 4, userId: 103, nom: "Jean", demandeId: "EF56", produit: "Toner", quantite: 2, date: "2025-07-03", statut: "En attente", justification: "" },
];

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d) ? "" : d.toLocaleDateString("fr-FR");
}

export default function EmployeDemandes() {
  const [demandes] = useState(demandesInitiales);
  const mesDemandes = useMemo(() => demandes.filter(d => d.userId === currentUser.id), [demandes]);

  return (
    <div className="main-content" style={{ padding: "1rem" }}>
      <h2>Mes demandes</h2>
      <p style={{ marginBottom: ".75rem" }}>
        Connecté en tant que <strong>{currentUser.nom}</strong> ({currentUser.email})
      </p>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>N° Demande</th>
                  <th>Produit</th>
                  <th>Date</th>
                  <th>Quantité</th>
                  <th>Statut</th>
                  <th>Justification</th>
                </tr>
              </thead>
              <tbody>
                {mesDemandes.map((d) => (
                  <tr key={d.id}>
                    <td>{d.nom}</td>
                    <td className="text-primary font-weight-bold">{d.demandeId}</td>
                    <td>{d.produit}</td>
                    <td>{formatDate(d.date)}</td>
                    <td>{d.quantite}</td>
                    <td
                      style={{
                        color: d.statut === "Refusée" ? "red" :
                               d.statut === "Acceptée" ? "green" : "orange",
                        fontWeight: "bold"
                      }}
                    >
                      {d.statut}
                    </td>
                    <td>
                      {d.statut === "Refusée" ? (
                        <span>{d.justification}</span>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
                {!mesDemandes.length && (
                  <tr>
                    <td colSpan="7" className="text-center">Aucune demande pour cet utilisateur</td>
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
