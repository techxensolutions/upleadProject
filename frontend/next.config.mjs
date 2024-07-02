import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.uplead.com",
      "v.fastcdn.co",
      "png.pngtree.com",
      "res.cloudinary.com",
    ],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias["@"] = path.resolve(".");
    return config;
  },
};

export default nextConfig;
