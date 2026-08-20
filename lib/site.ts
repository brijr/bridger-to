export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://bridger.to"
).replace(/\/$/, "");

export const SITE_NAME = "Bridger Tower";
export const SITE_VERSION = "0.1.0";
export const CONTACT_EMAIL = "bt@wip.is";

export const paths = {
  home: "/",
  about: "/about",
  contact: "/contact",
  posts: "/posts",
  work: "/work",
  workWithMe: "/work-with-me",
  apiCatalog: "/.well-known/api-catalog",
  aiCatalog: "/.well-known/ai-catalog.json",
  mcpCard: "/.well-known/mcp/server-card.json",
  oauthAuthorizationServer: "/.well-known/oauth-authorization-server",
  oauthProtectedResource: "/.well-known/oauth-protected-resource",
  openidConfiguration: "/.well-known/openid-configuration",
  jwks: "/.well-known/jwks.json",
  skillsIndex: "/.well-known/agent-skills/index.json",
  skill: "/.well-known/agent-skills/bridger-to/SKILL.md",
  openapi: "/openapi.json",
  llms: "/llms.txt",
  authMd: "/auth.md",
  mcp: "/mcp",
  health: "/api/health",
  postsApi: "/api/posts",
  subscribe: "/api/subscribe",
  bookmark: "/api/bookmark",
  postTitle: "/api/post-title",
  docsApi: "/docs/api",
  authorize: "/oauth/authorize",
  token: "/oauth/token",
  revoke: "/oauth/revoke",
  identity: "/agent/identity",
  claim: "/agent/identity/claim",
  sitemap: "/sitemap.xml",
  robots: "/robots.txt",
} as const;

export function abs(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${SITE_URL}${path}`;
}

export const CONTENT_SIGNAL = "ai-train=yes, search=yes, ai-input=yes";

export function linkHeaderValue(): string {
  return [
    `<${abs(paths.apiCatalog)}>; rel="api-catalog"; type="application/linkset+json"`,
    `<${abs(paths.openapi)}>; rel="service-desc"; type="application/json"`,
    `<${abs(paths.docsApi)}>; rel="service-doc"; type="text/markdown"`,
    `<${abs(paths.llms)}>; rel="describedby"; type="text/plain"`,
    `<${abs(paths.aiCatalog)}>; rel="ai-catalog"; type="application/json"`,
    `<${abs(paths.mcpCard)}>; rel="describedby"; type="application/json"`,
  ].join(", ");
}
