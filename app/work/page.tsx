import { ArrowUpRight, Github } from "lucide-react";
import { Section, Container } from "@/components/ds";
import { AnimatedContent } from "@/components/site/animated-content";
import { Circle } from "lucide-react";

import Link from "next/link";

type WorkItem = {
  href: string;
  label: string;
  github?: string;
  wip?: boolean;
};

const openSourceProjects: WorkItem[] = [
  {
    href: "https://github.com/9d8dev/next-wp",
    label: "Next WP",
    github: "https://github.com/9d8dev/next-wp",
  },
  {
    href: "https://payloadstarter.dev/",
    label: "Payload Starter",
    github: "https://github.com/brijr/payload-saas-starter",
  },
  {
    href: "https://mdx.bridger.to",
    label: "MDX Starter",
    github: "https://github.com/brijr/mdx",
  },
  {
    href: "https://forms.bridger.to",
    label: "Form Builder",
    github: "https://github.com/brijr/forms",
  },
  {
    href: "https://craft-ds.com",
    label: "Craft Design System",
    github: "https://github.com/brijr/craft",
  },
  {
    href: "https://components.work",
    label: "Components",
    github: "https://github.com/brijr/components",
  },
  {
    href: "https://favicon.bridger.to",
    label: "Emoji to Favicon",
    github: "https://github.com/brijr/favicon",
  },
  {
    href: "https://resume.bridger.to",
    label: "Resume Builder",
    github: "https://github.com/brijr/resume",
  },
];

const previousClients: WorkItem[] = [
  { href: "https://vercel.com", label: "Vercel" },
  { href: "https://browserbase.com", label: "Browserbase" },
  { href: "https://julius.ai", label: "Julius" },
  { href: "https://laravel.com", label: "Laravel" },
  { href: "https://swyftfin.com", label: "Swyftfin" },
  { href: "https://ampry.com", label: "Ampry" },
  { href: "https://route.com", label: "Route" },
  { href: "https://tackle.io", label: "Tackle.io" },
];

const software: WorkItem[] = [
  { href: "https://flysuper.com", label: "Fly Super", wip: true },
  { href: "https://offerarc.com", label: "Offer Arc", wip: true },
  {
    href: "https://router.so",
    label: "Router.so",
    github: "https://github.com/routerso/router",
  },
  {
    href: "https://wrk.so",
    label: "Wrk.so",
    github: "https://github.com/9d8dev/wrk-so",
  },
];

const websites: WorkItem[] = [
  {
    href: "https://designbooks.org",
    label: "Design Books",
    github: "https://github.com/brijr/designbooks",
  },
  {
    href: "https://studiomojave.com/",
    label: "Studio Mojave",
    github: "https://github.com/brijr/mojave",
  },
  {
    href: "https://www.zion.surf/",
    label: "Zion",
    github: "https://github.com/brijr/zion",
  },
  {
    href: "https://alpinecodex.com",
    label: "Alpine Codex",
    github: "https://github.com/alpinecodex/home",
  },
];

const ventures: WorkItem[] = [
  {
    href: "https://wip.ac",
    label: "Work In Progress",
    github: "https://github.com/brijr/wip",
  },
  {
    href: "https://9d8.dev",
    label: "9d8",
    github: "https://github.com/9d8dev/home",
  },
];

const content: WorkItem[] = [
  { href: "https://youtube.com/@bridgertower", label: "YouTube" },
  { href: "https://shipgtm.com", label: "Ship GTM" },
];

export default function WorkPage() {
  return (
    <Section>
      <Container className="space-y-8">
        <AnimatedContent>
          <WorkSection title="Clients" items={previousClients} />
          <WorkSection title="Open Source" items={openSourceProjects} />
          <WorkSection title="Content" items={content} />
          <WorkSection title="Software" items={software} />
          <WorkSection title="Websites" items={websites} />
          <WorkSection title="Ventures" items={ventures} />
        </AnimatedContent>
      </Container>
    </Section>
  );
}

function WorkSection({ title, items }: { title: string; items: WorkItem[] }) {
  return (
    <div className="space-y-2">
      <h3 className="text-muted-foreground text-[0.8rem]">{title}</h3>
      <div className="grid gap-0.5 bg-muted dark:bg-muted/50 p-0.5 rounded">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
          {items.map((item) => (
            <div key={item.href} className="flex items-center gap-0.5">
              <Link
                href={item.href}
                target="_blank"
                className="flex items-center gap-1.5 hover:text-primary group bg-background p-2 rounded flex-1"
              >
                <ArrowUpRight
                  strokeWidth={1.5}
                  size={20}
                  className="group-hover:rotate-45 transition-transform duration-400"
                />
                {item.label}
                {item.wip && (
                  <span className="ml-auto mr-0.5 text-xs text-muted-foreground flex items-center gap-1.5">
                    <Circle size={6} /> WIP
                  </span>
                )}
              </Link>
              {item.github && (
                <Link
                  href={item.github}
                  target="_blank"
                  className="flex items-center justify-center text-muted-foreground hover:text-primary group bg-background p-2.5 rounded aspect-square transition-colors duration-400"
                  aria-label={`${item.label} GitHub`}
                >
                  <Github strokeWidth={1.75} size={16} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
