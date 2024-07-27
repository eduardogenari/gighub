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
    ],
  },
};

export default nextConfig;
