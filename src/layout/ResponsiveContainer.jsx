'use client'
import { useEffect, useState, createContext } from 'react'
import { HomeIcon, CogIcon, InformationCircleIcon } from '@heroicons/react/outline';

import environment from '../utils/environment'
import presets from '@/utils/globalPresets'
import dynamic from 'next/dynamic'
import useLoading from '../hooks/useLoading'
import useHasMounted from '../hooks/useHasMounted'
import useI18n from '../hooks/useI18n'

export const LayoutContext = createContext()

const Footer = dynamic(() => { return import("vComponents/dist/Footer") }, { ssr: false })
const Navbar = dynamic(() => { return import("vComponents/dist/Navbar") }, { ssr: false })
const Sidebar = dynamic(() => { return import("vComponents/dist/Sidebar") }, { ssr: false })

const ResponsiveContainer = ({ children }) => {
  // const router = useRouter()
  const loading = useLoading()
  const i18n = useI18n()
  const hasMounted = useHasMounted()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [menu, setMenu] = useState([])
  const [title, setTitle] = useState('')
  const [userObj, setUserObj] = useState()
  const [token, setToken] = useState('')
  
  const doLogout = async () => {
    const redirectPath = await environment.logout()
    setUserObj(null)
    router.push(redirectPath)
  }

  const onBackKeyDown = () =>{
    if (router.asPath === '/') {
      // cuando esta en la pagina principal cierra la app
      if (navigator.app) {
        navigator.app.exitApp()
      } else if (navigator.device) {
        navigator.device.exitApp()
      } else {
        window.close()
      }
    } else {
      window.history.back()
    }
  }









  const containerWrapper = {
    userObj: userObj,
    setUserObj: setUserObj,
    token: token,
    setToken: setToken
  }



  useEffect(() => {
    if (process.browser && window.cordova) {
      document.addEventListener("backbutton", onBackKeyDown, false)
    }
  })

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
    <LayoutContext.Provider value={containerWrapper}>
      <div className="flex h-screen overflow-hidden">
        
        {/* Sidebar */}
        
          <Sidebar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
            menu={menuEjemplo} 
            sidebarStyles={'via-bg-sidebar'} 
            optionStyles={'text-base font-normal via-options-sidebar'} 
            suboptionStyles={'text-sm font-normal via-suboptions-sidebar'} 
            onClickLogout={() => doLogout()}
            setTitle={setTitle}
            userObj={userObj}
            
            presets={presets}
            // router={router}
            i18n={i18n}
          />
     

        {/* Content area */}
        <div className={`${sidebarOpen ? 'relative' : 'absolute'} flex flex-col flex-1 overflow-y-auto overflow-x-hidden w-full`}>
          
          {/*  Site header */}
          
            <Navbar 
              sidebarOpen={sidebarOpen} 
              setSidebarOpen={setSidebarOpen}
              navbarStyles="border-b via-navbar" 
              menuButtonStyles="via-menu-btn-navbar"
              userMenuButtonStyles="via-usermenu-btn-navbar"
              userOptionStyles="via-useroptions-navbar"
              userOptionSelectedStyles="via-useroptions-selected-navbar"
              onClickLogout={() => doLogout()}
              onClickProfile={() => router.push(`${presets.locations.profile}`)}
              title={title}
              userObj={userObj}
              // router={router}
              presets={presets}
              />
          

          
          <main>
            <div className={userObj && userObj.nombre_usuario ? "px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto bg-gray-100  mb-10" : ''}>
              {children}
            </div>
          </main>
        </div>
        
      </div>
      <Footer />
    </LayoutContext.Provider>
  )
}

export default ResponsiveContainer
