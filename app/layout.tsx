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

import type { Metadata } from "next";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bridger.to",
  ),
  title: {
    default: "Bridger Tower / Designer and Software Engineer",
    template: "%s | Bridger Tower",
  },
  description:
    "Bridger is a Design Engineer exploring user interface design, applied artificial intelligence, and human computer interaction.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Bridger Tower",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1500,
        height: 1000,
        alt: "Bridger Tower - Designer and Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased w-screen flex flex-col leading-tight",
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LenisProvider>
            <Logo className="block fixed top-6 left-6" />
            <EmailCopyButton className="fixed top-6 right-6" />
            <Main className="flex-1">
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
