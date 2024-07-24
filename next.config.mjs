/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
