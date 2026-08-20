import { CONTENT_SIGNAL, linkHeaderValue } from "@/lib/site";

const CORS_METHODS = "GET, HEAD, POST, OPTIONS";
const CORS_HEADERS =
  "Accept, Content-Type, Authorization, MCP-Protocol-Version";

export function estimateMarkdownTokens(markdown: string): number {
  return Math.max(1, Math.ceil(markdown.length / 4));
}

export function discoveryHeaders(
  contentType: string,
  extra?: HeadersInit,
): Headers {
  const headers = new Headers(extra);
  headers.set("Content-Type", contentType);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", CORS_METHODS);
  headers.set("Access-Control-Allow-Headers", CORS_HEADERS);
  headers.set("Cache-Control", "public, max-age=300");
  headers.set("Content-Signal", CONTENT_SIGNAL);
  if (!headers.has("Link")) {
    headers.set("Link", linkHeaderValue());
  }
  return headers;
}

export function jsonResponse(
  data: unknown,
  contentType = "application/json; charset=utf-8",
  status = 200,
): Response {
  return new Response(`${JSON.stringify(data, null, 2)}\n`, {
    status,
    headers: discoveryHeaders(contentType),
  });
}

export function textResponse(body: string, contentType: string): Response {
  const headers = discoveryHeaders(contentType);
  if (contentType.includes("markdown")) {
    headers.set("x-markdown-tokens", String(estimateMarkdownTokens(body)));
    headers.set("Vary", "Accept");
  }
  return new Response(body, { status: 200, headers });
}

export function headResponse(contentType: string): Response {
  return new Response(null, {
    status: 200,
    headers: discoveryHeaders(contentType),
  });
}

export function optionsResponse(): Response {
  return new Response(null, {
    status: 204,
    headers: discoveryHeaders("text/plain; charset=utf-8"),
  });
}

export function notFoundResponse(message = "Not found"): Response {
  return new Response(JSON.stringify({ error: message }), {
    status: 404,
    headers: discoveryHeaders("application/json; charset=utf-8"),
  });
}
