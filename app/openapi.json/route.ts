import { openApiDocument } from "@/lib/agent/documents";
import { jsonResponse } from "@/lib/agent/http";

export function GET() {
  return jsonResponse(openApiDocument());
}
