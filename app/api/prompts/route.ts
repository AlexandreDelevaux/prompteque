import { prompts } from "@/lib/prompts";

export function GET() {
  return Response.json(prompts);
}
