import Link from "next/link";

export default function PageIntrouvable() {
  return (
    <article className="detail">
      <Link href="/" className="retour">
        ← Tous les prompts
      </Link>
      <h1>Prompt introuvable</h1>
      <p className="intro">
        Cette adresse ne correspond à aucun prompt de la Prompthèque.
      </p>
    </article>
  );
}
