import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'akmlnbfiezlrejskiuoe.supabase.co' },
    ],
  },
};

export default nextConfig;
