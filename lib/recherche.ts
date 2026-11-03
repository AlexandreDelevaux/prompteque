type Cherchable = {
  titre: string;
  tags: string[];
  texte?: string;
  description?: string;
  contenu?: string;
};

/** Filtre une liste sur le titre, le texte, la description, le contenu et les tags. */
export function rechercher<T extends Cherchable>(
  liste: T[],
  requete: string,
): T[] {
  const q = requete.trim().toLowerCase();
  if (q === "") return liste;
  return liste.filter((element) => {
    const corps = [element.texte, element.description, element.contenu]
      .filter((valeur): valeur is string => Boolean(valeur))
      .join(" ")
      .toLowerCase();

    return (
      element.titre.toLowerCase().includes(q) ||
      corps.includes(q) ||
      element.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });
}
