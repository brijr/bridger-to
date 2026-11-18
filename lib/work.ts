// Source of truth for the /work page. lib/agent/markdown.ts renders the
// same data for agents, so the HTML and markdown copies stay in sync.

export type WorkItem = {
  href: string;
  label: string;
  description?: string;
  github?: string;
  wip?: boolean;
  archived?: boolean;
};

export const building: WorkItem[] = [
  {
    href: "https://usegui.com",
    label: "Gui",
    description: "An open-source agent harness for design.",
    github: "https://github.com/brijr/gui",
  },
  {
    href: "https://shapefs.com",
    label: "Shape FS",
    description: "The file system for teams and their AI agents.",
  },
];

export const clients: WorkItem[] = [
  { href: "https://vercel.com", label: "Vercel" },
  { href: "https://browserbase.com", label: "Browserbase" },
  { href: "https://supermetal.io", label: "Supermetal" },
  { href: "https://julius.ai", label: "Julius" },
  { href: "https://laravel.com", label: "Laravel" },
  { href: "https://route.com", label: "Route" },
  { href: "https://matter-os.com", label: "MatterOS" },
  { href: "https://filelogic.ai", label: "File Logic" },
  { href: "https://tackle.io", label: "Tackle.io" },
  { href: "https://outr.ai", label: "Outr" },
  { href: "https://getpayve.com/", label: "Payve" },
  { href: "https://www.confettirecruiting.com/", label: "Confetti" },
  { href: "https://advocatemedia.com/", label: "Advocate Media" },
  { href: "https://strivepharmacy.com", label: "Strive" },
  { href: "https://rxvortex.com", label: "RxVortex" },
];

// Ordered by relevance: active projects with the most use first, then newer
// active tools, then older projects, then archived ones.
export const openSourceProjects: WorkItem[] = [
  {
    href: "https://next-wp.com",
    label: "Next WP",
    description:
      "Headless WordPress built with the Next.js App Router and React Server Components.",
    github: "https://github.com/9d8dev/next-wp",
  },
  {
    href: "https://github.com/brijr/iris",
    label: "Iris",
    description:
      "Screenshots of live websites. Minimal interface, powerful engine.",
    github: "https://github.com/brijr/iris",
  },
  {
    href: "https://router.so",
    label: "Router.so",
    description:
      "Headless form handling and lead routing for marketing-minded developers.",
    github: "https://github.com/9d8dev/router",
  },
  {
    href: "https://craft-ds.com",
    label: "Craft Design System",
    description:
      "An AI-first, lightweight, flexible design system for responsive layouts in React and prose.",
    github: "https://github.com/brijr/craft",
  },
  {
    href: "https://ds.brijr.dev",
    label: "ds",
    description: "One CSS file for typography, spacing, and layout.",
    github: "https://github.com/brijr/ds",
  },
  {
    href: "https://github.com/brijr/skills",
    label: "Skills",
    description: "Skills for designing applications and websites like brijr.",
    github: "https://github.com/brijr/skills",
  },
  {
    href: "https://pshot.dev",
    label: "pshot",
    description: "Product shots of your work, made by your AI agent.",
    github: "https://github.com/brijr/pshot",
  },
  {
    href: "https://cite.brijr.dev",
    label: "Cite",
    description: "Click anything. Tell the agent what to change.",
    github: "https://github.com/brijr/cite",
  },
  {
    href: "https://design-books.com",
    label: "Design Books",
    description: "A curated reading list for designers.",
    github: "https://github.com/brijr/design-sites/tree/main/apps/design-books",
  },
  {
    href: "https://design-shots.com",
    label: "Design Shots",
    description: "Drop in a screenshot and get a clean product shot back.",
    github: "https://github.com/brijr/design-tools/tree/main/apps/shots",
  },
  {
    href: "https://components.work",
    label: "Components",
    description:
      "Next.js components built with Tailwind, TypeScript, brijr/craft, and shadcn/ui.",
    github: "https://github.com/brijr/components",
  },
  {
    // meta-mcp.com has no DNS records; restore it as href once it resolves.
    href: "https://github.com/brijr/meta-mcp",
    label: "Meta MCP",
    description: "MCP server for connecting to the Meta Marketing API.",
    github: "https://github.com/brijr/meta-mcp",
  },
  {
    href: "https://payloadstarter.dev/",
    label: "Payload Starter",
    description:
      "Open-source SaaS starter for creating applications with Next.js and Payload.",
    github: "https://github.com/brijr/payload-starter",
  },
  {
    href: "https://mdx.bridger.to",
    label: "MDX Starter",
    description: "MDX Next.js starter built with brijr/craft and shadcn/ui.",
    github: "https://github.com/brijr/mdx",
  },
  {
    href: "https://resume.bridger.to",
    label: "Resume Builder",
    description:
      "A minimalist, responsive resume template built with Next.js, TypeScript, and Tailwind CSS.",
    github: "https://github.com/brijr/resume",
  },
  {
    href: "https://favicon.bridger.to",
    label: "Emoji to Favicon",
    description: "Emoji to favicon converter.",
    github: "https://github.com/brijr/favicon",
  },
  {
    href: "https://wrk.so",
    label: "Wrk.so",
    description:
      "Portfolios for creatives and an open-source Dribbble alternative.",
    github: "https://github.com/9d8dev/wrk",
    archived: true,
  },
  {
    href: "https://forms.bridger.to",
    label: "Form Builder",
    description:
      "An open-source form builder using React, shadcn/ui, TanStack Form, and TypeScript.",
    github: "https://github.com/brijr/forms",
    archived: true,
  },
];

export const ventures: WorkItem[] = [
  {
    href: "https://wip.is",
    label: "Work In Progress",
    github: "https://github.com/wipis/wip-is",
  },
  {
    href: "https://9d8.dev",
    label: "9d8",
  },
];

export const content: WorkItem[] = [
  { href: "https://youtube.com/@bridgertower", label: "YouTube" },
  { href: "https://shipgtm.com", label: "Ship GTM" },
];

export const workSections: { title: string; items: WorkItem[] }[] = [
  { title: "Building", items: building },
  { title: "Clients", items: clients },
  { title: "Open Source", items: openSourceProjects },
  { title: "Content", items: content },
  { title: "Ventures", items: ventures },
];
