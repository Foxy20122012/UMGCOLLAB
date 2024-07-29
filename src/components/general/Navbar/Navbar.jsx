import React from 'react'
import { Bars3Icon, HomeIcon } from '@heroicons/react/24/solid'
// import { useRouter } from 'next/router'
// import useI18n from '../hooks/useI18n'
import UserMenu from '../../../components/general/UserMenu/UserMenu'
//import UserMenu from '@/components/general/UserMenu/UserMenu'
// import presets from '../utils/globalPresets'
import PropTypes from 'prop-types'

Navbar.propTypes = {
  sidebarOpen: PropTypes.bool,
  setSidebarOpen: PropTypes.func,
  navbarStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  menuButtonStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  userMenuButtonStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  userOptionStyles: PropTypes.string,
  userOptionSelectedStyles: PropTypes.string,
  onClickLogout: PropTypes.func,
  onClickProfile: PropTypes.func,
  userObj: PropTypes.object,
  title: PropTypes.string,
  router: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  presets: PropTypes.object,
  MenuOptions: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  CenterContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}

// From https://reactjs.org/docs/hooks-state.html
export default function Navbar ({ sidebarOpen, setSidebarOpen, navbarStyles, menuButtonStyles, userMenuButtonStyles, userOptionStyles, userOptionSelectedStyles, onClickLogout, onClickProfile, userObj, title, router = [], presets, MenuOptions, CenterContent }) {
  // , i18n = { t: () => { return 'txtNone' } }
  // const i18n = useI18n()
  // const router = useRouter()
  const homePath = presets.locations.welcome
  return (
    <header className={`sticky top-0 z-30 w-full ${Array.isArray(navbarStyles) ? navbarStyles.join(' ') : navbarStyles}`}>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-12 -mb-px'>
          {/* Header: Left side */}
          <div className='flex'>
            {/* Hamburger button */}
            <button
              className={Array.isArray(menuButtonStyles) ? menuButtonStyles.join(' ') : menuButtonStyles}
              aria-controls='sidebar'
              aria-expanded={sidebarOpen}
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen) }}
            >
              <div className='sr-only'>Open sidebar</div>
              <Bars3Icon className='w-6 h-6 fill-current' />
            </button>
            {/* titulo */}
            <h6 className='pl-2 hidden md:block cursor-pointer' onClick={() => router.push(homePath)}>
              {userObj ? userObj.compania : ''}
            </h6>
            <HomeIcon className='w-7 h-7 pl-2 md:hidden cursor-pointer' onClick={() => router.push(homePath)} />
          </div>
          { CenterContent ? CenterContent() : '' }
          {/* Header: Right side */}
          <div className='flex items-center'>
            {/* titulo */}
            <h5>
              {title}
            </h5>
            {/* search */}
            {/* icons */}
            {/*  Divider */}
            <hr className='w-px h-6 bg-slate-200 mx-3' />
            <UserMenu
              menuButtonStyles={userMenuButtonStyles}
              optionStyles={userOptionStyles}
              optionSelectedStyles={userOptionSelectedStyles}
              onClickLogout={() => onClickLogout()}
              onClickProfile={() => onClickProfile()}
              userObj={userObj}
            >
              { MenuOptions ? MenuOptions() : ''}
            </UserMenu>
          </div>
        </div>
      </div>
    </header>
  )
}