import React, { useState } from 'react';
import './Responsable.css';

// Données initiales
const fournisseursInitial = [
  { idFiscal: "FR123456", nom: "ABC Fournitures", adresse: "12 Rue du Marché, Paris", tel: "01 23 45 67 89", contratUrl: "/contrats/contrat1.pdf", contratName: "contrat1.pdf" },
  { idFiscal: "FR654321", nom: "Office Pro", adresse: "8 Avenue de la République, Lyon", tel: "04 56 78 90 12", contratUrl: "/contrats/contrat2.pdf", contratName: "contrat2.pdf" },
  { idFiscal: "FR987654", nom: "Papeterie Express", adresse: "25 Boulevard Voltaire, Marseille", tel: "05 67 89 01 23", contratUrl: "/contrats/contrat3.pdf", contratName: "contrat3.pdf" }
];

export default function Fournisseurs() {
  const [fournisseurs, setFournisseurs] = useState(fournisseursInitial);

  // selected = idFiscal de la ligne sélectionnée (utile pour modales)
  const [selectedId, setSelectedId] = useState(null);
  // 'add' | 'edit' | 'delete' | null
  const [modalType, setModalType] = useState(null);

  // formData pour add/edit (pour edit on n'autorise pas l'upload)
  const [formData, setFormData] = useState({
    idFiscal: '',
    nom: '',
    adresse: '',
    tel: '',
    contratFile: null,    // uniquement pour "add"
    contratUrl: '',       // stocke l'URL (blob ou chemin) / après ajout
    contratName: '',      // nom de fichier
  });

  // Ouvrir modal Ajouter
  const ouvrirAjout = () => {
    setFormData({
      idFiscal: '',
      nom: '',
      adresse: '',
      tel: '',
      contratFile: null,
      contratUrl: '',
      contratName: '',
    });
    setModalType('add');
    setSelectedId(null);
  };

  // Ouvrir modal Modifier (pré-remplit formData, sans upload)
  const ouvrirModification = (idFiscal) => {
    const f = fournisseurs.find((x) => x.idFiscal === idFiscal);
    if (!f) return;
    setFormData({
      idFiscal: f.idFiscal,
      nom: f.nom,
      adresse: f.adresse,
      tel: f.tel,
      contratFile: null,
      contratUrl: f.contratUrl || '',
      contratName: f.contratName || '',
    });
    setSelectedId(idFiscal);
    setModalType('edit');
  };

  // Ouvrir modal Suppression
  const ouvrirSuppression = (idFiscal) => {
    setSelectedId(idFiscal);
    setModalType('delete');
  };

  const closeModal = () => {
    setModalType(null);
    setFormData({
      idFiscal: '',
      nom: '',
      adresse: '',
      tel: '',
      contratFile: null,
      contratUrl: '',
      contratName: '',
    });
    setSelectedId(null);
  };

  // Handle form fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'contratFile') {
      setFormData((p) => ({ ...p, contratFile: files && files[0] ? files[0] : null }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  // Soumission add / edit
  const handleSubmit = (e) => {
    e?.preventDefault?.();

    if (modalType === 'add') {
      // validation basique
      if (!formData.idFiscal.trim() || !formData.nom.trim()) {
        alert("Identifiant fiscal et Nom sont requis.");
        return;
      }

      // gérer l'upload simulé : créer URL blob si fichier fourni, sinon laisser vide
      let contratUrl = formData.contratUrl;
      let contratName = formData.contratName;
      if (formData.contratFile) {
        contratUrl = URL.createObjectURL(formData.contratFile);
        contratName = formData.contratFile.name;
      }

      // si idFiscal existe déjà, prévenir / empêcher (ou remplacer selon besoin) — ici on empêche
      if (fournisseurs.some((f) => f.idFiscal === formData.idFiscal.trim())) {
        alert("Un fournisseur avec cet identifiant fiscal existe déjà.");
        return;
      }

      const nouveau = {
        idFiscal: formData.idFiscal.trim(),
        nom: formData.nom.trim(),
        adresse: formData.adresse.trim(),
        tel: formData.tel.trim(),
        contratUrl: contratUrl || '',
        contratName: contratName || '',
      };

      setFournisseurs((prev) => [...prev, nouveau]);
      setSelectedId(nouveau.idFiscal);
      setModalType(null);
      return;
    }

    if (modalType === 'edit') {
      if (!formData.idFiscal.trim() || !formData.nom.trim()) {
        alert("Identifiant fiscal et Nom sont requis.");
        return;
      }

      setFournisseurs((prev) =>
        prev.map((f) =>
          f.idFiscal === selectedId
            ? {
                ...f,
                // On autorise la modification de l'identifiant fiscal (clé) — ici on remplace l'objet
                idFiscal: formData.idFiscal.trim(),
                nom: formData.nom.trim(),
                adresse: formData.adresse.trim(),
                tel: formData.tel.trim(),
                // contratUrl/name restent inchangés (pas d'upload en edit)
                contratUrl: f.contratUrl || '',
                contratName: f.contratName || '',
              }
            : f
        )
      );

      // Si on a modifié l'idFiscal, il faudra aussi mettre à jour selectedId pour pointer le nouveau id:
      setSelectedId(formData.idFiscal.trim());
      setModalType(null);
      return;
    }
  };

  // Suppression confirmée
  const confirmerSuppression = () => {
    if (!selectedId) return;
    setFournisseurs((prev) => prev.filter((f) => f.idFiscal !== selectedId));
    setSelectedId(null);
    setModalType(null);
  };

  // Téléchargement / ouverture du contrat (si url blob ou chemin)
  const telechargerContrat = (url, name) => {
    if (!url) {
      alert("Aucun contrat disponible.");
      return;
    }
    // Si c'est un blob URL créé par createObjectURL, on l'ouvre directement
    window.open(url, "_blank");
    // Optionnel : pour forcer le téléchargement on pourrait créer un <a download> mais on ouvre simplement
  };

  return (
    <div className="main-content" style={{ padding: '1rem' }}>
      <h2>Liste des fournisseurs</h2>

      {/* Bouton Ajouter uniquement */}
      <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={ouvrirAjout}>+ Ajouter</button>
      </div>

      {/* Tableau */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Identifiant Fiscal</th>
                  <th>Nom</th>
                  <th>Adresse</th>
                  <th>Téléphone</th>
                  <th>Contrat</th>
                  <th>Actions</th> {/* colonne actions */}
                </tr>
              </thead>
              <tbody>
                {fournisseurs.map((f) => (
                  <tr key={f.idFiscal}>
                    <td>{f.idFiscal}</td>
                    <td>{f.nom}</td>
                    <td>{f.adresse}</td>
                    <td>{f.tel}</td>
                    <td>
                      {f.contratUrl ? (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => telechargerContrat(f.contratUrl, f.contratName)}
                        >
                          📄 Télécharger contrat
                        </button>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>

                    {/* Actions par ligne : Modifier / Supprimer */}
                    <td>
                      <div style={{ display: 'flex', gap: '.5rem' }}>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            ouvrirModification(f.idFiscal);
                          }}
                          aria-label={`Modifier ${f.nom}`}
                        >
                          Modifier
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            ouvrirSuppression(f.idFiscal);
                          }}
                          aria-label={`Supprimer ${f.nom}`}
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!fournisseurs.length && (
                  <tr>
                    <td colSpan="6" className="text-center">Aucun fournisseur trouvé</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODALES */}
      {modalType && (
        <div className="overlay">
          <div className="dialog">
            {/* AJOUT */}
            {modalType === 'add' && (
              <>
                <h3>Ajouter un fournisseur</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Identifiant fiscal</label>
                    <input name="idFiscal" value={formData.idFiscal} onChange={handleChange} required />
                  </div>

                  <div className="form-group">
                    <label>Nom</label>
                    <input name="nom" value={formData.nom} onChange={handleChange} required />
                  </div>

                  <div className="form-group">
                    <label>Adresse</label>
                    <input name="adresse" value={formData.adresse} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Téléphone</label>
                    <input name="tel" value={formData.tel} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Télécharger contrat (PDF)</label>
                    <input
                      type="file"
                      name="contratFile"
                      accept="application/pdf"
                      onChange={handleChange}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '.5rem', marginTop: '.75rem' }}>
                    <button type="submit" className="btn btn-primary">Ajouter</button>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                  </div>
                </form>
              </>
            )}

            {/* MODIFIER (sans upload contrat) */}
            {modalType === 'edit' && (
              <>
                <h3>Modifier le fournisseur</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Identifiant fiscal</label>
                    <input name="idFiscal" value={formData.idFiscal} onChange={handleChange} required />
                  </div>

                  <div className="form-group">
                    <label>Nom</label>
                    <input name="nom" value={formData.nom} onChange={handleChange} required />
                  </div>

                  <div className="form-group">
                    <label>Adresse</label>
                    <input name="adresse" value={formData.adresse} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label>Téléphone</label>
                    <input name="tel" value={formData.tel} onChange={handleChange} />
                  </div>

                  {/* On affiche l'information sur le contrat existant mais pas d'upload ici */}
                  <div className="form-group">
                    <label>Contrat actuel</label>
                    <div>
                      {formData.contratUrl ? (
                        <button
                          type="button"
                          className="btn btn-link"
                          onClick={() => telechargerContrat(formData.contratUrl, formData.contratName)}
                        >
                          📄 {formData.contratName || 'Voir contrat'}
                        </button>
                      ) : (
                        <span className="text-muted">Aucun contrat</span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '.5rem', marginTop: '.75rem' }}>
                    <button type="submit" className="btn btn-primary">Enregistrer</button>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                  </div>
                </form>
              </>
            )}

            {/* SUPPRIMER */}
            {modalType === 'delete' && selectedId && (
              <>
                <h3>Confirmer la suppression</h3>
                <p>Voulez-vous vraiment supprimer le fournisseur <strong>{selectedId}</strong> ?</p>
                <div style={{ display: 'flex', gap: '.5rem', marginTop: '.5rem' }}>
                  <button className="btn btn-danger" onClick={confirmerSuppression}>Confirmer</button>
                  <button className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
