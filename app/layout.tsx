import "./globals.css";

import { Inter_Tight as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Layout, Main, Section, Container } from "@/components/ds";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Logo } from "@/components/site/logo";
import { Toaster } from "@/components/ui/sonner";

import type { Metadata } from "next";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Bridger Tower / Designer and Software Engineer",
    template: "%s | Bridger Tower",
  },
  description:
    "Bridger is a Design Engineer exploring user interface design, applied artificial intelligence, and human computer interaction.",
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
          "min-h-screen bg-background font-sans antialiased w-screen flex flex-col",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Main className="flex-1">
            <Section>
              <Container>
                <Logo className="block" />
              </Container>
            </Section>
            {children}
          </Main>
          <ThemeToggle className="fixed bottom-6 right-6" />
          <Footer />
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </Layout>
  );
}

const Footer = () => {
  return (
    <footer className="fixed bottom-6 left-6 text-muted-foreground text-sm">
      &copy; {new Date().getFullYear()}
    </footer>
  );
};
