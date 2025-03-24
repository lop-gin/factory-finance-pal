
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["@radix-ui"],
  webpack: (config) => {
    // Add support for importing SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // Maintain compatibility with existing path aliases
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig;
