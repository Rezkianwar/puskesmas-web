/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
      {
        protocol: 'https',
        hostname: 'www.freepik.com',
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/pelayanan',
        destination: '/homePage/pelayanan',
      },
      {
        source: '/berita',
        destination: '/homePage/berita',
      },
      {
        source: '/galery',
        destination: '/homePage/galery',
      },
      {
        source: '/pendaftaran',
        destination: '/homePage/pendaftaran',
      },
      {
        source: '/profile',
        destination: '/homePage/profile',
      },
      // Tambahkan mapping lainnya jika ada
    ];
  },
  experimental: {
  },
}

module.exports = nextConfig;
