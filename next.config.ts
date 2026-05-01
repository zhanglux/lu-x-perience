import type { NextConfig } from "next";

// basePath must match your GitHub repo name for project sites (username.github.io/repo-name)
// Set to "" for local dev so the app works at localhost:3000/
const basePath = process.env.NODE_ENV === "production" ? "/lu-x-perience" : "";
const assetPrefix = basePath ? `${basePath}/` : undefined;

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  ...(assetPrefix && { assetPrefix }),
};

export default nextConfig;
