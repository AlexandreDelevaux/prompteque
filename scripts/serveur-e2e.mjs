import { spawn } from "node:child_process";
import { rmSync } from "node:fs";
import path from "node:path";

// Chaque campagne e2e repart d'un cache propre : le serveur de développement
// est arrêté par Playwright, ce qui peut laisser un .next partiel derrière lui.
const dossier = ".next-e2e";
rmSync(path.join(process.cwd(), dossier), { recursive: true, force: true });

const nextBin = path.join(
  process.cwd(),
  "node_modules",
  "next",
  "dist",
  "bin",
  "next",
);

const enfant = spawn(process.execPath, [nextBin, "dev"], {
  stdio: "inherit",
  env: { ...process.env, NEXT_DIST_DIR: dossier },
});

enfant.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 0);
});
