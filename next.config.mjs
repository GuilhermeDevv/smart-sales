/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/smart-sales',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
