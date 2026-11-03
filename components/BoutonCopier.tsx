"use client";

import { useEffect, useState } from "react";

export default function BoutonCopier({
  texte,
  libelle = "Copier le prompt",
}: {
  texte: string;
  libelle?: string;
}) {
  const [copie, setCopie] = useState(false);
  const [erreur, setErreur] = useState(false);

  // Signale tout de suite un accès déjà refusé, sans attendre le clic.
  useEffect(() => {
    if (!navigator.clipboard) {
      setErreur(true);
      return;
    }

    navigator.permissions
      ?.query({ name: "clipboard-write" as PermissionName })
      .then((statut) => setErreur(statut.state === "denied"))
      .catch(() => {
        // Certains navigateurs ne savent pas interroger cette permission.
      });
  }, []);

  async function copier() {
    setCopie(false);

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Presse-papiers indisponible");
      }

      await navigator.clipboard.writeText(texte);
      setErreur(false);
      setCopie(true);
    } catch {
      setErreur(true);
    }
  }

  return (
    <div className="copier-prompt">
      <button type="button" className="bouton-copier" onClick={copier}>
        {copie ? "Copié !" : libelle}
      </button>

      {copie && (
        <p className="copie-reussie" role="status">
          Contenu copié dans le presse-papiers.
        </p>
      )}

      {erreur && (
        <p className="alerte" role="alert">
          Le presse-papiers n&apos;est pas accessible. Autorisez son accès dans
          votre navigateur, puis réessayez.
        </p>
      )}
    </div>
  );
}
