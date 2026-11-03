import { estTypeRessource, ressources } from "@/lib/ressources";

export function generateStaticParams() {
  return Object.keys(ressources).map((type) => ({ type }));
}

export async function GET(
  _requete: Request,
  { params }: { params: Promise<{ type: string }> },
) {
  const { type } = await params;

  if (!estTypeRessource(type)) {
    return Response.json({ erreur: "Type de ressource inconnu" }, { status: 404 });
  }

  return Response.json(ressources[type]);
}
