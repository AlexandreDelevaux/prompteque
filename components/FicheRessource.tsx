import Link from "next/link";
import BoutonCopier from "@/components/BoutonCopier";
import type { Ressource } from "@/lib/types";

export default function FicheRessource({
  ressource,
  retour,
  libelleRetour,
  libelleCopier,
}: {
  ressource: Ressource;
  retour: string;
  libelleRetour: string;
  libelleCopier: string;
}) {
  return (
    <article className="detail">
      <Link href={retour} className="retour">
        ← {libelleRetour}
      </Link>
      <h1>{ressource.titre}</h1>
      <p className="tags">
        {ressource.tags.map((tag) => `#${tag}`).join(" ")} · {ressource.source}
      </p>
      <p className="intro">{ressource.description}</p>
      <pre className="texte">{ressource.contenu}</pre>
      <BoutonCopier texte={ressource.contenu} libelle={libelleCopier} />
    </article>
  );
}
