import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/posts";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    return NextResponse.json({ title: null }, { status: 200 });
  }

  return NextResponse.json({ title: post.title });
}
