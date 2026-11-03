export type Prompt = {
  id: string;
  titre: string;
  jour: number;
  tags: string[];
  texte: string;
  source: string;
};

export type Ressource = {
  id: string;
  titre: string;
  description: string;
  tags: string[];
  contenu: string;
  source: string;
};

export type TypeRessource = "mcp" | "commandes" | "skills";
