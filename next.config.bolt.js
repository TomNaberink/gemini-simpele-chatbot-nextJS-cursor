/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable dev indicators for cleaner Bolt experience
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  
  // Optimize for Bolt.new hosting environment
  webpack: (config, { isServer, dev }) => {
    // Browser-specific fallbacks for Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        child_process: false,
        worker_threads: false,
      };
      
      // Externalize problematic modules for client bundle
      config.externals = config.externals || [];
      config.externals.push({
        'pdf-parse': 'pdf-parse',
        'mammoth': 'mammoth'
      });
    }
    
    // Optimize bundle size
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // Disable source maps in production for faster builds
  productionBrowserSourceMaps: false,
  
  // Experimental features for better Bolt compatibility
  experimental: {
    esmExternals: 'loose',
    forceSwcTransforms: true,
  },
  
  // Transpile packages that might cause issues
  transpilePackages: ['pdf-parse', 'mammoth'],
  
  // Optimize images
  images: {
    domains: [],
    unoptimized: true, // Better for Bolt.new
  },
  
  // Output configuration
  output: 'standalone',
  
  // Build optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig; 