import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Desactivé pour le développement local (permet le middleware)
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
