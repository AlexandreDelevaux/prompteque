import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Les captures utilisent un dossier de build séparé pour ne pas corrompre
  // le cache de développement quand leur serveur est arrêté.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default nextConfig;
