/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_NAME,
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    domains: [
      "k.kakaocdn.net",
      "cdn.discordapp.com",
      "ssl.pstatic.net",
      "lh3.googleusercontent.com",
    ],
  },
  reactStrictMode: false
};

module.exports = nextConfig;
