import type { NextConfig } from "next";
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: false,
});

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPWA(nextConfig);
