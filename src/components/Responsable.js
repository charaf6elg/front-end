import React, { useState } from 'react';
import './Responsable.css';

const demandesInitiales = [
  { id: 1, nom: "Charaf", demandeId: "AB12", produit: "Stylo",   quantite: 12, date: "2025-07-01" },
  { id: 2, nom: "Sophie", demandeId: "CD34", produit: "Cahier",  quantite: 5,  date: "2025-06-15" },
  { id: 3, nom: "Jean",   demandeId: "EF56", produit: "Classeur",quantite: 8,  date: "2025-07-03" }
];

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d) ? "" : d.toLocaleDateString("fr-FR");
}

export default function Responsable() {
  const [demandes, setDemandes] = useState(demandesInitiales);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    demandeId: '',
    produit: '',
    quantite: '',
    date: ''
  });

  const traiterDemande = (id, action) => {
    const message = action === 'accept' ? 'acceptée' : 'refusée';
    alert(`Demande ${id} ${message} !`);
  };

  const ouvrirFormulaire = () => {
    setFormData({ nom: '', demandeId: '', produit: '', quantite: '', date: '' });
    setShowForm(true);
  };

  const fermerFormulaire = () => setShowForm(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newId =
      demandes.length ? Math.max(...demandes.map(d => d.id)) + 1 : 1;

    const nouvelleDemande = {
      id: newId,
      ...formData,
      quantite: Number(formData.quantite),
      date: formData.date || new Date().toISOString().slice(0, 10),
    };

    setDemandes(prev => [...prev, nouvelleDemande]);
    // reset + fermer
    setFormData({ nom: '', demandeId: '', produit: '', quantite: '', date: '' });
    setShowForm(false);
  };

  return (
    <div className="main-content" style={{ padding: '1rem' }}>
      <h2>Liste des demandes</h2>

      <button className="btn btn-primary mb-3" onClick={ouvrirFormulaire}>
        Ajouter demande
      </button>

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
                  <th>Dernière commande</th>
                  <th>Quantité</th>
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

      {/* Modal formulaire — version sans Bootstrap JS */}
      {showForm && (
        <div className="overlay">
          <div className="dialog">
            <h3>Ajouter une nouvelle demande</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom</label>
                <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>N° Demande</label>
                <input type="text" name="demandeId" value={formData.demandeId} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Produit</label>
                <input type="text" name="produit" value={formData.produit} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Quantité</label>
                <input type="number" name="quantite" value={formData.quantite} onChange={handleChange} min="1" required />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} />
              </div>

              <div style={{ display: 'flex', gap: '.5rem', marginTop: '.75rem' }}>
                <button type="submit" className="btn btn-primary">Ajouter</button>
                <button type="button" className="btn btn-secondary" onClick={fermerFormulaire}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
