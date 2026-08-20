"use client";

import { useEffect } from "react";

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
    additionalProperties?: boolean;
  };
  execute: (args: Record<string, unknown>) => Promise<unknown> | unknown;
}

interface ModelContext {
  registerTool?: (
    tool: WebMcpTool,
    options?: { signal?: AbortSignal },
  ) => Promise<void> | void;
  provideContext?: (context: { tools: WebMcpTool[] }) => Promise<void> | void;
}

function getModelContext(): ModelContext | null {
  const nav = navigator as Navigator & { modelContext?: ModelContext };
  const doc = document as Document & { modelContext?: ModelContext };
  return nav.modelContext ?? doc.modelContext ?? null;
}

const pages = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/work-with-me", label: "Work with me" },
];

function tools(): WebMcpTool[] {
  return [
    {
      name: "list_pages",
      description: "List the main pages on bridger.to",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      execute: () => ({ pages }),
    },
    {
      name: "list_posts",
      description: "List published essays",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      execute: async () => {
        const response = await fetch("/api/posts");
        return response.json();
      },
    },
    {
      name: "navigate_site",
      description: "Navigate the browser to a path on this site",
      inputSchema: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Site path such as /posts or /about",
          },
        },
        required: ["path"],
        additionalProperties: false,
      },
      execute: (args) => {
        const path = typeof args.path === "string" ? args.path : "/";
        window.location.assign(path);
        return { navigated: path };
      },
    },
    {
      name: "get_contact",
      description: "Get Bridger Tower's contact details",
      inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      execute: () => ({
        email: "bt@wip.is",
        schedule: "https://cal.com/brijr/30min",
        x: "https://x.com/bridgertower",
        github: "https://github.com/brijr",
      }),
    },
    {
      name: "subscribe_newsletter",
      description: "Subscribe an email address to Bridger Tower's newsletter",
      inputSchema: {
        type: "object",
        properties: {
          email: { type: "string", description: "Email address to subscribe" },
        },
        required: ["email"],
        additionalProperties: false,
      },
      execute: async (args) => {
        const email = typeof args.email === "string" ? args.email : "";
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            source: "https://bridger.to",
            userGroup: "bridger.to",
          }),
        });
        return response.json();
      },
    },
  ];
}

export function WebMcp() {
  useEffect(() => {
    const controller = new AbortController();
    const context = getModelContext();
    if (!context) return;

    const registered = tools();

    const run = async () => {
      if (typeof context.provideContext === "function") {
        await context.provideContext({ tools: registered });
        return;
      }

      if (typeof context.registerTool === "function") {
        for (const tool of registered) {
          await context.registerTool(tool, { signal: controller.signal });
        }
      }
    };

    void run();
    return () => controller.abort();
  }, []);

  return null;
}
