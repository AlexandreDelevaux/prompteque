/** Estimation rapide : 1 token ≈ 4 caractères (règle vue au Jour 5). */
export function estimerTokens(texte: string): number {
  const mots = texte.trim().split(/\s+/).filter(Boolean);
  return Math.ceil(mots.length / 4);
}
