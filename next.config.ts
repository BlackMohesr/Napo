import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "napo-api.mohesr.gov.ae",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
