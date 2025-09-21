import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Ensure API routes work properly in Azure Static Web Apps
  trailingSlash: false,
};

export default nextConfig;
