/** Coût d'envoi d'un prompt, en dollars. Les tarifs sont donnés par million de tokens. */
export function coutEnvoi(tokens: number, prixParMillion: number): number {
  return (tokens / 1_000) * prixParMillion;
}
