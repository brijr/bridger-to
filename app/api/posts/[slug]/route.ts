import { jsonResponse, notFoundResponse } from "@/lib/agent/http";
import { getPostBySlug } from "@/lib/posts";
import { abs } from "@/lib/site";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const post = getPostBySlug(slug);

  if (!post?.published) {
    return notFoundResponse("Post not found");
  }

  const markdown =
    "raw" in post && typeof post.raw === "string" ? post.raw : null;

  return jsonResponse({
    slug: post.slug,
    title: post.title,
    description: post.description ?? "",
    date: post.date,
    tags: post.tags ?? [],
    url: abs(post.permalink),
    markdown,
  });
}
