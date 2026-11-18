export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://bridger.to"
).replace(/\/$/, "");

export const SITE_NAME = "Bridger Tower";
export const SITE_VERSION = "0.1.0";
export const CONTACT_EMAIL = "bt@wip.is";

// Short positioning line, used wherever a one-line descriptor appears.
export const SITE_TAGLINE = "applied design ✴︎ applied AI";

// Long version: the home page bio.
export const SITE_BIO =
  "Designer and software engineer focused on how design shapes product, AI, marketing, and human-computer interaction. I bring a background in marketing and branding to building thoughtful software that solves real problems and helps products grow.";

// Meta description, derived from the bio.
export const SITE_DESCRIPTION =
  "Bridger Tower is a designer and software engineer focused on how design shapes product, AI, marketing, and human-computer interaction.";

export const TWITTER_HANDLE = "@bridgertower";

// Profiles that represent the same person (JSON-LD sameAs, rel="me").
export const SOCIAL_PROFILES = [
  "https://x.com/bridgertower",
  "https://github.com/brijr",
  "https://www.linkedin.com/in/brijr",
  "https://www.youtube.com/@bridgertower",
  "https://wip.is",
] as const;

export const FEED_TITLE = `${SITE_NAME} / Posts`;

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
  rss: "/rss.xml",
} as const;

/**
 * Per-page `alternates` metadata: a canonical URL plus the RSS
 * autodiscovery link. Metadata objects merge shallowly, so a page that sets
 * `alternates` replaces the layout's; this keeps the feed link on every page.
 */
export function pageAlternates(path?: string) {
  return {
    ...(path ? { canonical: path } : {}),
    types: {
      "application/rss+xml": [{ url: paths.rss, title: FEED_TITLE }],
    },
  };
}

/** Serialize JSON-LD for a <script> tag, escaping `<` per the Next.js guide. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

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
    `<${abs(paths.rss)}>; rel="alternate"; type="application/rss+xml"`,
  ].join(", ");
}
