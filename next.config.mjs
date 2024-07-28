import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: 'https://umgcollab.azurewebsites.net/',
    JWT_SECRET: '4a5b9f8c67eafcd2d3b1e5270a84e6f1',
  },
  redirects() {
    return [
      {
        source: '/equipo',
        destination: '/',
        permanent: false,
      },
    ];
  },
  images: {
    domains: ['www.via-asesores.com', 'gt.via-asesores.com', 'qa.via-asesores.com'],
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
