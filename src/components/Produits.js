import React, { useState } from 'react';

const initialProduits = [
  { id: 1, nom: 'Stylo', description: 'Stylo bleu', type: 'Papeterie', dateAchat: '2025-01-10', stock: 65, prix: '2dh', fournisseur: 'Alami' },
  { id: 2, nom: 'Papier', description: 'Feuilles A4', type: 'Papeterie', dateAchat: '2025-02-15', stock: 90, prix: '10dh', fournisseur: 'Alami' },
  { id: 3, nom: 'Classeurs', description: 'Classeur A4', type: 'Papeterie', dateAchat: '2025-03-05', stock: 88, prix: '15dh', fournisseur: 'Kadiri' },
  { id: 4, nom: 'Agrafeuses', description: 'Agrafeuse métal', type: 'Bureau', dateAchat: '2025-04-20', stock: 36, prix: '30dh', fournisseur: 'Kadiri' },
];

const fournisseursList = ['Alami', 'Kadiri', 'OfficePro', 'BureauPlus'];

function Produits() {
  const [produits, setProduits] = useState(initialProduits);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('ajouter'); // 'ajouter' ou 'modifier'
  const [currentProduit, setCurrentProduit] = useState({
    id: null,
    nom: '',
    description: '',
    type: '',
    dateAchat: '',
    stock: '',
    prix: '',
    fournisseur: '',
  });

  const handleAjouterClick = () => {
    setFormMode('ajouter');
    setCurrentProduit({ id: null, nom: '', description: '', type: '', dateAchat: '', stock: '', prix: '', fournisseur: '' });
    setShowForm(true);
  };

  const handleModifierClick = (produit) => {
    setFormMode('modifier');
    setCurrentProduit(produit);
    setShowForm(true);
  };

  const handleSupprimerClick = (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      setProduits(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduit(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formMode === 'ajouter') {
      const newProduit = {
        id: produits.length ? produits[produits.length - 1].id + 1 : 1,
        ...currentProduit,
        stock: parseInt(currentProduit.stock),
      };
      setProduits(prev => [...prev, newProduit]);
    } else if (formMode === 'modifier') {
      setProduits(prev => prev.map(p => (p.id === currentProduit.id ? { ...currentProduit, stock: parseInt(currentProduit.stock) } : p)));
    }
    setShowForm(false);
    setCurrentProduit({ id: null, nom: '', description: '', type: '', dateAchat: '', stock: '', prix: '', fournisseur: '' });
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentProduit({ id: null, nom: '', description: '', type: '', dateAchat: '', stock: '', prix: '', fournisseur: '' });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Liste des Produits</h2>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={handleAjouterClick} className="btn btn-primary">+ Ajouter</button>
      </div>

      {showForm && (
        <form onSubmit={handleFormSubmit} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <div className="form-group">
            <label>Nom</label>
            <input type="text" name="nom" value={currentProduit.nom} onChange={handleInputChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" name="description" value={currentProduit.description} onChange={handleInputChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Type</label>
            <input type="text" name="type" value={currentProduit.type} onChange={handleInputChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Date d'achat</label>
            <input type="date" name="dateAchat" value={currentProduit.dateAchat} onChange={handleInputChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label>Prix</label>
            <input type="text" name="prix" value={currentProduit.prix} onChange={handleInputChange} className="form-control" required />
          </div>

          {formMode === 'ajouter' && (
            <div className="form-group">
              <label>Quantité</label>
              <input type="number" name="stock" value={currentProduit.stock} onChange={handleInputChange} className="form-control" required />
            </div>
          )}

          {formMode === 'modifier' && (
            <div className="form-group">
              <label>Stock</label>
              <input type="number" name="stock" value={currentProduit.stock} onChange={handleInputChange} className="form-control" required />
            </div>
          )}

          <div className="form-group">
            <label>Fournisseur</label>
            <select name="fournisseur" value={currentProduit.fournisseur} onChange={handleInputChange} className="form-control" required>
              <option value="">-- Sélectionner un fournisseur --</option>
              {fournisseursList.map((f, index) => (
                <option key={index} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-success" style={{ marginRight: '0.5rem' }}>
            {formMode === 'ajouter' ? 'Enregistrer' : 'Modifier'}
          </button>
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Annuler</button>
        </form>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Type</th>
            <th>Date achat</th>
            <th>Stock</th>
            <th>Prix</th>
            <th>Fournisseur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produits.map(p => (
            <tr key={p.id}>
              <td>{p.nom}</td>
              <td>{p.description}</td>
              <td>{p.type}</td>
              <td>{p.dateAchat}</td>
              <td>{p.stock}</td>
              <td>{p.prix}</td>
              <td>{p.fournisseur}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleModifierClick(p)} style={{ marginRight: '0.5rem' }}>Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleSupprimerClick(p.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Produits;
