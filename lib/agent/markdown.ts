import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

async function readLlmsTxt(): Promise<string> {
  return readFile(join(process.cwd(), "public/llms.txt"), "utf8");
}

function postsIndexMarkdown(): string {
  const posts = getAllPosts();
  const items = posts
    .map((post) => {
      const description = post.description ? ` — ${post.description}` : "";
      return `- [${post.title}](${SITE_URL}${post.permalink})${description}`;
    })
    .join("\n");

  return `# Posts

Published writing by ${SITE_NAME}.

${items}
`;
}

function staticPageMarkdown(path: string): string | null {
  switch (path) {
    case "/about":
      return `# About ${SITE_NAME}

I'm a software engineer and technical entrepreneur who builds at the intersection of design, AI, and human-computer interaction.

AI is extraordinarily powerful, but most AI tools are extraordinarily bad at helping people actually use that power. I focus on closing the gap between what AI can do and what people need it to do.

Contact: ${CONTACT_EMAIL}
`;
    case "/contact":
      return `# Contact

If you're working on applied AI, marketing technology, design engineering, or human-computer interaction, let's talk.

- Email: ${CONTACT_EMAIL}
- X: https://x.com/bridgertower
- LinkedIn: https://linkedin.com/in/brijr
- Schedule: https://cal.com/brijr/30min
`;
    case "/work":
      return `# Work

Selected clients and open source from ${SITE_NAME}.

Clients include Vercel, Browserbase, Julius.ai, Laravel, Route, Tackle.io, and others.

Open source includes Craft Design System, Cite, Design Books, Next WP, and related tools.

See the HTML page at ${SITE_URL}/work for the full list.
`;
    case "/work-with-me":
      return `# Work with me

I'm a design engineer. I design and build interfaces, systems, and AI-powered tools for software companies.

I work on projects, retainers, and advisory engagements.

- Email: ${CONTACT_EMAIL}
- Schedule: https://cal.com/brijr/30min
`;
    case "/posts":
      return postsIndexMarkdown();
    default:
      return null;
  }
}

export async function getPageMarkdown(path: string): Promise<string | null> {
  if (path === "/" || path === "") {
    return readLlmsTxt();
  }

  const staticMarkdown = staticPageMarkdown(path);
  if (staticMarkdown) {
    return staticMarkdown;
  }

  const slug = path.replace(/^\//, "");
  const post = getPostBySlug(slug);
  if (post?.published) {
    if (post.raw) {
      return post.raw;
    }
    return `# ${post.title}

${post.description ?? ""}

Published: ${post.date}

${SITE_URL}${post.permalink}
`;
  }

  return null;
}
