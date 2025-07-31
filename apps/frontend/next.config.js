/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@solarops/shared', '@solarops/ui'],
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
  images: {
    domains: ['localhost'],
    unoptimized: false,
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig