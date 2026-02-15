import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@rr-kuse/ui"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
