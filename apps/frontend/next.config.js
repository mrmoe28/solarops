/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@solarops/shared', '@solarops/ui'],
}

module.exports = nextConfig