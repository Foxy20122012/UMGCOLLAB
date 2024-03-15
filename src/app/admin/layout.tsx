import React, { ReactNode } from 'react';
import type { Metadata } from "next";
import dynamic from 'next/dynamic'
import { Inter } from "next/font/google";
import ResponsiveContainer from '@/layout/ResponsiveContainer'

const inter = Inter({ subsets: ["latin"] });
//@ts-ignore
const Sidebar = dynamic(() => { return import("vComponents/dist/Sidebar") }, { ssr: false })

export const metadata: Metadata = {
  title: "ADMIN",
  description: "Seccion del Administrador",
};

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {

  const menuEjemplo = [
    {
      id_menu: 1,
      title: 'Inicio',
      icon: 'HomeIcon', // Este debería ser el nombre de la exportación del icono de heroicons
      path: '/inicio',
    },
    {
      id_menu: 2,
      title: 'Configuración',
      icon: 'CogIcon',
      path: '/configuracion',
      id_menu_padre: null, // Esto indica que es un menú principal y no un submenú
      children: [
        {
          id_menu: 3,
          title: 'Usuarios',
          path: '/configuracion/usuarios',
          id_menu_padre: 2,
        },
        {
          id_menu: 4,
          title: 'Permisos',
          path: '/configuracion/permisos',
          id_menu_padre: 2,
        },
      ],
    },
    {
      id_menu: 5,
      title: 'Acerca de',
      icon: 'InformationCircleIcon',
      path: '/acerca-de',
    },
  ];
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
