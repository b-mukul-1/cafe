import type { NextConfig } from "next";

/**
 * Static export configuration for A2 Cafe.
 * Architecture Note:
 * When adding /dashboard, backend routes, or server-side ordering later:
 * Set NEXT_OUTPUT_MODE='standalone' or drop output: 'export' below.
 */
const isStaticExport = process.env.NEXT_OUTPUT_MODE !== "standalone";

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: "export" } : {}),
  trailingSlash: true,
  images: {
    // next/image optimization requires a Node.js server.
    // For static export, unoptimized is set to true and assets are pre-optimized at build time.
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
