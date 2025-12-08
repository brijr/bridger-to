/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
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
    ];
  },
};

export default nextConfig;
