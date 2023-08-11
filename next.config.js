/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "tpwylybqvkzcsrmbctnj.supabase.co",
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
  };

module.exports = nextConfig
