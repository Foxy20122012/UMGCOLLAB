'use client'
import React, { ReactNode, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Importa useRouter para manejar la redirección
import "../styles/globals.css";
import I18nProvider from '../plugins/i18nContext';
import LoadingProvider from '../plugins/LoadingContext';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    // Verifica si existe un token en localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirige al usuario a /auth/login si no hay token
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <html lang="en">
      <body>
        <I18nProvider locale="es">
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
