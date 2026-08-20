import { abs, CONTACT_EMAIL, paths, SITE_NAME, SITE_URL } from "@/lib/site";

export function authMarkdown(): string {
  return `# auth.md

You are an agent. ${SITE_NAME}'s site at ${SITE_URL} is a **public content resource**. Essays, work, and profile pages do not require an access token. Follow the steps below if you still want to register anonymously.

Resource server: \`${SITE_URL}\`
Authorization server: \`${SITE_URL}\`

## Step 1 — Discover

Protected Resource Metadata:

\`\`\`http
GET ${paths.oauthProtectedResource}
\`\`\`

Authorization Server metadata:

\`\`\`http
GET ${paths.oauthAuthorizationServer}
\`\`\`

Read \`resource\`, \`authorization_servers\`, \`scopes_supported\`, \`bearer_methods_supported\`, \`issuer\`, \`authorization_endpoint\`, \`token_endpoint\`, \`jwks_uri\`, \`grant_types_supported\`, and the \`agent_auth\` block (\`skill\`, \`register_uri\`, \`identity_types_supported\`, \`anonymous.credential_types_supported\`, \`anonymous.claim_uri\`).

This site supports **anonymous** registration only. Content GETs work with no credentials.

## Step 2 — Pick a method

Use \`anonymous\`. There is no sign-up form, ID-JAG flow, or email claim ceremony for reading this site.

## Step 3 — Register

\`\`\`http
POST ${paths.identity}
Content-Type: application/json

{ "type": "anonymous" }
\`\`\`

Example response:

\`\`\`json
{
  "registration_id": "reg_public",
  "registration_type": "anonymous",
  "identity_assertion": "public",
  "pre_claim_scopes": ["read"]
}
\`\`\`

## Step 4 — Exchange (optional)

\`\`\`http
POST ${paths.token}
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=public
\`\`\`

\`\`\`json
{
  "access_token": "public",
  "token_type": "Bearer",
  "expires_in": 86400,
  "scope": "read"
}
\`\`\`

The \`public\` token is opaque and grants the same access as an unauthenticated request.

## Step 5 — Call the APIs

No \`Authorization\` header is required.

- \`GET ${abs(paths.postsApi)}\` — published posts
- \`GET ${abs(paths.postsApi)}/{slug}\` — one post
- \`GET ${abs(paths.health)}\` — health
- \`POST ${abs(paths.subscribe)}\` — newsletter (\`{ "email": "you@example.com" }\`)
- \`POST ${abs(paths.mcp)}\` — MCP Streamable HTTP

Human docs: ${abs(paths.docsApi)}
OpenAPI: ${abs(paths.openapi)}

To reach a human: ${CONTACT_EMAIL} or https://cal.com/brijr/30min

## Errors

| Code | Where | What to do |
| --- | --- | --- |
| \`invalid_request\` | ${paths.identity} | Send \`{ "type": "anonymous" }\`. |
| \`unsupported_grant_type\` | ${paths.token} | Use \`urn:ietf:params:oauth:grant-type:jwt-bearer\` or skip tokens entirely. |
| \`invalid_grant\` | ${paths.token} | Retry with \`assertion=public\`, or call the public APIs without a token. |

## Revocation

\`POST ${paths.revoke}\` accepts \`token=public\` and returns 200. Public content stays public.
`;
}
