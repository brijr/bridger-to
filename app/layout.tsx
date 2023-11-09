import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://bridger.to"),
  title: "Bridger Tower | Designer and Developer",
  description:
    "Bridger Tower is a designer, developer, and marketer from Salt Lake City, UT. Crafting software and websites using Next.js, Tailwind, and Vercel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
        <meta name="twitter:image" content="<generated>" />
        <meta name="twitter:image:type" content="<generated>" />
        <meta name="twitter:image:width" content="<generated>" />
        <meta name="twitter:image:height" content="<generated>" />
      </head>
      <body
        className={`${manrope.className} w-screen min-h-screen bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-100 text-neutral-800`}
      >
        {children}
      </body>
    </html>
  );
}
