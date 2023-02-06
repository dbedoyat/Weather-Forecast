/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.pexels.com", "api.weather.gov"],
  },
};

module.exports = nextConfig;
