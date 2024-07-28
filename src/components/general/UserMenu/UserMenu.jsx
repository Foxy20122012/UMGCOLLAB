import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, UserIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid'
import UserAvatar from '@/components/general/UserAvatar/UserAvatar'
import PropTypes from 'prop-types'

UserMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  buttonStyles: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  optionStyles: PropTypes.string,
  optionSelectedStyles: PropTypes.string,
  onClickLogout: PropTypes.func,
  onClickProfile: PropTypes.func,
  userObj: PropTypes.object
}

// From https://reactjs.org/docs/hooks-state.html
export default function UserMenu ({ children, buttonStyles, optionStyles, optionSelectedStyles, onClickLogout, onClickProfile, userObj }) {
  return (
    <div className='text-right'>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button
            className={`inline-flex w-full justify-center rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${Array.isArray(buttonStyles) ? buttonStyles.join(' ') : buttonStyles}`}
          >
            {/* <UserCircleIcon className='h-6 w-6 pr-1' /> */}
            <UserAvatar fullName={userObj ? userObj.nombre_usuario : ''} />
            <ChevronDownIcon
              className='ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100'
              aria-hidden='true'
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            {/* user Info */}
            <div className='flex w-full flex-col space-y-0  border-b-2 border-gray-300 text-gray-800 text-xs'>
              <div className='px-2 font-medium '> {userObj ? userObj.compania : ''} </div>
              <div className='px-2'>{userObj ? userObj.nombre_usuario : ''}</div>
              <div className='px-2 break-all '>{userObj ? userObj.email : ''}</div>
            </div>
            { children }
            <div className='px-1 py-1 '>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? optionSelectedStyles : optionStyles
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => onClickProfile()}
                  >
                    <UserIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                    Profile
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className='px-1 py-1'>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? optionSelectedStyles : optionStyles
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => onClickLogout()}
                  >
                    <ArrowLeftOnRectangleIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                    Cerrar Sesión
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}