import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Section, Container } from "@/components/ds";
import { AnimatedContent } from "@/components/site/animated-content";
import { FeatImage } from "@/components/site/feat-image";
import { EmailForm } from "@/components/email-form";

import Salt from "@/public/salt.webp";
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
    <Section>
      <Container className="space-y-8">
        <AnimatedContent>
          <Info />
          <Links />
          <FeatImage
            src={Salt}
            alt="A photo I took at the Salt Flats in Utah"
          />
          <EmailForm label="Subscribe to my newsletter" />
        </AnimatedContent>
      </Container>
    </Section>
  );
}

const Info = () => {
  return (
    <div className="text-pretty space-y-3">
      <h2>
        Designer and software engineer focused on how design shapes product, AI,
        marketing, and human-computer interaction. I bring a background in
        marketing and branding to building thoughtful software that solves real
        problems and helps products grow.
      </h2>
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
            className="flex items-center gap-1.5 hover:text-primary group bg-background p-2 rounded-md"
          >
            <ArrowUpRight
              strokeWidth={1.5}
              size={20}
              className="sm:hidden group-hover:rotate-45 transition-transform duration-400"
            />
            <ArrowDownRight
              strokeWidth={1.5}
              size={20}
              className="hidden sm:block group-hover:-rotate-45 transition-transform duration-400"
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
            className="flex items-center gap-1.5 hover:text-primary group bg-background p-2 rounded-md"
          >
            <ArrowUpRight
              strokeWidth={1.5}
              size={20}
              className="group-hover:rotate-45 transition-transform duration-400"
            />
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
