import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prompthèque",
  description: "Les prompts de la semaine 1, rangés et cherchables.",
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
          <span className="sous-titre">Les prompts de la semaine 1</span>
        </header>
        <main>{children}</main>
        <footer className="pied">
          Formation Agents IA pour le développement · jour 6
        </footer>
      </body>
    </html>
  );
}
