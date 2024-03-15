import React, { ReactNode } from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import I18nProvider from '@/plugins/i18nContext'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ADMIN",
  description: "Seccion del Administrador y gestor de la pagina",
};

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      
      <main>
      <I18nProvider locale="es">
        {children}
        </I18nProvider>
        </main>
      
    </>
  );
};

export default AdminLayout;
