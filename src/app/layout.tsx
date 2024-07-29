
import type { Metadata } from "next";
import "../styles/globals.css";
import I18nProvider from '../plugins/i18nContext'
import LoadingProvider from '../plugins/LoadingContext'

export const metadata: Metadata = {
  title: "VISITANTE",
  description: "Sección de los visitantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <I18nProvider locale="es">
      <LoadingProvider>
        
          {children}
       
        </LoadingProvider>
         </I18nProvider>
         {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
