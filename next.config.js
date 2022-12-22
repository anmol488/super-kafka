/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "platform-lookaside.fbsbx.com"],
  },
  experimental: {
    appDir: true,
  },
};
