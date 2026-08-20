import { mcpServerCard } from "@/lib/agent/documents";
import { handleMcpRequest } from "@/lib/agent/mcp";
import {
  discoveryHeaders,
  jsonResponse,
  optionsResponse,
} from "@/lib/agent/http";

export async function GET() {
  return jsonResponse(mcpServerCard());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error" },
      }),
      {
        status: 400,
        headers: discoveryHeaders("application/json; charset=utf-8"),
      },
    );
  }

  const response = handleMcpRequest(body);
  if (!response) {
    return new Response(null, {
      status: 202,
      headers: discoveryHeaders("application/json; charset=utf-8"),
    });
  }

  return new Response(`${JSON.stringify(response)}\n`, {
    status: 200,
    headers: discoveryHeaders("application/json; charset=utf-8"),
  });
}

export function OPTIONS() {
  return optionsResponse();
}
