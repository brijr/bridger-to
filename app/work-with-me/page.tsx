import { Section, Container } from "@/components/ds";
import { AnimatedContent } from "@/components/site/animated-content";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function WorkWithMePage() {
  return (
    <Section>
      <Container className="space-y-8">
        <AnimatedContent>
          <WorkWithMeContent />
          <ContactLinks />
        </AnimatedContent>
      </Container>
    </Section>
  );
}

const WorkWithMeContent = () => {
  return (
    <div className="text-pretty space-y-3">
      <h2>
        I'm a design engineer—I design and build interfaces, systems, and
        AI-powered tools for software companies.
      </h2>
      <h3>
        Most teams treat design and engineering as separate functions. Work gets
        lost in translation. I operate across both, which means faster
        iteration, fewer handoff problems, and products that actually ship.
      </h3>
      <h3>
        I work on projects, retainers, and advisory engagements. If you're
        building something interesting and need help with design, engineering,
        or both—reach out.
      </h3>
    </div>
  );
};

const ContactLinks = () => {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="mailto:bt@wip.is"
        className="flex items-center gap-1.5 hover:text-white/75 group bg-primary text-white px-4 py-2 rounded"
      >
        <ArrowUpRight
          strokeWidth={1.5}
          size={20}
          className="group-hover:rotate-45 transition-transform duration-400"
        />
        Email Me
      </Link>
      <Link
        href="https://t.me/wipis"
        target="_blank"
        className="flex items-center gap-1.5 hover:text-foreground/75 group bg-muted px-4 py-2 rounded"
      >
        <ArrowUpRight
          strokeWidth={1.5}
          size={20}
          className="group-hover:rotate-45 transition-transform duration-400"
        />
        Telegram
      </Link>
    </div>
  );
};
