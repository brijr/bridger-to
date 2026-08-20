import { createHash } from "node:crypto";

import { SKILL_DESCRIPTION, SKILL_MARKDOWN, SKILL_NAME } from "@/lib/agent/skill";
import { abs, paths, SITE_NAME, SITE_URL, SITE_VERSION } from "@/lib/site";

function sha256Hex(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function apiCatalog() {
  return {
    linkset: [
      {
        anchor: abs(paths.postsApi),
        "service-desc": [
          {
            href: abs(paths.openapi),
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            href: abs(paths.docsApi),
            type: "text/markdown",
          },
        ],
        status: [
          {
            href: abs(paths.health),
            type: "application/json",
          },
        ],
      },
      {
        anchor: abs(paths.subscribe),
        "service-desc": [
          {
            href: abs(paths.openapi),
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            href: abs(paths.docsApi),
            type: "text/markdown",
          },
        ],
        status: [
          {
            href: abs(paths.health),
            type: "application/json",
          },
        ],
      },
      {
        anchor: abs(paths.mcp),
        "service-desc": [
          {
            href: abs(paths.mcpCard),
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            href: abs(paths.docsApi),
            type: "text/markdown",
          },
        ],
        status: [
          {
            href: abs(paths.health),
            type: "application/json",
          },
        ],
      },
    ],
  };
}

export function mcpServerCard() {
  return {
    serverInfo: {
      name: SITE_NAME,
      version: SITE_VERSION,
    },
    description:
      "Public MCP server for Bridger Tower's writing, work, and contact information.",
    url: abs(paths.mcp),
    endpoint: abs(paths.mcp),
    transport: {
      type: "streamable-http",
    },
    capabilities: {
      tools: true,
    },
  };
}

export function oauthProtectedResource() {
  return {
    resource: `${SITE_URL}/`,
    resource_name: SITE_NAME,
    authorization_servers: [SITE_URL],
    scopes_supported: ["read"],
    bearer_methods_supported: ["header"],
  };
}

export function oauthAuthorizationServer() {
  return {
    issuer: SITE_URL,
    authorization_endpoint: abs(paths.authorize),
    token_endpoint: abs(paths.token),
    revocation_endpoint: abs(paths.revoke),
    jwks_uri: abs(paths.jwks),
    registration_endpoint: abs(paths.identity),
    grant_types_supported: [
      "urn:ietf:params:oauth:grant-type:jwt-bearer",
    ],
    response_types_supported: ["token"],
    token_endpoint_auth_methods_supported: ["none"],
    scopes_supported: ["read"],
    code_challenge_methods_supported: ["S256"],
    agent_auth: {
      skill: abs(paths.authMd),
      register_uri: abs(paths.identity),
      identity_endpoint: abs(paths.identity),
      claim_endpoint: abs(paths.claim),
      identity_types_supported: ["anonymous"],
      anonymous: {
        credential_types_supported: ["opaque"],
        claim_uri: abs(paths.claim),
      },
    },
  };
}

export function openidConfiguration() {
  return {
    ...oauthAuthorizationServer(),
    userinfo_endpoint: abs(paths.health),
    subject_types_supported: ["public"],
    id_token_signing_alg_values_supported: ["none"],
  };
}

export function jwks() {
  return { keys: [] as unknown[] };
}

export function agentSkillsIndex() {
  return {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: SKILL_NAME,
        type: "skill-md",
        description: SKILL_DESCRIPTION,
        url: abs(paths.skill),
        digest: `sha256:${sha256Hex(SKILL_MARKDOWN)}`,
      },
    ],
  };
}

export function aiCatalog() {
  return {
    specVersion: "1.0",
    host: {
      displayName: SITE_NAME,
      identifier: "did:web:bridger.to",
    },
    entries: [
      {
        identifier: "urn:air:bridger.to:server:site",
        displayName: "Bridger Tower MCP",
        type: "application/mcp-server-card+json",
        url: abs(paths.mcpCard),
        representativeQueries: [
          "list Bridger Tower's essays",
          "who is Bridger Tower",
          "how do I contact Bridger Tower",
          "get the markdown for a post on bridger.to",
        ],
      },
      {
        identifier: "urn:air:bridger.to:api:catalog",
        displayName: "bridger.to API catalog",
        type: "application/linkset+json",
        url: abs(paths.apiCatalog),
        representativeQueries: [
          "what APIs does bridger.to expose",
          "where is the OpenAPI spec for bridger.to",
          "health check for bridger.to APIs",
        ],
      },
      {
        identifier: "urn:air:bridger.to:skill:bridger-to",
        displayName: "bridger-to agent skill",
        type: "text/markdown",
        url: abs(paths.skill),
        representativeQueries: [
          "skill for researching Bridger Tower",
          "how should an agent read bridger.to",
        ],
      },
      {
        identifier: "urn:air:bridger.to:schema:openapi",
        displayName: "bridger.to OpenAPI",
        type: "application/json",
        url: abs(paths.openapi),
        representativeQueries: [
          "subscribe to Bridger Tower's newsletter via API",
          "fetch published posts as JSON",
        ],
      },
    ],
  };
}

export function openApiDocument() {
  return {
    openapi: "3.1.0",
    info: {
      title: `${SITE_NAME} API`,
      version: SITE_VERSION,
      description:
        "Public APIs for Bridger Tower's website: posts, newsletter, health, and MCP.",
    },
    servers: [{ url: SITE_URL }],
    paths: {
      [paths.postsApi]: {
        get: {
          summary: "List published posts",
          operationId: "listPosts",
          responses: {
            "200": { description: "Published posts" },
          },
        },
      },
      [`${paths.postsApi}/{slug}`]: {
        get: {
          summary: "Get a published post",
          operationId: "getPost",
          parameters: [
            {
              name: "slug",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": { description: "Post" },
            "404": { description: "Not found" },
          },
        },
      },
      [paths.subscribe]: {
        post: {
          summary: "Subscribe to the newsletter",
          operationId: "subscribe",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email"],
                  properties: {
                    email: { type: "string", format: "email" },
                    source: { type: "string" },
                    userGroup: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "201": { description: "Subscribed" },
            "400": { description: "Invalid request" },
          },
        },
      },
      [paths.health]: {
        get: {
          summary: "Health check",
          operationId: "health",
          responses: {
            "200": { description: "OK" },
          },
        },
      },
      [paths.mcp]: {
        post: {
          summary: "MCP Streamable HTTP endpoint",
          operationId: "mcp",
          responses: {
            "200": { description: "JSON-RPC response" },
          },
        },
      },
    },
  };
}

export function apiDocsMarkdown(): string {
  return `# ${SITE_NAME} API

Public APIs for ${SITE_URL}. No access token is required.

## Discovery

- API catalog: ${abs(paths.apiCatalog)}
- OpenAPI: ${abs(paths.openapi)}
- MCP server card: ${abs(paths.mcpCard)}
- ARD catalog: ${abs(paths.aiCatalog)}
- Auth: ${abs(paths.authMd)}

## Endpoints

### \`GET /api/posts\`

List published essays.

### \`GET /api/posts/{slug}\`

Fetch one essay as JSON, including markdown.

### \`GET /api/health\`

Liveness check.

### \`POST /api/subscribe\`

Newsletter signup.

\`\`\`json
{ "email": "you@example.com" }
\`\`\`

### \`POST /mcp\`

MCP Streamable HTTP. Tools: \`list_posts\`, \`get_post\`, \`get_site_info\`.

## Markdown

Send \`Accept: text/markdown\` on HTML pages to receive markdown.
`;
}

export function robotsTxt(): string {
  return `User-agent: *
Allow: /
Content-Signal: ai-train=yes, search=yes, ai-input=yes

User-agent: GPTBot
Allow: /
Content-Signal: ai-train=yes, search=yes, ai-input=yes

User-agent: ChatGPT-User
Allow: /
Content-Signal: ai-train=yes, search=yes, ai-input=yes

User-agent: ClaudeBot
Allow: /
Content-Signal: ai-train=yes, search=yes, ai-input=yes

User-agent: Google-Extended
Allow: /
Content-Signal: ai-train=yes, search=yes, ai-input=yes

User-agent: PerplexityBot
Allow: /
Content-Signal: ai-train=yes, search=yes, ai-input=yes

Sitemap: ${abs(paths.sitemap)}
Agentmap: ${abs(paths.aiCatalog)}
`;
}
