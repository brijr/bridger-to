import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Main, Section, Container } from "@/components/ds";
import { Logo } from "@/components/site/logo";
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
          <Logo className="block" />
          <Hero />
          <Info />
          <Links />
        </Container>
      </Section>
    </Main>
  );
}

const Info = () => {
  return (
    <div className="max-w-2xl text-balance">
      <h3>
        UI design, applied artificial intelligence, and human-computer
        interaction. Background in marketing and advertising.
      </h3>
    </div>
  );
};

const Links = () => {
  return (
    <div className="grid grid-cols-2 gap-1 max-w-2xl bg-muted/50 p-1 rounded">
      <div className="grid gap-1">
        {internalLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-2 hover:text-primary group bg-background p-2 rounded"
          >
            <ArrowDownRight
              strokeWidth={1.5}
              className="group-hover:-rotate-45 transition-transform"
            />
            {link.label}
          </Link>
        ))}
      </div>
      <div className="grid gap-1">
        {externalLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-2 hover:text-primary group bg-background p-2 rounded"
          >
            <ArrowUpRight
              strokeWidth={1.5}
              className="group-hover:rotate-45 transition-transform"
            />
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
