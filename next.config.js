/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Handle pdf-parse test files on server-side
      config.resolve.alias['./test/data/05-versions-space.pdf'] = false;
    }
    return config;
  }
}

module.exports = nextConfig