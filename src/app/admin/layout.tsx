import React, { ReactNode } from 'react';
import type { Metadata } from "next";
import ResponsiveContainer from '@/layout/Admin/ResponsiveContainer'
import I18nProvider from '@/plugins/i18nContext'
import LoadingProvider from '@/plugins/LoadingContext'
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


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
      <I18nProvider locale="es">
      <LoadingProvider>
      <ResponsiveContainer>
      <ToastContainer   position="bottom-center" style={{ top: '50%', transform: 'translateY(-50%)' }}/>
        {children}
        </ResponsiveContainer>
        </LoadingProvider>
         </I18nProvider>
        </main>
      {/* Aquí puedes agregar el footer de admin si es necesario */}
    </>
  );
};

export default AdminLayout;
