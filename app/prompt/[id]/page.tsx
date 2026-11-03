import Link from "next/link";
import { notFound } from "next/navigation";
import BoutonCopier from "@/components/BoutonCopier";
import { coutEnvoi } from "@/lib/cout";
import { MODELES } from "@/lib/modeles";
import { prompts, trouverPrompt } from "@/lib/prompts";
import { estimerTokens } from "@/lib/tokens";

const dollars = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  maximumSignificantDigits: 2,
});

export function generateStaticParams() {
  return prompts.map((p) => ({ id: p.id }));
}

export default async function PagePrompt({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prompt = trouverPrompt(id);
  if (!prompt) notFound();

  const tokens = estimerTokens(prompt.texte);

  return (
    <article className="detail">
      <Link href="/" className="retour">
        ← Tous les prompts
      </Link>
      <span className="badge">Jour {prompt.jour}</span>
      <h1>{prompt.titre}</h1>
      <p className="tags">
        {prompt.tags.map((t) => `#${t}`).join(" ")} · {prompt.source}
      </p>
      <pre className="texte">{prompt.texte}</pre>
      <BoutonCopier texte={prompt.texte} />

      <h2>Ce que coûte un envoi</h2>
      <p>≈ {tokens} tokens (1 token ≈ 4 caractères)</p>
      <table className="couts">
        <thead>
          <tr>
            <th>Modèle</th>
            <th>Prix d'entrée</th>
            <th>Cet envoi</th>
          </tr>
        </thead>
        <tbody>
          {MODELES.map((m) => (
            <tr key={m.id}>
              <td>{m.nom}</td>
              <td>
                {dollars.format(m.prixEntreeParMillion)} le million de tokens
              </td>
              <td>
                {dollars.format(coutEnvoi(tokens, m.prixEntreeParMillion))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="note">
        Tarifs OpenCode Zen relevés le 31/10/2026. Avec les modèles gratuits
        d'OpenCode, vous ne payez rien.
      </p>
    </article>
  );
}
