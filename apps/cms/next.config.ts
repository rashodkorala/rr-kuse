import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@rr-kuse/ui"],
  experimental: {
    serverActions: {
      bodySizeLimit: "15mb",
    },
    proxyClientMaxBodySize: "15mb",
  },
};

export default nextConfig;
