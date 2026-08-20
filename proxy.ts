import { NextRequest, NextResponse } from "next/server";

import { wantsMarkdown } from "@/lib/agent/accept";
import { CONTENT_SIGNAL, linkHeaderValue } from "@/lib/site";

const SKIP_MARKDOWN =
  /^\/(api\/|\.well-known\/|mcp\/?$|oauth\/|agent\/|auth\.md$|openapi\.json$|docs\/api\/?$|llms\.txt$|robots\.txt$|sitemap\.xml$|_next\/)/;

function withDiscoveryHeaders(response: NextResponse): NextResponse {
  response.headers.set("Link", linkHeaderValue());
  response.headers.set("Content-Signal", CONTENT_SIGNAL);
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (wantsMarkdown(request.headers.get("accept")) && !SKIP_MARKDOWN.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/api/markdown" : `/api/markdown${pathname}`;
    const response = NextResponse.rewrite(url);
    response.headers.set("Vary", "Accept");
    return withDiscoveryHeaders(response);
  }

  return withDiscoveryHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico|woff2?)$).*)",
  ],
};
