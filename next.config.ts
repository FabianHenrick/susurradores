/** @type {import('next').Config} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "imghost.com.br", // Adicione outros domínios que você usa
      },
    ],
  },
};

export default nextConfig;
