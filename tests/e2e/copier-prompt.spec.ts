import { expect, test } from "playwright/test";

test.describe("copie d'un prompt", () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  });

  test("chaque fiche expose un bouton qui copie le prompt", async ({ page }) => {
    await page.goto("/");

    const liens = await page
      .locator("ul.grille a[href^='/prompt/']")
      .evaluateAll((elements) =>
        Array.from(
          new Set(elements.map((element) => element.getAttribute("href"))),
        ).filter((href): href is string => href !== null),
      );

    expect(liens.length).toBeGreaterThan(0);

    for (const lien of liens) {
      await test.step(`Fiche ${lien}`, async () => {
        await page.goto(lien);
        await page.bringToFront();

        const texte = (await page.locator("pre.texte").textContent()) ?? "";
        expect(texte.trim().length).toBeGreaterThan(0);

        const bouton = page.getByRole("button", {
          name: "Copier le prompt",
        });
        await expect(bouton).toBeVisible();

        // Vide le presse-papiers avant de cliquer.
        await page.evaluate(() => navigator.clipboard.writeText(""));
        await expect
          .poll(() => page.evaluate(() => navigator.clipboard.readText()))
          .toBe("");

        await bouton.click();

        await expect(page.getByRole("status")).toContainText("copié");
        await expect
          .poll(async () => {
            const contenu = await page.evaluate(() =>
              navigator.clipboard.readText(),
            );
            // Windows convertit les fins de ligne en CRLF dans le presse-papiers.
            return contenu.replace(/\r\n/g, "\n");
          })
          .toBe(texte);
      });
    }
  });

  test("affiche un avertissement si le presse-papiers est inaccessible", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator.clipboard, "writeText", {
        configurable: true,
        value: () => Promise.reject(new Error("Presse-papiers refusé")),
      });
    });

    await page.goto("/");
    await page.locator("ul.grille a[href^='/prompt/']").first().click();

    await page.getByRole("button", { name: "Copier le prompt" }).click();

    await expect(
      page.getByRole("alert").filter({ hasText: "presse-papiers" }),
    ).toBeVisible();
  });
});
