import { notFoundResponse, optionsResponse, jsonResponse, textResponse } from "@/lib/agent/http";
import { abs, paths, SITE_NAME, SITE_URL } from "@/lib/site";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function readBody(request: Request): Promise<Record<string, string>> {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const json: unknown = await request.json();
    if (typeof json === "object" && json !== null) {
      const record = json as Record<string, unknown>;
      const result: Record<string, string> = {};
      for (const [key, value] of Object.entries(record)) {
        if (typeof value === "string") result[key] = value;
      }
      return result;
    }
    return {};
  }

  const text = await request.text();
  const params = new URLSearchParams(text);
  const result: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
}

export async function GET(_request: Request, context: RouteContext) {
  const { path } = await context.params;
  const joined = path.join("/");

  if (joined === "authorize") {
    return textResponse(
      `# ${SITE_NAME} authorization

${SITE_URL} is a public site. Reading content does not require an access token.

If an agent still wants a token, POST ${abs(paths.token)} with:

\`grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=public\`
`,
      "text/markdown; charset=utf-8",
    );
  }

  return notFoundResponse();
}

export async function POST(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const joined = path.join("/");

  if (joined === "token") {
    const body = await readBody(request);
    const grant = body.grant_type;
    if (
      grant &&
      grant !== "urn:ietf:params:oauth:grant-type:jwt-bearer" &&
      grant !== "client_credentials"
    ) {
      return jsonResponse(
        {
          error: "unsupported_grant_type",
          error_description:
            "Use urn:ietf:params:oauth:grant-type:jwt-bearer or skip tokens; this resource is public.",
        },
        "application/json; charset=utf-8",
        400,
      );
    }

    return jsonResponse({
      access_token: "public",
      token_type: "Bearer",
      expires_in: 86400,
      scope: "read",
    });
  }

  if (joined === "revoke") {
    return new Response(null, { status: 200 });
  }

  return notFoundResponse();
}

export function OPTIONS() {
  return optionsResponse();
}
