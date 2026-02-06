import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // If deploying to a subdirectory, uncomment and set your repo name:
  // basePath: "/lu-x-perience",
  // assetPrefix: "/lu-x-perience/",
};

export default nextConfig;
