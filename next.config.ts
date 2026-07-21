import type { NextConfig } from "next";
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: false,
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPWA(nextConfig);
