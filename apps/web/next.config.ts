import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    webpackBuildWorker: true
  },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true
  }
}

export default nextConfig
