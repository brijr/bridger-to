import { robotsTxt } from "@/lib/agent/documents";
import { textResponse } from "@/lib/agent/http";

export function GET() {
  return textResponse(robotsTxt(), "text/plain; charset=utf-8");
}
