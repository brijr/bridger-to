import "./globals.css";

import { Inter_Tight as FontSans } from "next/font/google";
import { EmailCopyButton } from "@/components/site/email-copy-button";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { Layout, Main, Section, Container } from "@/components/ds";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import { Logo } from "@/components/site/logo";
import { LiveClock } from "@/components/site/live-clock";
import { HeroWrapper } from "@/components/site/hero-wrapper";
import { WorkWithMeCta } from "@/components/site/work-with-me-cta";
import { WebMcp } from "@/components/site/webmcp";

import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  TWITTER_HANDLE,
  pageAlternates,
} from "@/lib/site";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const defaultTitle = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bridger.to",
  ),
  title: {
    default: defaultTitle,
    template: "%s | Bridger Tower",
  },
  description: SITE_DESCRIPTION,
  // Pages set their own canonical via pageAlternates(path); this fallback
  // only carries the RSS autodiscovery link.
  alternates: pageAlternates(),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: defaultTitle,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1500,
        height: 1000,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: defaultTitle,
    description: SITE_DESCRIPTION,
    images: ["/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <head>
        <link rel="api-catalog" href="/.well-known/api-catalog" />
        <link rel="service-desc" href="/openapi.json" type="application/json" />
        <link rel="service-doc" href="/docs/api" type="text/markdown" />
        <link rel="describedby" href="/llms.txt" type="text/plain" />
        <link rel="ai-catalog" href="/.well-known/ai-catalog.json" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col leading-tight overflow-x-hidden",
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <WebMcp />
          <LenisProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-background focus:px-3 focus:py-2 focus:rounded"
            >
              Skip to content
            </a>
            <Logo className="block fixed top-6 left-6" />
            <EmailCopyButton className="fixed top-6 right-6" />
            <Main id="main" className="flex-1 scroll-mt-24">
              <Section>
                <Container className="space-y-8">
                  <HeroWrapper />
                </Container>
              </Section>
              {children}
            </Main>
            <ThemeToggle className="fixed bottom-6 right-6" />
            <WorkWithMeCta />
            <Footer />
            <Toaster position="top-center" />
          </LenisProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </Layout>
  );
}

const Footer = () => {
  return (
    <footer className="hidden sm:block fixed bottom-6 left-6 text-muted-foreground text-sm">
      &copy; <LiveClock />
    </footer>
  );
};
