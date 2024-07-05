/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/airbnb-clone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "kxhvwvdwskxrzqheqjwo.supabase.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api.mapbox.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
