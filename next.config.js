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
    domains: ['res.cloudinary.com', 'firebasestorage.googleapis.com'],
  },

  // SVGR
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

    return config;
  },
};

module.exports = nextConfig;
