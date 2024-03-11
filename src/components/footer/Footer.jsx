import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br bg-cyan-500  bg-blend-soft-light py-8 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          {/* Columna 1 */}
          <div>
        
            <a href="https://www.via-asesores.com" className="flex items-center md:flex md:justify-start md:mx-auto ml-auto ">
        <img
          src="https://www.via-asesores.com/logos/logo_vertical/viaasesores_vertical_logo.svg"
          className="h-12 mb-4"
          alt="VIA Asesores"
        />
      </a>
            <ul className="text-white dark:text-black font-medium">
            <li className="mb-4">
                <a href="/contactame" className="hover:underline">Contactos</a>
              </li>
              <li className="mb-4">
                <a href="/nosotros" className="hover:underline">Nosotros</a>
              </li>
              <li className="mb-4">
                <a href="/pres-Servicios" className="hover:underline">Servicios</a>
              </li>
            </ul>
          </div>

          {/* Columna 2 */}
          <div>
            <h2 className="mb-6 text-sm font-bold text-gray-900 uppercase dark:text-white">Linea Smart</h2>
            <ul className="text-white dark:text-gray-400 font-sans">
              <li className="mb-2">
                <a href="https://gt.via-asesores.com/smartmonitor/" className="hover:underline">Smart Monitor</a>
              </li>
              <li className="mb-2">
                <a href="https://gt.via-asesores.com/smartproject" className="hover:underline">Smart Project</a>
              </li>
              <li className="mb-2">
                <a href="https://gt.via-asesores.com/smartanalytics" className="hover:underline">Smart Analytics</a>
              </li>
              <li className="mb-2">
                <a href="https://gt.via-asesores.com/smartprocess" className="hover:underline">Smart Process</a>
              </li>
              <li className="mb-2">
                <a href="https://gt.via-asesores.com/desarrollo/smartbuy/" className="hover:underline">Smart Buy</a>
              </li>
              <li className="mb-2">
                <a href="https://gt.via-asesores.com/smartoperation" className="hover:underline">Smart Operation</a>
              </li>
              <li className="mb-2">
                <a href="https://gt.via-asesores.com/sp-login" className="hover:underline">Smart POS</a>
              </li>
            </ul>
          </div>

          {/* Columna 3 */}
          <div>
            <h2 className="mb-6 text-sm  text-gray-900 uppercase dark:text-white font-bold">Apps</h2>
            <ul className="text-white dark:text-gray-400 font-sans">
              <li className="mb-2">
                <a href="https://gt.mycitygt.com/mycity/" className="hover:underline">My City</a>
              </li>
              <li className="mb-2">
                <a href="https://gt.mycitygt.com/consulta/" className="hover:underline">My City - Consulta</a>
              </li>
              <li className="mb-2">
                <a href="https://ubicame-ya.com/" className="hover:underline">Ubicame</a>
              </li>
              <li className="mb-2">
                <a href="https://gt.cacaoshop.net/desarrollo/cacaoshop/" className="hover:underline">Cacao Shop</a>
              </li>
              <li className="mb-2">
                <a href="https://gt.jadepay.net/desarrollo/jadepay/" className="hover:underline">Jade Pay</a>
              </li>
              <li className="mb-2">
                <a href="https://gt.via-asesores.com/desarrollo/menuadmin/#/IniciarSesion" className="hover:underline">Viasa Admin</a>
              </li>
            </ul>
          </div>

          

          {/* Columna 4 */}
          <div>
            <h2 className="mb-6 text-sm font-bold text-gray-900 uppercase dark:text-white">Productos</h2>
            <ul className="text-white dark:text-gray-400 font-sans">
              <li className="mb-2">
                <a href="https://www.via-asesores.com/smartproject" className="hover:underline">Smart Project</a>
              </li>
              <li className="mb-2">
                <a href="https://www.via-asesores.com/smartbuy.html" className="hover:underline">Smart Buy</a>
              </li>
              <li className="mb-2">
                <a href="https://www.via-asesores.com/smartanalytics" className="hover:underline">Smart Analytics</a>
              </li>
              <li className="mb-2">
                <a href="https://www.via-asesores.com/smartoperation.html" className="hover:underline">Smart Operation</a>
              </li>
              <li className="mb-2">
                <a href="https://www.via-asesores.com/smartpos.html" className="hover:underline">ERP Contable</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2023 <a href="https://www.via-asesores.com/">Via Asesores</a>. </span>
        <div className="flex mt-4 space-x-5 sm:justify-center md:mt-0">
          <a href="https://www.facebook.com/VIAasesoresgt" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
              <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd"/>
            </svg>
            <span className="sr-only">Facebook page</span>
          </a>          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
