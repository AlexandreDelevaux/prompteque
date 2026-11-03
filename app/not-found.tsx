import Link from "next/link";

export default function PageIntrouvable() {
  return (
    <article className="detail">
      <Link href="/" className="retour">
        ← Retour à la Prompthèque
      </Link>
      <h1>Page introuvable</h1>
      <p className="intro">
        Cette adresse ne correspond à aucune fiche de la Prompthèque.
      </p>
    </article>
  );
}
