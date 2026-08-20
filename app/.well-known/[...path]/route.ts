import { authMarkdown } from "@/lib/agent/auth-md";
import {
  agentSkillsIndex,
  aiCatalog,
  apiCatalog,
  jwks,
  mcpServerCard,
  oauthAuthorizationServer,
  oauthProtectedResource,
  openidConfiguration,
} from "@/lib/agent/documents";
import {
  headResponse,
  jsonResponse,
  notFoundResponse,
  optionsResponse,
  textResponse,
} from "@/lib/agent/http";
import { SKILL_MARKDOWN } from "@/lib/agent/skill";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

function documentFor(path: string): Response | null {
  switch (path) {
    case "api-catalog":
      return jsonResponse(
        apiCatalog(),
        'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
      );
    case "ai-catalog.json":
      return jsonResponse(aiCatalog());
    case "oauth-authorization-server":
      return jsonResponse(oauthAuthorizationServer());
    case "oauth-protected-resource":
      return jsonResponse(oauthProtectedResource());
    case "openid-configuration":
      return jsonResponse(openidConfiguration());
    case "jwks.json":
      return jsonResponse(jwks());
    case "mcp/server-card.json":
      return jsonResponse(mcpServerCard());
    case "agent-skills/index.json":
      return jsonResponse(agentSkillsIndex());
    case "agent-skills/bridger-to/SKILL.md":
      return textResponse(SKILL_MARKDOWN, "text/markdown; charset=utf-8");
    case "oauth-protected-resource/auth.md":
      return textResponse(authMarkdown(), "text/markdown; charset=utf-8");
    default:
      return null;
  }
}

function contentTypeFor(path: string): string {
  if (path === "api-catalog") {
    return 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"';
  }
  if (path.endsWith(".md")) {
    return "text/markdown; charset=utf-8";
  }
  return "application/json; charset=utf-8";
}

export async function GET(_request: Request, context: RouteContext) {
  const { path } = await context.params;
  const joined = path.join("/");
  return documentFor(joined) ?? notFoundResponse();
}

export async function HEAD(_request: Request, context: RouteContext) {
  const { path } = await context.params;
  const joined = path.join("/");
  if (!documentFor(joined)) {
    return notFoundResponse();
  }
  return headResponse(contentTypeFor(joined));
}

export function OPTIONS() {
  return optionsResponse();
}
