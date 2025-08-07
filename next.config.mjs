import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // You can add any other Next.js configurations here
  reactStrictMode: true,
  
  webpack: (config, { isServer }) => {
    // This configuration tells Webpack to resolve the '@' alias to the 'src' directory
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

export default nextConfig;
