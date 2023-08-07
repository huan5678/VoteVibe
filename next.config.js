/** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa')({
//   dest: 'public'
// })

// const nextConfig = {
//   reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
// }

// module.exports = withPWA({
//   ...nextConfig
// })

const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    esmExternals: 'loose',
  },
  transpilePackages: ['react-md-editor'],
  images: {
    domains: ['kcpwjljussfyxrzkkzoe.supabase.co'],
  },
};

const removeImports = require("next-remove-imports")();

module.exports = removeImports(nextConfig);
