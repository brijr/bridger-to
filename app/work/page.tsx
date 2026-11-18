import { ArrowUpRight, Github } from "lucide-react";
import { Section, Container } from "@/components/ds";
import { AnimatedContent } from "@/components/site/animated-content";
import { Circle } from "lucide-react";

import Link from "next/link";

import type { Metadata } from "next";

import { pageAlternates } from "@/lib/site";
import { workSections, type WorkItem } from "@/lib/work";

export const metadata: Metadata = {
  alternates: pageAlternates("/work"),
};

export default function WorkPage() {
  return (
    <Section>
      <Container className="space-y-8">
        <AnimatedContent>
          {workSections.map((section) => (
            <WorkSection
              key={section.title}
              title={section.title}
              items={section.items}
            />
          ))}
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
            <div key={item.href} className="flex items-stretch gap-0.5">
              <Link
                href={item.href}
                target="_blank"
                className="flex items-start gap-1.5 hover:text-primary group bg-background p-2 rounded flex-1 min-w-0"
              >
                <ArrowUpRight
                  strokeWidth={1.5}
                  size={20}
                  className="shrink-0 group-hover:rotate-45 transition-transform duration-400"
                />
                <span className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.wip && (
                      <span className="ml-auto mr-0.5 text-xs text-muted-foreground flex items-center gap-1.5">
                        <Circle size={6} /> WIP
                      </span>
                    )}
                    {item.archived && (
                      <span className="ml-auto mr-0.5 text-xs text-muted-foreground">
                        Archived
                      </span>
                    )}
                  </span>
                  {item.description && (
                    <span className="text-sm text-muted-foreground text-pretty">
                      {item.description}
                    </span>
                  )}
                </span>
              </Link>
              {item.github && (
                <Link
                  href={item.github}
                  target="_blank"
                  className="flex items-start justify-center shrink-0 w-9 pt-2.5 text-muted-foreground hover:text-primary group bg-background rounded"
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
