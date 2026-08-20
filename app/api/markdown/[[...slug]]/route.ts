import { getPageMarkdown } from "@/lib/agent/markdown";
import { notFoundResponse, textResponse } from "@/lib/agent/http";

type RouteContext = {
  params: Promise<{ slug?: string[] }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const path = slug && slug.length > 0 ? `/${slug.join("/")}` : "/";
  const markdown = await getPageMarkdown(path);

  if (!markdown) {
    return notFoundResponse("No markdown representation");
  }

  return textResponse(markdown, "text/markdown; charset=utf-8");
}
