import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_RAPID_API_KEY: process.env.NEXT_PUBLIC_RAPID_API_KEY,
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "**",
      },
    ],
  },
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/proxy/:slug*",
        destination: "https://jsearch.p.rapidapi.com/:slug*",
      },
    ];
  },
};

export default nextConfig;
