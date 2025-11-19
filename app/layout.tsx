import "./globals.css";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { Layout, Main } from "@/components/ds";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/site/footer";
import { Inter_Tight as FontSans } from "next/font/google";

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
          "min-h-screen bg-background font-sans antialiased w-screen flex flex-col text-lg",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Main className="flex-1">{children}</Main>
          <Footer />
          <div className="fixed bottom-6 right-6">
            <ThemeToggle />
          </div>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </Layout>
  );
}
