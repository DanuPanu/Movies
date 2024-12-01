import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org", // TMDb:n kuvat palvelimelta
        pathname: "/t/p/**", // Kuvien polkujen malli
      },
    ],
  },
};

export default nextConfig;
