import type { NextConfig } from 'next'

// Ảnh tĩnh trong public/ có tên cố định, cache dài nhưng cho phép làm mới sau một tuần
const staticAssetHeaders = [
  { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Cho phép build/kiểm thử ở thư mục riêng, không đụng .next của dev server đang chạy
  distDir: process.env.NEXT_DIST_DIR || '.next',
  transpilePackages: ['sanity'],
  images: {
    // Ảnh Sanity dùng loader riêng (lib/sanity/loader.ts); cấu hình này áp dụng cho ảnh cục bộ trong public/
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    return [
      { source: '/images/:path*', headers: staticAssetHeaders },
      { source: '/favicon/:path*', headers: staticAssetHeaders },
    ]
  },
}

export default nextConfig
