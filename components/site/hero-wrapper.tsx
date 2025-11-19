"use client";

import { usePathname } from "next/navigation";
import { Hero } from "./hero";
import { useEffect, useState } from "react";

const routeMap: Record<string, { label: string; href: string }> = {
  "/about": { label: "About", href: "/about" },
  "/contact": { label: "Contact", href: "/contact" },
  "/posts": { label: "Posts", href: "/posts" },
  "/work": { label: "Work", href: "/work" },
};

export function HeroWrapper() {
  const pathname = usePathname();
  const [postTitle, setPostTitle] = useState<string | null>(null);

  useEffect(() => {
    // Check if it's a post route and fetch the title
    if (pathname && pathname !== "/" && !routeMap[pathname]) {
      const slug = pathname.slice(1);
      fetch(`/api/post-title?slug=${encodeURIComponent(slug)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.title) {
            setPostTitle(data.title);
          }
        })
        .catch(() => {
          // Silently fail
        });
    } else {
      setPostTitle(null);
    }
  }, [pathname]);

  // Homepage - no segments
  if (pathname === "/") {
    return <Hero />;
  }

  // Check if it's a static route
  if (pathname && routeMap[pathname]) {
    return <Hero path={routeMap[pathname].label} pathHref={routeMap[pathname].href} />;
  }

  // Check if it's a post route
  if (postTitle) {
    return (
      <Hero
        paths={[
          { label: "Posts", href: "/posts" },
          { label: postTitle, href: pathname || "/" },
        ]}
      />
    );
  }

  // Fallback - show loading state or empty
  return <Hero />;
}
