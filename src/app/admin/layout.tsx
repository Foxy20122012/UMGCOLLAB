import React, { ReactNode } from 'react';
import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import { Inter } from "next/font/google";
import ResponsiveContainer from '@/layout/ResponsiveContainer'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ADMIN",
  description: "Seccion del Administrador",
};

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {

  return (
    <>
      {/* Aquí puedes agregar la barra de navegación de admin, sidebar, etc. */}
      <main>
      <ResponsiveContainer>
        {children}
        </ResponsiveContainer>
        </main>
      {/* Aquí puedes agregar el footer de admin si es necesario */}
    </>
  );
};

export default AdminLayout;
