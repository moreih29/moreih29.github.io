import type { NextConfig } from 'next'

const isDev = process.argv.indexOf('dev') !== -1
if (!process.env.VELITE_STARTED && isDev) {
  process.env.VELITE_STARTED = '1'
  import('velite').then(m => m.build({ watch: true, clean: false }))
}

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}

export default nextConfig
