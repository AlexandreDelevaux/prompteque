"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Lien = {
  href: string;
  libelle: string;
  pastille: string;
  compte: number;
};

export default function MenuLateral({
  comptes,
}: {
  comptes: Record<string, number>;
}) {
  const chemin = usePathname();

  const liens: Lien[] = [
    { href: "/", libelle: "Prompts", pastille: "P", compte: comptes.prompts },
    { href: "/mcp", libelle: "MCP", pastille: "M", compte: comptes.mcp },
    {
      href: "/commandes",
      libelle: "Commandes",
      pastille: "C",
      compte: comptes.commandes,
    },
    { href: "/skills", libelle: "Skills", pastille: "S", compte: comptes.skills },
  ];

  return (
    <aside className="menu-lateral">
      <nav aria-label="Sections de la Prompthèque">
        <p className="menu-titre">Explorer</p>
        <ul>
          {liens.map((lien) => {
            const actif =
              lien.href === "/"
                ? chemin === "/" || chemin.startsWith("/prompt/")
                : chemin.startsWith(lien.href);

            return (
              <li key={lien.href}>
                <Link
                  href={lien.href}
                  className={actif ? "menu-lien actif" : "menu-lien"}
                  aria-current={actif ? "page" : undefined}
                >
                  <span className="menu-pastille" aria-hidden="true">
                    {lien.pastille}
                  </span>
                  <span className="menu-libelle">{lien.libelle}</span>
                  <span className="menu-compte">{lien.compte}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
