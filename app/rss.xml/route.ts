import { textResponse } from "@/lib/agent/http";
import { getAllPosts } from "@/lib/posts";
import {
  FEED_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  abs,
  paths,
} from "@/lib/site";

// Posts are compiled at build time, so the feed can be prerendered.
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(date: string): string {
  return new Date(date).toUTCString();
}

export function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const url = abs(post.permalink);
      const categories = (post.tags ?? [])
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
        `      <pubDate>${rfc822(post.date)}</pubDate>`,
        post.description
          ? `      <description>${escapeXml(post.description)}</description>`
          : "",
        `      <dc:creator>${escapeXml(post.author ?? SITE_NAME)}</dc:creator>`,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const lastBuildDate = posts[0] ? rfc822(posts[0].date) : undefined;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${escapeXml(abs(paths.posts))}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <atom:link href="${escapeXml(abs(paths.rss))}" rel="self" type="application/rss+xml"/>
${lastBuildDate ? `    <lastBuildDate>${lastBuildDate}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return textResponse(xml, "application/rss+xml; charset=utf-8");
}
