import { ArrowUpRight, Github } from "lucide-react";
import { Main, Section, Container } from "@/components/ds";
import { Hero } from "@/components/site/hero";
import Link from "next/link";

const openSourceProjects = [
  {
    href: "https://next-wp.com",
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
    href: "https://deploy.bridger.to",
    label: "deploy.bridger.to",
    github: "https://github.com/brijr/deploy-button",
  },
  {
    href: "https://favicon.bridger.to",
    label: "favicon.bridger.to",
    github: "https://github.com/brijr/favicon",
  },
  {
    href: "https://resume.bridger.to",
    label: "resume.bridger.to",
    github: "https://github.com/brijr/resume",
  },
];

const previousClients = [
  { href: "https://vercel.com", label: "Vercel" },
  { href: "https://browserbase.com", label: "Browserbase" },
  { href: "https://julius.ai", label: "Julius" },
  { href: "https://laravel.com", label: "Laravel" },
  { href: "https://swyftfin.com", label: "Swyftfin" },
  { href: "https://ampry.com", label: "Ampry" },
  { href: "https://route.com", label: "Route" },
  { href: "https://tackle.io", label: "Tackle.io" },
];

const software = [
  { href: "https://flysuper.com", label: "Fly Super" },
  { href: "https://offerarc.com", label: "Offer Arc" },
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

const websites = [
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

const ventures = [
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

const content = [
  { href: "https://youtube.com/@bridgertower", label: "Videos" },
  { href: "https://youtube.com/@asapeng", label: "Podcasts" },
];

export default function WorkPage() {
  return (
    <Main>
      <Section>
        <Container className="space-y-8">
          <Hero path="Work" pathHref="/work" />
          <div className="text-balance">
            <p className="text-muted-foreground">
              A link is worth a thousand words
            </p>
            <p className="mt-4">
              Below are some of what I have worked on as a designer and software
              engineer.
            </p>
          </div>
          <WorkSection title="Software" items={software} />
          <WorkSection title="Clients" items={previousClients} />
          <WorkSection title="Open Source" items={openSourceProjects} />
          <WorkSection title="Websites" items={websites} />
          <WorkSection title="Ventures" items={ventures} />
          <WorkSection title="Content" items={content} />
        </Container>
      </Section>
    </Main>
  );
}

function WorkSection({
  title,
  items,
}: {
  title: string;
  items: Array<{ href: string; label: string; github?: string }>;
}) {
  return (
    <div className="space-y-2">
      <h2 className="font-medium">{title}</h2>
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
                  className="group-hover:rotate-45 transition-transform"
                />
                {item.label}
              </Link>
              {item.github && (
                <Link
                  href={item.github}
                  target="_blank"
                  className="flex items-center justify-center text-muted-foreground hover:text-primary group bg-background p-2.5 rounded aspect-square transition-colors"
                  aria-label={`${item.label} GitHub`}
                >
                  <Github strokeWidth={1.5} size={20} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
