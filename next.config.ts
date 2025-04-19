// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Enable static export

  // ** IMPORTANT FOR GITHUB PAGES (If repo name is NOT <username>.github.io) **
  // Replace 'your-repo-name' with the actual name of your GitHub repository
  // For example, if your repo URL is https://github.com/8have5h/bhavesh-portfolio
  // basePath: '/bhavesh-portfolio',
  // assetPrefix: '/bhavesh-portfolio/',
  // basePath: '/8have5h.github.io',
  // assetPrefix: '/8have5h.github.io/',

  // If your repo IS 8have5h.github.io, comment out or remove basePath and assetPrefix.

  reactStrictMode: true,
  // You might need this if you decide to use next/image later with static export
  // images: {
  //   unoptimized: true,
  // },

  // Any other configurations you might have added
};

export default nextConfig;