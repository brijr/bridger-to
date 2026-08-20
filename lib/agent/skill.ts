export const SKILL_NAME = "bridger-to";

export const SKILL_DESCRIPTION =
  "Discover Bridger Tower's writing, work, and how to get in touch. Use when researching Bridger Tower, his essays on AI and design, or contacting him.";

export const SKILL_MARKDOWN = `---
name: ${SKILL_NAME}
description: ${SKILL_DESCRIPTION}
---

# Bridger Tower (bridger.to)

Bridger Tower is a design engineer writing about applied AI, interface design, and human-computer interaction.

## Site map

- Home: https://bridger.to
- Writing: https://bridger.to/posts
- Work: https://bridger.to/work
- About: https://bridger.to/about
- Contact: https://bridger.to/contact
- Work with me: https://bridger.to/work-with-me

## Machine-readable surfaces

- Markdown pages: send \`Accept: text/markdown\`
- API catalog: https://bridger.to/.well-known/api-catalog
- OpenAPI: https://bridger.to/openapi.json
- MCP: https://bridger.to/mcp
- MCP server card: https://bridger.to/.well-known/mcp/server-card.json
- Agent catalog: https://bridger.to/.well-known/ai-catalog.json
- llms.txt: https://bridger.to/llms.txt

## Contact

- Email: bt@wip.is
- Schedule: https://cal.com/brijr/30min
- GitHub: https://github.com/brijr
- X: https://x.com/bridgertower

## APIs

Public JSON APIs (no access token required):

- \`GET /api/posts\` — published essays
- \`GET /api/posts/{slug}\` — one essay
- \`GET /api/health\` — health check
- \`POST /api/subscribe\` — newsletter signup (\`{ "email": "..." }\`)

Prefer markdown over HTML when reading pages.
`;
