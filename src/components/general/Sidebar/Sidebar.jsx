'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, ArrowLeftOnRectangleIcon, XMarkIcon, Bars3Icon, UserCircleIcon } from '@heroicons/react/20/solid'
import * as iconsFc from 'react-icons/fc'
import * as iconsMd from 'react-icons/md'
import * as HeroIcons from '@heroicons/react/24/solid'
import mq from 'js-mq'
import { useRouter } from 'next/router';

import PropTypes from 'prop-types'

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool,
  setSidebarOpen: PropTypes.func,
  menu: PropTypes.array,
  sidebarStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  optionStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  iconOptionStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  suboptionStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  iconSuboptionStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onClickLogout: PropTypes.func,
  companyObj: PropTypes.object,
  userObj: PropTypes.object,
  setTitle: PropTypes.func,
  i18n: PropTypes.object,
  router: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  environment: PropTypes.object,
  presets: PropTypes.object,
  appTitleStyles: PropTypes.string,
  userInfoStyles: PropTypes.string
}

// funcion que agrupa un vector de objetos por un campo y lo convierte en arbol
const nest = (items, idMenu = null, link = 'id_menu_padre') =>
  items
    .filter(item => item[link] === idMenu)
    .map(item => ({
      ...item,
      children:
          nest(items, item.id_menu).length <= 0
            ? undefined
            : nest(items, item.id_menu)
    }))

const fontSizeClass = ' xs:text-md sm:text-md md:text-md lg:text-base xl:text-base '

// From https://reactjs.org/docs/hooks-state.html
export default function Sidebar ({ sidebarOpen, setSidebarOpen = () => {}, menu, sidebarStyles, optionStyles = fontSizeClass, iconOptionStyles, suboptionStyles = fontSizeClass, iconSuboptionStyles, onClickLogout, companyObj, userObj, setTitle, i18n = { t: () => { return 'txtNone' } }, router = [], environment = {}, presets, appTitleStyles = '', userInfoStyles = fontSizeClass }) {
  const trigger = useRef(null)
  const sidebar = useRef(null)
  const [options, setOptions] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  

  const getFontSize = (base) => {
    if (base != null &&
        (base.includes('text-xs') || base.includes('text-sm') || base.includes('text-base') || base.includes('text-md') || base.includes('text-lg') || base.includes('text-xl'))) {
      return ''
    }
    return fontSizeClass
  }

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    const menus = nest(menu)
    // console.log('menu', menus)
    setOptions(menus)
  }, [menu])

  useEffect(() => {
    registrarBreckpoint()
  }, [])
  
  /* eslint-disable */
  const registrarBreckpoint = () => {
    if (typeof document !== undefined) {
      try {
        mq.register([
      /* eslint-enable */
          { name: 'mobile', query: '(max-width: 767px)' },
          { name: 'desktop', query: '(min-width: 768px)' }
        ])
        mq.on('mobile', (e) => {
          setIsMobile(true)
        })
        mq.on('desktop', (e) => {
          setIsMobile(false)
        })
        const arrayEstadoMq = mq.getState()
        if (arrayEstadoMq.length && (arrayEstadoMq[0] === 'not-mobile' || arrayEstadoMq[0] === 'desktop')) {
          setIsMobile(false)
        } else {
          setIsMobile(true)
        }
      } catch (e) {
        console.error(`Error al registrar mq breackpoints - ${e.message}`)
      }
    }
  }

  const getSidebarClass = () => {
    let resultCss = ''
    if (isMobile === true) {
      resultCss = `flex flex-col z-60 top-1/3 h-4/6 overflow-y-auto w-full  shrink-0 p-4 rounded-md duration-[400ms] ease-in-out
        ${sidebarOpen ? 'translate-y-0 fixed' : '  transform translate-y-[100vh] fixed'} `
    } else {
      resultCss = `flex flex-col z-40 left-0 top-0 h-screen overflow-y-auto w-64  shrink-0 p-4 transition-all duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0 relative' : '-translate-x-64 absolute'} `
    }
    return resultCss
  }

  const setSelected = (option) => {
    const menus = options.slice();
    const idx = menus.indexOf(option);
    option.isSelected = option.isSelected ? !option.isSelected : true;
    menus.splice(idx, 1, option);
    setOptions(menus);
    if (option.path && option.path !== null) {
      setTitle(option.title);
      setSidebarOpen(false);
      console.log(router); // Deberías ver el objeto del router de Next.js aquí
      console.log('Router object:', router);
      router.push(option.path);
    }
  };
  

  const setSelectedSubOption = (option, suboption) => {
    const menus = options.slice();
    const idxOption = menus.indexOf(option);
    const idxSubOption = option.children.indexOf(suboption);
    suboption.isSelected = suboption.isSelected ? !suboption.isSelected : true;
    option.children.splice(idxSubOption, 1, suboption);
    setTitle(suboption.title);
    menus.splice(idxOption, 1, option);
    setOptions(menus);
    setSidebarOpen(false);
    router.push(suboption.path); // Modificado aquí
  };
  

  /* eslint-disable */
  const SubMenuOption = ({ option }) => {
   
    if (option.children && option.children.length > 0 && option.isSelected === true) {
      return (
        <ul id='dropdown-example' className='ml-1 py-1 space-y-1'>
          {option.children.map((suboption) => {
            if (suboption.type === 'divisor') {
              return (<li key={suboption.id_menu}><hr /></li>)
            }
            //Iconos subMenu
            const getIcono = (item) => {
              try {
                const IconComponent = HeroIcons[item.icon]
                if (IconComponent != null) {
                  return IconComponent
                }
                const IconComponentMd = iconsMd[item.icon]
                if (IconComponentMd != null) {
                  return IconComponentMd
                }
                const IconComponentFC = iconsFc[item.icon]
                if (IconComponentFC != null) {
                  return IconComponentFC
                }
                return null
              } catch (e) {
                return null
              }
            }
            let Icono = null
            if (suboption.icon) {
              Icono = getIcono(suboption)
            }
            return (
              <li key={suboption.id_menu} onClick={() => setSelectedSubOption(option, suboption)} title={suboption.title} className='cursor-pointer'>
                <div
                  className={`flex items-center p-2 pl-3 w-full truncate overflow-hidden rounded-lg transition duration-75 group cursor-pointer ${Array.isArray(suboptionStyles) ? suboptionStyles.join(' ') : suboptionStyles} ${getFontSize(suboptionStyles)}`}
                  title={suboption.title}
                >
                
                          {Icono && <Icono className={`h-7 w-7 text-white fill-current ${Array.isArray(iconSuboptionStyles) ? iconSuboptionStyles.join(' ') : iconSuboptionStyles}`} />}

                  <div className='inline-flex truncate text-ellipsis'>
                    {suboption.title}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )
    }
    return null
  }
  /* eslint-enable */

  const MenuOption = ({ option }) => {
    // Iconos Menu
    const getIcono = (item) => {
      try {
        const IconComponent = HeroIcons[item.icon]
        if (IconComponent != null) {
          return IconComponent
        }
        const IconComponentMd = iconsMd[item.icon]
        if (IconComponentMd != null) {
          return IconComponentMd
        }
        const IconComponentFC = iconsFc[item.icon]
        if (IconComponentFC != null) {
          return IconComponentFC
        }
        return null
      } catch (e) {
        return null
      }
    }
    let Icono = null
    if (option.icon) {
      Icono = getIcono(option)
    }
    if (option.type === 'titulo') {
      return (
        <>
          <button
            type='button'
            className={`flex items-center p-2 w-full rounded-lg transition duration-75 group ${Array.isArray(optionStyles) ? optionStyles.join(' ') : optionStyles} ${getFontSize(optionStyles)}`}
            aria-controls='dropdown-example' data-collapse-toggle='dropdown-example'
            title={option.title}
          >
            <div className='flex-1 ml-3 text-left whitespace-nowrap truncate text-ellipsis'>{option.title}</div>
            {Icono && <Icono className={`h-7 w-7 text-white fill-current ${Array.isArray(iconOptionStyles) ? iconOptionStyles.join(' ') : iconOptionStyles}`} />}
          </button>
        </>
      )
    }
    return (
      <>
        <button
          type='button'
          className={`flex items-center p-2 w-full rounded-lg transition duration-75 group ${Array.isArray(optionStyles) ? optionStyles.join(' ') : optionStyles}  ${getFontSize(optionStyles)}`}
          aria-controls='dropdown-example' data-collapse-toggle='dropdown-example'
          title={option.title}
          onClick={() => setSelected(option)}
        >

          {Icono && <Icono className={`h-7 w-7 text-white fill-current ${Array.isArray(iconOptionStyles) ? iconOptionStyles.join(' ') : iconOptionStyles}`} />}

          <div className='flex-1 ml-3 text-left whitespace-nowrap truncate text-ellipsis'>{option.title}</div>
          {option.children && option.children.length > 0 && <ChevronDownIcon className='h-6 w-6' />}
        </button>
        <SubMenuOption option={option} />
      </>
    )
  }
  MenuOption.propTypes = {
    option: PropTypes.object
  }

  return (
    <>
      {/* Sidebar backdrop (mobile only) bg-slate-900  */}
      <div
        className={`fixed inset-0 bg-opacity-30 z-40 md:hidden md:z-auto transition-opacity duration-200 
        ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${Array.isArray(sidebarStyles) ? sidebarStyles.join(' ') : sidebarStyles}`}
        aria-hidden='true'
        onClick={() => {setSidebarOpen(!sidebarOpen)}}
      />
      {/* Sidebar */}
      {/* lg:translate-x-0 lg:w-20 lg:static lg:left-auto lg:top-auto lg:overflow-y-auto lg:sidebar-expanded:!w-64 2xl:!w-64  */}
      <div
        id='sidebar'
        ref={sidebar}
        className={` ${ getSidebarClass() } ${Array.isArray(sidebarStyles) ? sidebarStyles.join(' ') : sidebarStyles}`}
      >
        {/* Expand / collapse button */}
        <div className='pt-0 justify-end md:hidden fixed top-4 right-6 '>
          <div className='px-3 py-2'>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <div className='sr-only'>Expand / collapse sidebar</div>
              <XMarkIcon className={`w-6 h-6 bg-white bg-opacity-50 rounded-md text-${presets.theme}-600`} />
            </button>
          </div>
        </div>

        {/* Sidebar header */}
        <div className='flex justify-between mb-10 pr-3 sm:px-2'>
          {/* Close button */}
          {/* <button
            ref={trigger}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple z-50
              border-2 rounded-full  ${!sidebarOpen && 'rotate-180'}`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls='sidebar'
            aria-expanded={sidebarOpen}
          >
            <div className='sr-only'>Close sidebar</div>
            {sidebarOpen
              ? <ArrowLeftIcon className='w-6 h-6 fill-current text-white' />
              : <ArrowRightIcon className='w-6 h-6 fill-current text-white' />
            }
          </button> */}
          {/* Logo */}
          <div className='flex gap-x-2 items-center' title='Versión 3.0.10'>
            <img
              src={presets.images.icon}
              className={`w-12 h-12 cursor-pointer duration-500 ${
                sidebarOpen && 'rotate-[360deg]'
              }`}
              alt={presets.appTitle}
              width={100}
              height={100}
            />
            <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!sidebarOpen && 'scale-0'} ${appTitleStyles} `}>
              {presets.appTitle}
            </h1>
          </div>
        </div>
        {/* user Info */}
        <div className={` flex w-full flex-col space-y-0  border-b-2 border-gray-300 text-gray-50 ${userInfoStyles} ${getFontSize(userInfoStyles)}`}>
          <div className='px-2 font-medium '> {userObj ? userObj.compania : ''} </div>
          <div className='px-2'>{userObj ? userObj.nombre_usuario : ''}</div>
          <div className='px-2 break-all '>{userObj ? userObj.email : ''}</div>
        </div>

        {/* Links */}
        <div className={`overflow-y-auto py-4 px-2 my-0 rounded ${Array.isArray(sidebarStyles) ? sidebarStyles.join(' ') : sidebarStyles}`}>
          <ul className='space-y-2'>
            {options.map((option) => {
              /* eslint-disable */
              return (
                <li key={option.id_menu + '_li'}>
                  {option.type === 'divisor' && <hr key={option.id_menu} />}
                  {option.type !== 'divisor' && <MenuOption option={option} key={option.id_menu} />}
                </li>
              )
              /* eslint-enable */
            })}
            <hr />
            <li>
              <button
                type='button'
                className={`flex items-center p-2 w-full rounded-lg transition duration-75 group ${Array.isArray(optionStyles) ? optionStyles.join(' ') : optionStyles} ${getFontSize(optionStyles)}`}
                aria-controls='dropdown-example' data-collapse-toggle='dropdown-example'
                onClick={() => onClickLogout()}
              >
                <ArrowLeftOnRectangleIcon className='h-6 w-6 pr-2' />
                <div className='flex-1 ml-3 text-left whitespace-nowrap'>{i18n.t('common.logout')}</div>
              </button>
            </li>
          </ul>
        </div>
      </div>
      { isMobile === true && 
        <div className="fixed z-60 right-3 bottom-3" v-if="isMobile" >
          <button
            id="vtDrawerButton"
            className={`bg-${presets.theme}-600  hover:bg-${presets.theme}-700 flex items-center justify-between px-2 py-2 font-normal leading-5 text-white transition-colors duration-150  border border-transparent rounded-lg active:bg-purple-600  focus:outline-none focus:shadow-outline-purple `}
            aria-label="Like"
            onClick={() => {setSidebarOpen(!sidebarOpen)}}
          >
            <Bars3Icon className='h-6 w-6' />
          </button>
        </div>
      }
    </>
  )
}