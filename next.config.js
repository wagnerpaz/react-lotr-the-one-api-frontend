/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects() {
    return [
      {
        source: "/",
        destination: "/movies",
        permanent: true,
      },
    ];
  },
  images: { domains: ["image.tmdb.org"] },
};

module.exports = nextConfig;
