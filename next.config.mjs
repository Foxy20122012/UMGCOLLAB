
/** @type {import('next').NextConfig} */
const nextConfig = {
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