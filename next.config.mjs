import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Other Next.js config options here if you have them
  // ...

  webpack: (config, { isServer }) => {
    // Configure Webpack to resolve aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    return config;
  },
};

export default nextConfig;
