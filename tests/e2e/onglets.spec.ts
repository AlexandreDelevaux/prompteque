import { expect, test } from "playwright/test";

const onglets = [
  { chemin: "/mcp", titre: "Serveurs MCP", libelle: "MCP" },
  { chemin: "/commandes", titre: "Commandes", libelle: "Commandes" },
  { chemin: "/skills", titre: "Skills", libelle: "Skills" },
];

test.describe("menu latéral", () => {
  test("mène aux quatre onglets", async ({ page }) => {
    await page.goto("/");

    for (const onglet of onglets) {
      const lien = page.getByRole("link", {
        name: new RegExp(`${onglet.libelle}`),
      });
      await expect(lien).toBeVisible();
      await lien.click();
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        onglet.titre,
      );
      await expect(
        page.locator("aside a[aria-current='page']"),
      ).toContainText(onglet.libelle);
    }
  });

  test("chaque onglet ouvre une fiche copiable", async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    for (const onglet of onglets) {
      await page.goto(onglet.chemin);

      const premiere = page.locator("ul.grille a").first();
      await expect(premiere).toBeVisible();
      await premiere.click();

      const bouton = page.getByRole("button", { name: /Copier/ });
      await expect(bouton).toBeVisible();
      await bouton.click();
      await expect(page.getByRole("status")).toContainText("copié");
    }
  });

  test("les fiches d'inspection sont accessibles", async ({ page }) => {
    await page.goto("/commandes");
    await page
      .getByRole("link", { name: /Inspection des travaux finis/ })
      .click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Inspection des travaux finis",
    );
    await expect(page.locator("pre.texte")).toContainText("sous-agent");

    await page.goto("/skills");
    await page.getByRole("link", { name: /Inspection visuelle/ }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Inspection visuelle",
    );
    await expect(page.locator("pre.texte")).toContainText("run captures");
  });
});
