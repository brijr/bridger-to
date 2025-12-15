import { Section, Container } from "@/components/ds";
import { AnimatedContent } from "@/components/site/animated-content";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type PricingItem = {
  type: string;
  range: string;
};

const projects: PricingItem[] = [
  { type: "Landing page", range: "$3k–8k" },
  { type: "Marketing site (static)", range: "$8k–15k" },
  { type: "Marketing site + CMS", range: "$15k–30k" },
  { type: "Product UI (feature or flow)", range: "$10k–25k" },
  { type: "AI feature integration", range: "$15k–30k" },
];

const retainers: PricingItem[] = [
  { type: "1 day/week", range: "$5k/mo" },
  { type: "2 days/week", range: "$9k/mo" },
  { type: "3 days/week", range: "$12k/mo" },
];

const advisory: PricingItem[] = [
  { type: "Async access + 2 calls/month", range: "$2k/mo" },
  { type: "Audit + roadmap (one-time)", range: "$3k–5k" },
];

export default function WorkWithMePage() {
  return (
    <Section>
      <Container className="space-y-8">
        <AnimatedContent>
          <Intro />
          <PricingSection title="Projects" description="Fixed-scope builds with clear deliverables." items={projects} />
          <PricingSection title="Retainers" description="Ongoing design engineering, embedded in your team on a part-time basis." items={retainers} />
          <PricingSection title="Advisory" description="Strategic guidance for teams who need direction, not just execution." items={advisory} />
          <Minimum />
          <Contact />
        </AnimatedContent>
      </Container>
    </Section>
  );
}

const Intro = () => {
  return (
    <div className="text-pretty space-y-3">
      <h2>
        I'm a design engineer—I design and build interfaces, systems, and AI-powered tools for software companies.
      </h2>
      <h3>
        Most teams treat design and engineering as separate functions. Work gets lost in translation. I operate across both, which means faster iteration, fewer handoff problems, and products that actually ship.
      </h3>
    </div>
  );
};

function PricingSection({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: PricingItem[];
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-muted-foreground text-[0.8rem]">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="grid gap-0.5 bg-muted dark:bg-muted/50 p-0.5 rounded">
        {items.map((item) => (
          <div
            key={item.type}
            className="flex items-center justify-between bg-background p-2 rounded"
          >
            <span>{item.type}</span>
            <span className="text-muted-foreground">{item.range}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const Minimum = () => {
  return (
    <div className="text-sm text-muted-foreground">
      Minimum engagement: $5k
    </div>
  );
};

const Contact = () => {
  return (
    <div className="space-y-2">
      <h3 className="text-muted-foreground text-[0.8rem]">Get in touch</h3>
      <p className="text-sm text-muted-foreground">
        If you're building something interesting, I'd like to hear about it.
      </p>
      <div className="grid gap-0.5 bg-muted dark:bg-muted/50 p-0.5 rounded">
        <Link
          href="https://cal.com/brijr"
          target="_blank"
          className="flex items-center gap-1.5 hover:text-primary group bg-background p-2 rounded"
        >
          <ArrowUpRight
            strokeWidth={1.5}
            size={20}
            className="group-hover:rotate-45 transition-transform duration-400"
          />
          Schedule a call
        </Link>
      </div>
    </div>
  );
};
