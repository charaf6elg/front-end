import React, { useState } from "react";
import "./Responsable.css";

const currentUser = { id: 101, nom: "Charaf", email: "charaf@exemple.com" };

// Produits disponibles
const produitsDisponibles = [
  { id: 1, nom: "Stylo", stock: 50, prix: 2.5 },
  { id: 2, nom: "Cahier", stock: 30, prix: 5 },
  { id: 3, nom: "Classeur", stock: 20, prix: 8 },
  { id: 4, nom: "Toner", stock: 10, prix: 50 },
];

export default function EmployeDemandes() {
  const [demandes, setDemandes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectionProduits, setSelectionProduits] = useState([]);
  const [editingDemandeId, setEditingDemandeId] = useState(null);

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

    if (editingDemandeId !== null) {
      // Modification existante
      const updatedDemandes = demandes.map(d => 
        d.id === editingDemandeId ? {
          ...d,
          produit: selectionProduits.map(p => p.nom).join(", "),
          quantite: selectionProduits.reduce((sum, p) => sum + p.quantite, 0),
          statut: "En attente"
        } : d
      );
      setDemandes(updatedDemandes);
    } else {
      // Nouvelle commande
      const nouvellesDemandes = selectionProduits.map((p, index) => ({
        id: demandes.length + index + 1,
        userId: currentUser.id,
        nom: currentUser.nom,
        demandeId: Math.random().toString(36).substring(2, 6).toUpperCase(),
        produit: p.nom,
        quantite: p.quantite,
        date: new Date().toISOString().split("T")[0],
        statut: "En attente",
        justification: "",
      }));
      setDemandes([...demandes, ...nouvellesDemandes]);
    }

    // Reset
    setSelectionProduits([]);
    setShowForm(false);
    setEditingDemandeId(null);
  };

  const modifierDemande = (demande) => {
    // Pré-remplir les produits (ici on sépare par ", " pour retrouver les noms)
    const produitsDansDemande = produitsDisponibles.filter(p => demande.produit.includes(p.nom))
      .map(p => ({ ...p, quantite: demande.quantite })); 
    setSelectionProduits(produitsDansDemande);
    setEditingDemandeId(demande.id);
    setShowForm(true);
  };

  const annulerDemande = (id) => {
    if (window.confirm("Voulez-vous vraiment annuler cette demande ?")) {
      setDemandes(demandes.map(d => d.id === id ? { ...d, statut: "Annulée" } : d));
    }
  };

  return (
    <div className="main-content" style={{ padding: "1rem" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Mes demandes</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          Ajouter une demande
        </button>
      </div>

      {showForm && (
        <div className="card mb-3">
          <div className="card-body">
            <h5>{editingDemandeId ? "Modifier la demande" : "Ajouter une demande"}</h5>
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
          <h5>Mes demandes</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map(d => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.produit}</td>
                  <td>{d.quantite}</td>
                  <td>{d.date}</td>
                  <td>{d.statut}</td>
                  <td>
                    <button className="btn btn-warning btn-sm mr-2" onClick={() => modifierDemande(d)} disabled={d.statut !== "En attente"}>
                      Modifier
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => annulerDemande(d.id)} disabled={d.statut !== "En attente"}>
                      Annuler
                    </button>
                  </td>
                </tr>
              ))}
              {!demandes.length && (
                <tr>
                  <td colSpan="6" className="text-center">Aucune demande</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
