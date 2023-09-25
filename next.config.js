/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true', // Set ANALYZE=true in your environment to enable bundle analysis
});

const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },

  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/user',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/auth/user',
        permanent: true,
      },
    ];
  },

  // Uncoment to add domain whitelist
  images: {
    domains: [
      'res.cloudinary.com',
      'firebasestorage.googleapis.com',
      'placeimg.com',
      'picsum.photos',
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    return config;
  },
};

//* To run bundle analyzer run "ANALYZE=true yarn build" in terminal
module.exports = withBundleAnalyzer(nextConfig);
