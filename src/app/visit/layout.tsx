import React, { ReactNode } from 'react';
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "ESTUDIANTES",
  description: "Generated by create next app",
};

type Props = {
  children: ReactNode;
};

const VisitLayout = ({ children }: Props) => {
  return (
    <>
      {/* Aquí puedes agregar la barra de navegación de admin, sidebar, etc. */}
      <main>{children}</main>
      {/* Aquí puedes agregar el footer de admin si es necesario */}
    </>
  );
};

export default VisitLayout;
