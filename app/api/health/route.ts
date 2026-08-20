import { jsonResponse } from "@/lib/agent/http";

export function GET() {
  return jsonResponse({
    status: "ok",
    time: new Date().toISOString(),
  });
}
