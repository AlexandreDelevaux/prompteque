import { execFileSync, execSync, spawn } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const base = process.env.CAPTURE_URL ?? "http://localhost:3000";
const racine = process.env.CAPTURE_DIR ?? "captures";
const dossierBuild = ".next-captures";
const maintenant = new Date();
const deux = (valeur) => String(valeur).padStart(2, "0");
const horodatage = `${maintenant.getFullYear()}/${deux(maintenant.getMonth() + 1)}/${deux(maintenant.getDate())}/${deux(maintenant.getHours())}${deux(maintenant.getMinutes())}${deux(maintenant.getSeconds())}`;
const dossier = path.join(racine, ...horodatage.split("/"));

const lireDonnees = async (nom) =>
  JSON.parse(await readFile(path.join("data", `${nom}.json`), "utf8"));

const [mcps, commandes, skills] = await Promise.all([
  lireDonnees("mcp"),
  lireDonnees("commandes"),
  lireDonnees("skills"),
]);

const dernier = (liste) => liste[liste.length - 1].id;

const pages = [
  { chemin: "/", nom: "01-accueil", mobile: true },
  { chemin: "/mcp", nom: "02-mcp", mobile: true },
  { chemin: `/mcp/${mcps[0].id}`, nom: "03-mcp-detail", mobile: false },
  { chemin: "/commandes", nom: "04-commandes", mobile: true },
  {
    chemin: `/commandes/${dernier(commandes)}`,
    nom: "05-commande-detail",
    mobile: false,
  },
  { chemin: "/skills", nom: "06-skills", mobile: true },
  {
    chemin: `/skills/${dernier(skills)}`,
    nom: "07-skill-detail",
    mobile: false,
  },
];

const formats = [
  { suffixe: "desktop", viewport: { width: 1440, height: 1000 }, mobile: false },
  { suffixe: "mobile", viewport: { width: 390, height: 844 }, mobile: true },
];

function git(...arguments_) {
  try {
    return execFileSync("git", arguments_, { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

async function lirePage(url) {
  try {
    const reponse = await fetch(url, { signal: AbortSignal.timeout(3000) });
    return reponse.ok ? await reponse.text() : null;
  } catch {
    return null;
  }
}

async function attendreServeur() {
  for (let tentative = 0; tentative < 120; tentative += 1) {
    const html = await lirePage(base);
    if (html?.includes("Prompthèque")) return true;
    await new Promise((resolution) => setTimeout(resolution, 1000));
  }
  return false;
}

let serveur = null;
let html = await lirePage(base);

if (!html?.includes("Prompthèque")) {
  const nextBin = path.join(
    process.cwd(),
    "node_modules",
    "next",
    "dist",
    "bin",
    "next",
  );
  await rm(path.join(process.cwd(), dossierBuild), {
    recursive: true,
    force: true,
  });
  serveur = spawn(process.execPath, [nextBin, "dev"], {
    stdio: "ignore",
    windowsHide: true,
    env: { ...process.env, NEXT_DIST_DIR: dossierBuild },
  });

  if (!(await attendreServeur())) {
    throw new Error(
      `Impossible de joindre ${base} : le serveur de développement n'a pas démarré.`,
    );
  }
}

const captures = [];

await mkdir(dossier, { recursive: true });

try {
  const navigateur = await chromium.launch();

  try {
    for (const format of formats) {
      const contexte = await navigateur.newContext({
        viewport: format.viewport,
        locale: "fr-FR",
        reducedMotion: "reduce",
      });
      const page = await contexte.newPage();

      for (const cible of pages) {
        if (format.mobile && !cible.mobile) continue;

        await page.goto(`${base}${cible.chemin}`, {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        });
        await page.locator("h1").first().waitFor({ timeout: 15000 });
        await page.addStyleTag({
          content: "nextjs-portal { display: none !important; }",
        });
        await page.waitForTimeout(300);

        const fichier = `${cible.nom}-${format.suffixe}.png`;
        await page.screenshot({
          path: path.join(dossier, fichier),
          fullPage: true,
        });

        captures.push({
          page: cible.chemin,
          format: format.suffixe,
          fichier,
          largeur: format.viewport.width,
          hauteur: format.viewport.height,
        });
      }

      await contexte.close();
    }
  } finally {
    await navigateur.close();
  }
} finally {
  if (serveur) {
    if (process.platform === "win32") {
      try {
        execSync(`taskkill /PID ${serveur.pid} /T /F`, { stdio: "ignore" });
      } catch {
        // Le serveur est déjà arrêté.
      }
    } else {
      serveur.kill("SIGTERM");
    }
    await rm(path.join(process.cwd(), dossierBuild), {
      recursive: true,
      force: true,
    });
  }
}

const manifeste = {
  date: maintenant.toISOString(),
  commit: git("rev-parse", "HEAD"),
  branche: git("branch", "--show-current"),
  url: base,
  dossier: dossier.split(path.sep).join("/"),
  captures,
};

await mkdir(dossier, { recursive: true });
await writeFile(
  path.join(dossier, "manifeste.json"),
  `${JSON.stringify(manifeste, null, 2)}\n`,
  "utf8",
);

const fichierIndex = path.join(racine, "index.json");
let index = [];
try {
  index = JSON.parse(await readFile(fichierIndex, "utf8"));
} catch {
  index = [];
}

index.push({
  date: manifeste.date,
  commit: manifeste.commit,
  branche: manifeste.branche,
  dossier: manifeste.dossier,
  nombre: captures.length,
});

await writeFile(fichierIndex, `${JSON.stringify(index, null, 2)}\n`, "utf8");

console.log(`Captures enregistrées dans ${manifeste.dossier}`);
console.log(`${captures.length} images et 1 manifeste.`);
console.log(`Index mis à jour : ${fichierIndex.split(path.sep).join("/")}`);
