/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
          },
          {
            protocol: "https",
            hostname: "i.ibb.co.com",
          },
          {
            protocol: "https",
            hostname: "i.ibb.co",
          },
          {
            protocol: "https",
            hostname: "example.com",
          },
        ],
      },
};

export default nextConfig;
