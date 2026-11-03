import donnees from "../data/prompts.json";
import type { Prompt } from "./types";

export const prompts: Prompt[] = donnees;

export function trouverPrompt(id: string): Prompt | undefined {
  return prompts.find((p) => p.id === id);
}
