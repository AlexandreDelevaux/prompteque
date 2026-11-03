export type Modele = {
  id: string;
  nom: string;
  prixEntreeParMillion: number;
};

// Tarifs d'entrée, en dollars par million de tokens, relevés le 31/10/2026
// sur https://opencode.ai/docs/zen (OpenCode Zen, paiement à l'usage).
// Les modèles gratuits d'OpenCode (glm-5.3-flash-free, deepseek-v4.1-flash-free) ne coûtent rien.
export const MODELES: Modele[] = [
  {
    id: "deepseek-v4.1-flash",
    nom: "DeepSeek V4.1 Flash",
    prixEntreeParMillion: 0.3,
  },
  {
    id: "claude-sonnet-5-5",
    nom: "Claude Sonnet 5.5",
    prixEntreeParMillion: 2,
  },
  { id: "claude-opus-5-5", nom: "Claude Opus 5.5", prixEntreeParMillion: 4 },
];
