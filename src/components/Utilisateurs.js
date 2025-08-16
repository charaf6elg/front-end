import React, { useState, useMemo } from "react";
import "./Utilisateurs.css";

// Données d'origine, avec roleId / agenceId
const usersInit = [
  { id: 1, nom: "El Amrani", prenom: "Sara", roleId: 2, dob: "1998-03-14", email: "sara@exemple.com", agenceId: "AG-01" },
  { id: 2, nom: "Kadiri", prenom: "Yassine", roleId: 1, dob: "1993-11-02", email: "yassine@exemple.com", agenceId: "AG-02" },
  { id: 3, nom: "Bennani", prenom: "Lina", roleId: 3, dob: "2000-06-25", email: "lina@exemple.com", agenceId: "AG-01" },
];

const ROLE_OPTIONS = ["Directeur", "Employer"];

function roleFromId(roleId) {
  // 1 = Directeur, tout le reste = Employer
  return Number(roleId) === 1 ? "Directeur" : "Employer";
}

function usernameFrom(u) {
  if (u?.email && u.email.includes("@")) return u.email.split("@")[0];
  return `${(u?.prenom || "").toLowerCase()}.${(u?.nom || "").toLowerCase()}`.replace(/\s+/g, "");
}

function formatDate(d) {
  const x = new Date(d);
  return isNaN(x) ? "" : x.toLocaleDateString("fr-FR");
}

export default function Utilisateurs() {
  // Normalise l'init: remplace roleId/agenceId par role/agence et ajoute username
  const initialUsers = useMemo(
    () =>
      usersInit.map((u) => ({
        id: u.id,
        username: usernameFrom(u),
        nom: u.nom,
        prenom: u.prenom,
        role: roleFromId(u.roleId),
        dob: u.dob,
        email: u.email,
        agence: u.agenceId,
      })),
    []
  );

  const [users, setUsers] = useState(initialUsers);
  const [selectedId, setSelectedId] = useState(null);

  // 'add' | 'edit' | 'delete' | null
  const [modalType, setModalType] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    username: "",
    nom: "",
    prenom: "",
    role: "",
    dob: "",
    email: "",
    agence: "",
  });

  const selectedUser = users.find((u) => u.id === selectedId) || null;

  const onRowClick = (id) => setSelectedId(id);

  const ouvrirAjout = () => {
    const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    setModalType("add");
    setFormData({
      id: String(nextId), // pré-rempli mais modifiable
      username: "",
      nom: "",
      prenom: "",
      role: "",
      dob: "",
      email: "",
      agence: "",
    });
  };

  const ouvrirModification = () => {
    if (!selectedUser) return;
    setModalType("edit");
    setFormData({
      id: String(selectedUser.id),
      username: selectedUser.username || "",
      nom: selectedUser.nom || "",
      prenom: selectedUser.prenom || "",
      role: selectedUser.role || "",
      dob: selectedUser.dob || "",
      email: selectedUser.email || "",
      agence: selectedUser.agence || "",
    });
  };

  const ouvrirSuppression = () => {
    if (!selectedUser) return;
    setModalType("delete");
  };

  const closeModal = () => setModalType(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();

    const payload = {
      id: Number(formData.id),
      username: formData.username.trim() || usernameFrom(formData),
      nom: formData.nom.trim(),
      prenom: formData.prenom.trim(),
      role: formData.role || "Employer",
      dob: formData.dob || "2000-01-01",
      email: formData.email.trim(),
      agence: formData.agence.trim(),
    };

    if (modalType === "add") {
      // si l'ID existe déjà, on décale au prochain dispo
      if (users.some((u) => u.id === payload.id)) {
        payload.id = Math.max(...users.map((u) => u.id)) + 1;
      }
      setUsers((prev) => [...prev, payload]);
      setSelectedId(payload.id);
    }

    if (modalType === "edit" && selectedUser) {
      setUsers((prev) => prev.map((u) => (u.id === selectedUser.id ? payload : u)));
    }

    setModalType(null);
  };

  const confirmerSuppression = () => {
    if (!selectedUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setSelectedId(null);
    setModalType(null);
  };

  return (
    <div className="main-content" style={{ padding: "1rem" }}>
      <h2>Utilisateurs</h2>

      {/* Bouton Ajouter uniquement */}
      <div style={{ display: "flex", gap: ".5rem", marginBottom: "1rem", justifyContent: "flex-end" }}>
        <button className="btn btn-primary" onClick={ouvrirAjout}>+ Ajouter</button>
      </div>

      {/* Tableau principal */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>          {/* Id utilisateur */}
                  <th>Username</th>    {/* nouvel affichage */}
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Rôle</th>        {/* rôle texte */}
                  <th>Date de naissance</th>
                  <th>Email</th>
                  <th>Agence</th>      {/* agence */}
                  <th>Actions</th>     {/* NEW */}
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
                    <td>{u.id}</td>
                    <td>{u.username}</td>
                    <td>{u.nom}</td>
                    <td>{u.prenom}</td>
                    <td>{u.role}</td>
                    <td>{formatDate(u.dob)}</td>
                    <td>{u.email}</td>
                    <td>{u.agence}</td>

                    {/* Actions par ligne */}
                    <td>
                      <div style={{ display: "flex", gap: ".5rem" }}>
                        <button
                          className="btn btn-warning"
                          style={{ padding: ".25rem .5rem" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(u.id);
                            setFormData({
                              id: String(u.id),
                              username: u.username || "",
                              nom: u.nom || "",
                              prenom: u.prenom || "",
                              role: u.role || "",
                              dob: u.dob || "",
                              email: u.email || "",
                              agence: u.agence || "",
                            });
                            setModalType("edit");
                          }}
                          aria-label={`Modifier ${u.prenom} ${u.nom}`}
                        >
                          Modifier
                        </button>

                        <button
                          className="btn btn-danger"
                          style={{ padding: ".25rem .5rem" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(u.id);
                            setModalType("delete");
                          }}
                          aria-label={`Supprimer ${u.prenom} ${u.nom}`}
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!users.length && (
                  <tr><td colSpan="9" className="text-center">Aucun utilisateur</td></tr>
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
            {modalType === "add" && (
              <>
                <h3>Ajouter un utilisateur</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Id</label>
                    <input type="number" name="id" value={formData.id} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Username</label>
                    <input name="username" value={formData.username} onChange={handleChange} placeholder="ex: s.elamrani" />
                  </div>
                  <div className="form-group">
                    <label>Nom</label>
                    <input name="nom" value={formData.nom} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Prénom</label>
                    <input name="prenom" value={formData.prenom} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Rôle</label>
                    <select name="role" value={formData.role} onChange={handleChange} required>
                      <option value="">-- Choisir un rôle --</option>
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
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
                    <label>Agence</label>
                    <input name="agence" value={formData.agence} onChange={handleChange} required />
                  </div>

                  <div style={{ display: "flex", gap: ".5rem", marginTop: ".75rem" }}>
                    <button type="submit" className="btn btn-primary">Ajouter</button>
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Annuler</button>
                  </div>
                </form>
              </>
            )}

            {/* MODIFIER */}
            {modalType === "edit" && (
              <>
                <h3>Modifier l'utilisateur</h3>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Rôle</th>
                        <th>Agence</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input type="number" name="id" value={formData.id} onChange={handleChange} />
                        </td>
                        <td>
                          <input name="username" value={formData.username} onChange={handleChange} />
                        </td>
                        <td>
                          <input name="nom" value={formData.nom} onChange={handleChange} />
                        </td>
                        <td>
                          <input name="prenom" value={formData.prenom} onChange={handleChange} />
                        </td>
                        <td>
                          <select name="role" value={formData.role} onChange={handleChange}>
                            {ROLE_OPTIONS.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input name="agence" value={formData.agence} onChange={handleChange} />
                        </td>
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

            {/* SUPPRIMER */}
            {modalType === "delete" && selectedUser && (
              <>
                <h3>Confirmer la suppression</h3>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Rôle</th>
                        <th>Agence</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{selectedUser.id}</td>
                        <td>{selectedUser.username}</td>
                        <td>{selectedUser.nom}</td>
                        <td>{selectedUser.prenom}</td>
                        <td>{selectedUser.role}</td>
                        <td>{selectedUser.agence}</td>
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
