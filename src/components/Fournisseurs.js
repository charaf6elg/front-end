import React, { useState } from 'react';
import './Responsable.css'; // réutilise ton style table/card

const fournisseursInitial = [
  { idFiscal: "FR123456", nom: "ABC Fournitures", adresse: "12 Rue du Marché, Paris", tel: "01 23 45 67 89", contratUrl: "/contrats/contrat1.pdf" },
  { idFiscal: "FR654321", nom: "Office Pro", adresse: "8 Avenue de la République, Lyon", tel: "04 56 78 90 12", contratUrl: "/contrats/contrat2.pdf" },
  { idFiscal: "FR987654", nom: "Papeterie Express", adresse: "25 Boulevard Voltaire, Marseille", tel: "05 67 89 01 23", contratUrl: "/contrats/contrat3.pdf" }
];

export default function Fournisseurs() {
  const [fournisseurs] = useState(fournisseursInitial);

  const telechargerContrat = (url) => {
    // Ici on simule le téléchargement, mais en prod tu dois avoir un vrai lien vers un fichier
    window.open(url, "_blank");
  };

  return (
    <div className="main-content" style={{ padding: "1rem" }}>
      <h2>Liste des fournisseurs</h2>

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
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => telechargerContrat(f.contratUrl)}
                      >
                        📄 Télécharger contrat
                      </button>
                    </td>
                  </tr>
                ))}
                {!fournisseurs.length && (
                  <tr>
                    <td colSpan="5" className="text-center">Aucun fournisseur trouvé</td>
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
