/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose", "jsonwebtoken"], // <-- and this
  },
};

module.exports = nextConfig;
