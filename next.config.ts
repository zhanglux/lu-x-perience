import type { NextConfig } from "next";
import { resolveSiteBasePath } from "./src/lib/siteBasePath";

const basePath = resolveSiteBasePath();

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
};

export default nextConfig;
