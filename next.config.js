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
    serverActions: true,
    appDir: true,
    esmExternals: 'loose',
  },
  transpilePackages: ['react-md-editor'],
};

const removeImports = require('next-remove-imports')();

module.exports = removeImports(nextConfig);
