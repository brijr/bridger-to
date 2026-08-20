import { apiDocsMarkdown } from "@/lib/agent/documents";
import { textResponse } from "@/lib/agent/http";

export function GET() {
  return textResponse(apiDocsMarkdown(), "text/markdown; charset=utf-8");
}
