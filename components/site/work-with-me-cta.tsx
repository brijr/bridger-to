"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export function WorkWithMeCta() {
  const pathname = usePathname();

  // Hide on the work-with-me page itself
  if (pathname === "/work-with-me") {
    return null;
  }

  return (
    <Link
      href="/work-with-me"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
    >
      Work with me
      <ArrowUpRight strokeWidth={2} size={16} />
    </Link>
  );
}
