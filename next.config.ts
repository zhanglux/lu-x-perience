import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // GitHub Pages requires basePath for repo subdirectory
  basePath: "/lu-x-perience",
  assetPrefix: "/lu-x-perience/",
};

export default nextConfig;
