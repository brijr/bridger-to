import { Section, Container } from "@/components/ds";
import { AnimatedContent } from "@/components/site/animated-content";
import { FeatImage } from "@/components/site/feat-image";
import { ArrowUpRight } from "lucide-react";

import Beach from "@/public/beach.webp";
import Link from "next/link";

const externalLinks = [
  { href: "https://x.com/bridgertower", label: "X" },
  { href: "https://linkedin.com/in/brijr", label: "LinkedIn" },
];

export default function ContactPage() {
  return (
    <Section>
      <Container className="space-y-8">
        <AnimatedContent>
          <ContactContent />
          <Links />
          <FeatImage
            src={Beach}
            alt="A photo I took at the beach in Oceanside, California"
          />
        </AnimatedContent>
      </Container>
    </Section>
  );
}

const ContactContent = () => {
  return (
    <div className="text-pretty space-y-3">
      <h2>
        If you're working on similar questions around applied AI, marketing
        technology, design engineering, or human-computer interaction, let's
        talk.
      </h2>
      <h3>
        My email is in the top right corner of the page or you can connect with
        me on X or LinkedIn.
      </h3>
    </div>
  );
};

const Links = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 bg-muted dark:bg-muted/50 p-0.5 rounded">
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
            className="group-hover:rotate-45 transition-transform duration-400"
          />
          {link.label}
        </Link>
      ))}
    </div>
  );
};
