"use client";

import Link from "next/link";
import { useState } from "react";
import { rechercher } from "@/lib/recherche";
import type { Prompt } from "@/lib/types";

function extrait(texte: string): string {
  return texte.length > 140 ? `${texte.slice(0, 140)}…` : texte;
}

export default function Recherche({ prompts }: { prompts: Prompt[] }) {
  const [requete, setRequete] = useState("");
  const resultats = rechercher(prompts, requete);

  return (
    <section>
      <input
        type="search"
        className="champ"
        placeholder="Chercher : gitleaks, sécurité, vercel…"
        aria-label="Chercher un prompt"
        value={requete}
        onChange={(e) => setRequete(e.target.value)}
      />
      <p className="compteur">
        {resultats.length} prompt{resultats.length > 1 ? "s" : ""}
      </p>
      {resultats.length === 0 ? (
        <p className="vide">
          Aucun prompt ne correspond à « {requete.trim()} ».
        </p>
      ) : (
        <ul className="grille">
          {resultats.map((p) => (
            <li key={p.id} className="carte">
              <Link href={`/prompt/${p.id}`}>
                <span className="badge">Jour {p.jour}</span>
                <h2>{p.titre}</h2>
                <p className="extrait">{extrait(p.texte)}</p>
                <p className="tags">{p.tags.map((t) => `#${t}`).join(" ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
