import type { Metadata } from "next";
import Link from "next/link";
import MenuLateral from "@/components/MenuLateral";
import { prompts } from "@/lib/prompts";
import { ressources } from "@/lib/ressources";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prompthèque",
  description:
    "Les prompts, les MCP, les commandes et les skills de la formation, rangés et cherchables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <header className="entete">
          <Link href="/" className="marque">
            Prompthèque
          </Link>
          <span className="sous-titre">
            Prompts, MCP, commandes et skills de la formation
          </span>
        </header>
        <div className="disposition">
          <MenuLateral
            comptes={{
              prompts: prompts.length,
              mcp: ressources.mcp.length,
              commandes: ressources.commandes.length,
              skills: ressources.skills.length,
            }}
          />
          <main>{children}</main>
        </div>
        <footer className="pied">
          Formation Agents IA pour le développement · jour 6
        </footer>
      </body>
    </html>
  );
}
