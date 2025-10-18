/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  webpack(config) {
    config.cache = {
      type: 'memory',
    };
    return config;
  },
};

module.exports = nextConfig;
