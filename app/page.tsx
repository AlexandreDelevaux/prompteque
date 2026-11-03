import Recherche from "@/components/Recherche";
import { prompts } from "@/lib/prompts";

export default function Accueil() {
  return (
    <>
      <h1>Vos prompts, rangés</h1>
      <p className="intro">
        Les prompts de la semaine 1, recopiés des ateliers. Cherchez par mot,
        par outil ou par tag. Le menu latéral range aussi les MCP, les commandes
        et les skills.
      </p>
      <Recherche prompts={prompts} />
    </>
  );
}
