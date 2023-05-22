/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/admin',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/auth/admin',
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

  // SVGR
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
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

module.exports = nextConfig;
