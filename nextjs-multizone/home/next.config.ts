import type { NextConfig } from 'next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const shopZoneUrl = process.env.SHOP_ZONE_URL ?? 'http://localhost:3001';

const nextConfig: NextConfig = {
  turbopack: {
    root: dirname,
  },
  async rewrites() {
    return [
      {
        source: '/shop',
        destination: `${shopZoneUrl}/shop`,
      },
      {
        source: '/shop/:path*',
        destination: `${shopZoneUrl}/shop/:path*`,
      },
    ];
  },
};

export default nextConfig;
