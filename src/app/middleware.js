import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('Middleware ejecutado'); // Verifica si se está ejecutando
  const token = request.cookies.get('token'); // Verifica la cookie 'token'

  console.log('Token en middleware:', token); // Para depurar

  if (!token) {
    console.log('Token no encontrado, redirigiendo a /auth/login');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/catedratico/:path*', '/example/:path*', '/student/:path*', '/visit/:path*'],
};
