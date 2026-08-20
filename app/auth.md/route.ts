import { authMarkdown } from "@/lib/agent/auth-md";
import { textResponse } from "@/lib/agent/http";

export function GET() {
  return textResponse(authMarkdown(), "text/markdown; charset=utf-8");
}
