
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: 'https://localhost:3000',
    JWT_SECRET: '4a5b9f8c67eafcd2d3b1e5270a84e6f1',
  },
  redirects() {
    return [
      {
        source: '/equipo',
        destination: "/",
        permanent: false
      },
    ];
  },
  images: {
    domains: ['www.via-asesores.com', 'gt.via-asesores.com', 'qa.via-asesores.com'],
    unoptimized: true, // solo para generar sitio estático
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;