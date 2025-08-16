import React, { useState } from "react";
import "./Utilisateurs.css";

const usersInit = [
  { id: 1, nom: "El Amrani", prenom: "Sara", roleId: 2, dob: "1998-03-14", email: "sara@exemple.com", agenceId: "AG-01" },
  { id: 2, nom: "Kadiri", prenom: "Yassine", roleId: 1, dob: "1993-11-02", email: "yassine@exemple.com", agenceId: "AG-02" },
  { id: 3, nom: "Bennani", prenom: "Lina", roleId: 3, dob: "2000-06-25", email: "lina@exemple.com", agenceId: "AG-01" },
];

function formatDate(d) {
  const x = new Date(d);
  return isNaN(x) ? "" : x.toLocaleDateString("fr-FR");
}

export default function Utilisateurs() {
  const [users, setUsers] = useState(usersInit);
  const [selectedId, setSelectedId] = useState(null);

  // add / edit / delete modal
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'delete' | null
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    roleId: "",
    dob: "",
    email: "",
    agenceId: "",
  });

  const selectedUser = users.find(u => u.id === selectedId) || null;

  const onRowClick = (id) => setSelectedId(id);

  const ouvrirAjout = () => {
    setModalType("add");
    setFormData({ nom: "", prenom: "", roleId: "", dob: "", email: "", agenceId: "" });
  };

  const ouvrirModification = () => {
    if (!selectedUser) return;
    setModalType("edit");
    setFormData({
      nom: selectedUser.nom,
      prenom: selectedUser.prenom,
      roleId: String(selectedUser.roleId),
      dob: selectedUser.dob,
      email: selectedUser.email,
      agenceId: selectedUser.agenceId,
    });
  };

  const ouvrirSuppression = () => {
    if (!selectedUser) return;
    setModalType("delete"); // affichera le tableau en lecture seule
  };

  const closeModal = () => setModalType(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();

    if (modalType === "add") {
      const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      const nouveau = {
        id: newId,
        nom: formData.nom.trim(),
        prenom: formData.prenom.trim(),
        roleId: Number(formData.roleId),
        dob: formData.dob || "2000-01-01",
        email: formData.email.trim(),
        agenceId: formData.agenceId.trim(),
      };
      setUsers((prev) => [...prev, nouveau]);
      setSelectedId(newId);
    }

    if (modalType === "edit" && selectedUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUser.id
            ? {
                ...u,
                nom: formData.nom.trim(),
                prenom: formData.prenom.trim(),
                roleId: Number(formData.roleId),
                agenceId: formData.agenceId.trim(),
              }
            : u
        )
      );
    }

    setModalType(null);
  };

  const confirmerSuppression = () => {
    if (!selectedUser) return;
    setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
    setSelectedId(null);
    setModalType(null);
  };

  return (
    <div className="main-content" style={{ padding: "1rem" }}>
      <h2>Utilisateurs</h2>

      {/* Boutons */}
      <div style={{ display: "flex", gap: ".5rem", marginBottom: "1rem", justifyContent: "flex-end" }}>
        <button className="btn btn-primary" onClick={ouvrirAjout}>+ Ajouter</button>
        <button className="btn btn-warning" onClick={ouvrirModification} disabled={!selectedId}>Modifier</button>
        <button className="btn btn-danger" onClick={ouvrirSuppression} disabled={!selectedId}>Supprimer</button>
      </div>

      {/* Tableau principal */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Id rôle</th>
                  <th>Date de naissance</th>
                  <th>Email</th>
                  <th>Id Agence</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    onClick={() => onRowClick(u.id)}
                    style={{
                      cursor: "pointer",
                      background: selectedId === u.id ? "rgba(13,110,253,.08)" : "transparent",
                    }}
                  >
                    <td>{u.nom}</td>
                    <td>{u.prenom}</td>
                    <td>{u.roleId}</td>
                    <td>{formatDate(u.dob)}</td>
                    <td>{u.email}</td>
                    <td>{u.agenceId}</td>
                  </tr>
                ))}
                {!users.length && (
                  <tr><td colSpan="6" className="text-center">Aucun utilisateur</td></tr>
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
            {/* AJOUT : formulaire classique */}
            {modalType === "add" && (
              <>
                <h3>Ajouter un utilisateur</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Nom</label>
                    <input name="nom" value={formData.nom} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Prénom</label>
                    <input name="prenom" value={formData.prenom} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Id rôle</label>
                    <input type="number" name="roleId" value={formData.roleId} onChange={handleChange} min="1" required />
                  </div>
                  <div className="form-group">
                    <label>Date de naissance</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Id agence</label>
                    <input name="agenceId" value={formData.agenceId} onChange={handleChange} required />
                  </div>
                  <div style={{ display: "flex", gap: ".5rem", marginTop: ".75rem" }}>
                    <button type="submit" className="btn btn-primary">Ajouter</button>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                  </div>
                </form>
              </>
            )}

            {/* MODIFIER : tableau éditable */}
            {modalType === "edit" && (
              <>
                <h3>Modifier l'utilisateur</h3>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Id rôle</th>
                        <th>Agence</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input name="nom" value={formData.nom} onChange={handleChange} /></td>
                        <td><input name="prenom" value={formData.prenom} onChange={handleChange} /></td>
                        <td><input type="number" name="roleId" value={formData.roleId} onChange={handleChange} min="1" /></td>
                        <td><input name="agenceId" value={formData.agenceId} onChange={handleChange} /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ display: "flex", gap: ".5rem", marginTop: ".5rem" }}>
                  <button className="btn btn-primary" onClick={handleSubmit}>Enregistrer</button>
                  <button className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                </div>
              </>
            )}

            {/* SUPPRIMER : tableau lecture seule */}
            {modalType === "delete" && selectedUser && (
              <>
                <h3>Confirmer la suppression</h3>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Id rôle</th>
                        <th>Agence</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{selectedUser.nom}</td>
                        <td>{selectedUser.prenom}</td>
                        <td>{selectedUser.roleId}</td>
                        <td>{selectedUser.agenceId}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ display: "flex", gap: ".5rem", marginTop: ".5rem" }}>
                  <button className="btn btn-danger" onClick={confirmerSuppression}>Confirmer la suppression</button>
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
