const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bridger.to";

const linkHeader = [
  `<${siteUrl}/.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"`,
  `<${siteUrl}/openapi.json>; rel="service-desc"; type="application/json"`,
  `<${siteUrl}/docs/api>; rel="service-doc"; type="text/markdown"`,
  `<${siteUrl}/llms.txt>; rel="describedby"; type="text/plain"`,
  `<${siteUrl}/.well-known/ai-catalog.json>; rel="ai-catalog"; type="application/json"`,
].join(", ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so Turbopack doesn't infer it from the
  // multiple lockfiles sitting in this directory.
  turbopack: {
    root: import.meta.dirname,
  },
  async headers() {
    const discoveryHeaders = [
      { key: "Link", value: linkHeader },
      {
        key: "Content-Signal",
        value: "ai-train=yes, search=yes, ai-input=yes",
      },
    ];

    return [
      {
        source: "/",
        headers: discoveryHeaders,
      },
      {
        source: "/:path*",
        headers: discoveryHeaders,
      },
      {
        source: "/.well-known/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, HEAD, OPTIONS",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/x",
        destination: "https://x.com/bridgertower",
        permanent: true,
      },
      {
        source: "/yt",
        destination: "https://youtube.com/@bridgertower",
        permanent: true,
      },
      {
        source: "/youtube",
        destination: "https://youtube.com/@bridgertower",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://linkedin.com/in/brijr",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/brijr",
        permanent: true,
      },
      {
        source: "/30",
        destination: "https://cal.com/brijr/30min",
        permanent: true,
      },
      {
        source: "/craft",
        destination: "https://craft-ds.com",
        permanent: true,
      },
      {
        source: "/strava",
        destination: "https://strava.app.link/PuEPNGFusZb",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
