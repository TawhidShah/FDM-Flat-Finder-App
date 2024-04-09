/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "swepffa.s3.amazonaws.com",
      },
      {
        hostname: "swepffa.s3.eu-west-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
