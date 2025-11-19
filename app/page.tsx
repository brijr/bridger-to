import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Main, Section, Container } from "@/components/ds";
import { Hero } from "@/components/site/hero";

import Link from "next/link";

const internalLinks = [
  { href: "/work", label: "Work" },
  { href: "/posts", label: "Posts" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const externalLinks = [
  { href: "https://x.com/bridgertower", label: "X" },
  { href: "https://github.com/brijr", label: "GitHub" },
  { href: "https://youtube.com/@bridgertower", label: "YouTube" },
  { href: "https://linkedin.com/in/brijr", label: "LinkedIn" },
];

export default function HomePage() {
  return (
    <Main>
      <Section>
        <Container className="space-y-8">
          <Hero />
          <Links />
          <Info />
        </Container>
      </Section>
    </Main>
  );
}

const Info = () => {
  return (
    <div className="text-balance">
      <h3>
        UI design, applied artificial intelligence, and human-computer
        interaction. Background in marketing and advertising.
      </h3>
    </div>
  );
};

const Links = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 bg-muted dark:bg-muted/50 p-0.5 rounded">
      <div className="grid gap-0.5">
        {internalLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-1.5 hover:text-primary group bg-background p-2 rounded"
          >
            <ArrowDownRight
              strokeWidth={1.5}
              size={20}
              className="group-hover:-rotate-45 transition-transform"
            />
            {link.label}
          </Link>
        ))}
      </div>
      <div className="grid gap-0.5">
        {externalLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            className="flex items-center gap-1.5 hover:text-primary group bg-background p-2 rounded"
          >
            <ArrowUpRight
              strokeWidth={1.5}
              size={20}
              className="group-hover:rotate-45 transition-transform"
            />
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
