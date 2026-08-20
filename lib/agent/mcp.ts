import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { abs, CONTACT_EMAIL, paths, SITE_NAME, SITE_URL, SITE_VERSION } from "@/lib/site";

interface JsonRpcRequest {
  jsonrpc?: string;
  id?: string | number | null;
  method?: string;
  params?: unknown;
}

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: string | number | null;
  result?: unknown;
  error?: { code: number; message: string };
}

const PROTOCOL_VERSION = "2025-03-26";

const tools = [
  {
    name: "list_posts",
    description: "List published essays on bridger.to",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "get_post",
    description: "Get a published essay by slug",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "Post slug, for example json-ld or ui-of-ai",
        },
      },
      required: ["slug"],
      additionalProperties: false,
    },
  },
  {
    name: "get_site_info",
    description: "Get Bridger Tower's bio, contact, and discovery URLs",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
];

function ok(id: string | number | null, result: unknown): JsonRpcResponse {
  return { jsonrpc: "2.0", id, result };
}

function fail(
  id: string | number | null,
  code: number,
  message: string,
): JsonRpcResponse {
  return { jsonrpc: "2.0", id, error: { code, message } };
}

function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value === "object" && value !== null) {
    return value as Record<string, unknown>;
  }
  return {};
}

function callTool(name: string, args: Record<string, unknown>): unknown {
  if (name === "list_posts") {
    return {
      posts: getAllPosts().map((post) => ({
        slug: post.slug,
        title: post.title,
        description: post.description ?? "",
        date: post.date,
        url: abs(post.permalink),
      })),
    };
  }

  if (name === "get_post") {
    const slug = typeof args.slug === "string" ? args.slug : "";
    const post = getPostBySlug(slug);
    if (!post?.published) {
      return { error: "Post not found" };
    }
    const raw = "raw" in post && typeof post.raw === "string" ? post.raw : null;
    return {
      slug: post.slug,
      title: post.title,
      description: post.description ?? "",
      date: post.date,
      url: abs(post.permalink),
      markdown: raw,
    };
  }

  if (name === "get_site_info") {
    return {
      name: SITE_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      schedule: "https://cal.com/brijr/30min",
      discovery: {
        apiCatalog: abs(paths.apiCatalog),
        openapi: abs(paths.openapi),
        mcp: abs(paths.mcp),
        llms: abs(paths.llms),
      },
    };
  }

  return { error: `Unknown tool: ${name}` };
}

export function handleMcpRequest(body: unknown): JsonRpcResponse | null {
  const request = asRecord(body) as JsonRpcRequest;
  const id = request.id ?? null;
  const method = request.method;

  if (!method) {
    return fail(id, -32600, "Invalid Request");
  }

  if (method === "notifications/initialized" || method.startsWith("notifications/")) {
    return null;
  }

  if (method === "ping") {
    return ok(id, {});
  }

  if (method === "initialize") {
    return ok(id, {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: {
        tools: { listChanged: false },
      },
      serverInfo: {
        name: "bridger.to",
        version: SITE_VERSION,
      },
    });
  }

  if (method === "tools/list") {
    return ok(id, { tools });
  }

  if (method === "tools/call") {
    const params = asRecord(request.params);
    const name = typeof params.name === "string" ? params.name : "";
    const args = asRecord(params.arguments);
    const result = callTool(name, args);
    return ok(id, {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    });
  }

  return fail(id, -32601, `Method not found: ${method}`);
}
