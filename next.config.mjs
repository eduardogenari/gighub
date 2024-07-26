/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s1.ticketm.net', 'media.ticketmaster.eu'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s1.ticketm.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
