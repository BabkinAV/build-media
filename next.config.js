/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
	images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_SOURCE ],
  },
}

module.exports = nextConfig
