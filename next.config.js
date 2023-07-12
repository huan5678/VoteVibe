/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
}

module.exports = withPWA({
  ...nextConfig
})
