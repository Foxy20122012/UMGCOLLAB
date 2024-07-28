'use client'

// Importaciones necesarias para los iconos
import { useEffect, useState, createContext } from 'react';
import { CogIcon, InformationCircleIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/navigation';
import Navbar from "../../components/general/Navbar/Navbar"
import presets from '../../utils/globalPresets';
import dynamic from 'next/dynamic';
import useLoading from '../../hooks/useLoading';
import useHasMounted from '../../hooks/useHasMounted';
import useI18n from '../../hooks/useI18n';
import Footer from "../../components/general/Footer/Footer"

export const LayoutContext = createContext();


const Sidebar = dynamic(() => import('../../components/general/Sidebar/Sidebar'), { ssr: false });

const ResponsiveContainer = ({ children }) => {
  // const router = useRouter()
  const loading = useLoading();
  const i18n = useI18n();
  const hasMounted = useHasMounted();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menu, setMenu] = useState([]);
  const [title, setTitle] = useState('');
  const [userObj, setUserObj] = useState();
  const [token, setToken] = useState('');
  const router = useRouter();
  


  useEffect(() => {
    if (!router) {
      setRouter(useRouter());
    }
  }, [router]);

  
  const doLogout = async () => {
    const redirectPath = await environment.logout();
    setUserObj(null);
    router.push(redirectPath);
  };

  const onBackKeyDown = () => {
    if (router.asPath === '/') {
      if (navigator.app) {
        navigator.app.exitApp();
      } else if (navigator.device) {
        navigator.device.exitApp();
      } else {
        window.close();
      }
    } else {
      window.history.back();
    }
  };

  const containerWrapper = {
    userObj: userObj,
    setUserObj: setUserObj,
    token: token,
    setToken: setToken
  };

  useEffect(() => {
    if (process.browser && window.cordova) {
      document.addEventListener('backbutton', onBackKeyDown, false);
    }
  });

  const menuOptions = [
    {
      id_menu: 1,
      title: 'Cursos',
      icon: 'UserCircleIcon',
      type: 'opcion',
      id_menu_padre: null,
    },
    {
      id_menu: 2,
      title: 'Cursos',
      icon: 'UserCircleIcon',
      path: '/admin/cursos',
      type: 'opcion',
      id_menu_padre: 1,
    },
    {
      id_menu: 3,
      title: 'Temas',
      icon: 'InformationCircleIcon',
      path: '/admin/topics',
      type: 'opcion',
      id_menu_padre: 1
    },
    {
      id_menu: 4,
      title: 'Post',
      icon: 'UserCircleIcon',
      type: 'opcion',
      id_menu_padre: null,
    },
    {
      id_menu: 5,
      title: 'Post Catedraticos',
      icon: 'UserCircleIcon',
      path: '/admin/cursos',
      type: 'opcion',
      id_menu_padre: 4,
    },
    {
      id_menu: 6,
      title: 'Post Alumnos',
      icon: 'InformationCircleIcon',
      path: '/admin/post',
      type: 'opcion',
      id_menu_padre: 4
    },
    {
      id_menu: 7,
      title: 'Post Ex-Alumnos',
      icon: 'InformationCircleIcon',
      path: '/admin/post',
      type: 'opcion',
      id_menu_padre: 4
    },
    {
      id_menu: 8,
      title: 'Pendientes de aprobar',
      icon: 'InformationCircleIcon',
      path: '/admin/post',
      type: 'opcion',
      id_menu_padre: 4
    },
    {
      id_menu: 9,
      title: 'Configuración',
      icon: 'CogIcon',
      type: 'opcion',
      id_menu_padre: null
    },
    {
      id_menu: 10,
      title: 'Intenacionalización I18n',
      icon: 'InformationCircleIcon',
      path: '/admin/i18n',
      type: 'opcion',
      id_menu_padre: 9
    },
    {
      id_menu: 11,
      title: 'Configuración',
      icon: 'CogIcon',
      path: '/admin/config',
      type: 'opcion',
      id_menu_padre: 9
    },
  ];

  const environment = {
    // otras propiedades y funciones...
    getTime: () => new Date().getTime(),
  };
  
  
  return (
    
    <LayoutContext.Provider value={containerWrapper}>
      <div className="flex h-screen overflow-hidden">
        
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
          menu={menuOptions}
          sidebarStyles={'via-bg-sidebar'} 
          optionStyles={'text-base font-normal via-options-sidebar'} 
          suboptionStyles={'text-sm font-normal via-suboptions-sidebar'} 
          onClickLogout={() => doLogout()}
          setTitle={setTitle}
          userObj={userObj}
          presets={presets}
          i18n={i18n}
          router={router}
        />

        <div className={`${sidebarOpen ? 'relative' : 'absolute'} flex flex-col flex-1 overflow-y-auto overflow-x-hidden w-full`}>
          
          <Navbar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
            navbarStyles="border-b via-navbar" 
            menuButtonStyles="via-menu-btn-navbar"
            userMenuButtonStyles="via-usermenu-btn-navbar"
            userOptionStyles="via-useroptions-navbar"
            userOptionSelectedStyles="via-useroptions-selected-navbar"
            onClickLogout={() => doLogout()}
            onClickProfile={() => router.push(`${presets.locations.profileAdmin}`)}
            title={title}
            userObj={userObj}
            presets={presets}
          />
          
          <main>
            <div className={userObj && userObj.nombre_usuario ? "px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto bg-gray-100  mb-10" : ''}>
              {children}
            </div>
          </main>
        </div>
        
      </div>
      <Footer 
      imageUrl="/icon.jpeg"
      autor='Instituto Francisco Marroquin'
      />
    </LayoutContext.Provider>
  );
};

export default ResponsiveContainer;
