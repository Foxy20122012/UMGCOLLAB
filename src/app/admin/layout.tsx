'use client'
import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import I18nProvider from '../../plugins/i18nContext';
import LoadingProvider from '../../plugins/LoadingContext';
import { ToastContainer } from 'react-toastify';
import Sidebar from '../../layouts/Sidebar';
import menuItems from '../../utils/menuAdminItems';

type Props = {
  children: ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const router = useRouter();

 
  return (
    <>
      <main>
        <I18nProvider locale="es">
          <LoadingProvider>
            <Sidebar menuItems={menuItems}>
              {children}
            </Sidebar>
            <ToastContainer position="bottom-center" style={{ top: '50%', transform: 'translateY(-50%)' }} />
          </LoadingProvider>
        </I18nProvider>
      </main>
    </>
  );
};

export default AdminLayout;
