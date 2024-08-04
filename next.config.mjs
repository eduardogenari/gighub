/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s1.ticketm.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.ticketmaster.eu",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.universe.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
