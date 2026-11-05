import { describe, expect, it } from "vitest";
import { estimerTokens } from "../lib/tokens";

// La promesse, écrite au-dessus d'estimerTokens et sur la page d'un prompt : « 1 token ≈ 4 caractères ».
describe("estimerTokens", () => {
  it("compte 1 token pour 4 caractères", () => {
    expect(estimerTokens("abcd".repeat(10))).toBe(10);
  });

  it("« un deux trois quatre » : 20 caractères, espaces compris, donc 5 tokens", () => {
    expect(estimerTokens("un deux trois quatre")).toBe(5);
  });
});
