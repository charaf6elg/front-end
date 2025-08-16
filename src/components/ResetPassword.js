import React, { useState } from 'react';

export default function ResetPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    // Appel API pour changer le mot de passe
    console.log("Changement de mot de passe :", { currentPassword, newPassword });
    alert("Mot de passe mis à jour avec succès !");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="main-content" style={{ padding: "1rem" }}>
      <h2>Réinitialiser le mot de passe</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label className="form-label">Mot de passe actuel</label>
          <input
            type="password"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nouveau mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirmer le mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Mettre à jour</button>
      </form>
    </div>
  );
}
