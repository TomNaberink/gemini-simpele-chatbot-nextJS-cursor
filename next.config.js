/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(
        new config.webpack.IgnorePlugin({
          resourceRegExp: /\.pdf$/,
          contextRegExp: /pdf-parse\/test\/data/,
        })
      );
    }
    return config;
  }
}

module.exports = nextConfig