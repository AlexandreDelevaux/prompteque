"use client";

import Link from "next/link";
import { useState } from "react";
import { rechercher } from "@/lib/recherche";
import type { Ressource } from "@/lib/types";

export default function Catalogue({
  titre,
  intro,
  badge,
  base,
  placeholder,
  ressources,
}: {
  titre: string;
  intro: string;
  badge: string;
  base: string;
  placeholder: string;
  ressources: Ressource[];
}) {
  const [requete, setRequete] = useState("");
  const resultats = rechercher(ressources, requete);

  return (
    <section>
      <h1>{titre}</h1>
      <p className="intro">{intro}</p>
      <input
        type="search"
        className="champ"
        placeholder={placeholder}
        aria-label={`Chercher dans ${titre}`}
        value={requete}
        onChange={(e) => setRequete(e.target.value)}
      />
      <p className="compteur">
        {resultats.length} fiche{resultats.length > 1 ? "s" : ""}
      </p>
      {resultats.length === 0 ? (
        <p className="vide">
          Aucune fiche ne correspond à « {requete.trim()} ».
        </p>
      ) : (
        <ul className="grille">
          {resultats.map((ressource) => (
            <li key={ressource.id} className="carte">
              <Link href={`${base}/${ressource.id}`}>
                <span className="badge">{badge}</span>
                <h2>{ressource.titre}</h2>
                <p className="extrait">{ressource.description}</p>
                <p className="tags">
                  {ressource.tags.map((tag) => `#${tag}`).join(" ")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
