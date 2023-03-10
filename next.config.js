/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
	images: {
    domains: ['localhost', 'raybeckmedia.site' ],
  },
}

module.exports = nextConfig
