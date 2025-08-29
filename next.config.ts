import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imghost.com.br",
      },
    ],
  },
};
  /* config options here */

export default nextConfig;

