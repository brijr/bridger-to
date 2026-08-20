import { jsonResponse } from "@/lib/agent/http";
import { getAllPosts } from "@/lib/posts";
import { abs } from "@/lib/site";

export function GET() {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description ?? "",
    date: post.date,
    tags: post.tags ?? [],
    url: abs(post.permalink),
  }));

  return jsonResponse({ posts });
}
