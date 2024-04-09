/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "swepffa.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
