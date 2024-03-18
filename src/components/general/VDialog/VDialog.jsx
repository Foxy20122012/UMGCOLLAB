import React, { Fragment } from 'react'
import { XMarkIcon } from "@heroicons/react/24/solid"
import { Dialog, Transition } from '@headlessui/react'
import PropTypes from 'prop-types'

VDialog.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  size: PropTypes.string,
  showClose: PropTypes.bool,
  setIsOpen: PropTypes.func,
  DialogHeader: PropTypes.func,
  DialogFooter: PropTypes.func,
  width: PropTypes.string,
  maxHeight: PropTypes.string
}

// From https://reactjs.org/docs/hooks-state.html
export default function VDialog({ children, isOpen, title, size = 'sm', showClose = false, setIsOpen = () => { }, DialogHeader, DialogFooter, width, maxHeight = '75vh', showOverflow = false }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-60' onClose={() => { }}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-60 transition-opacity' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-2 text-center '>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              {/* style={{ width: '60vw' }} */}
              <Dialog.Panel
                className={`transform ${ showOverflow ? '' : 'overflow-hidden'} rounded-md bg-white  pb-3 !pr-0 text-left align-middle shadow-xl transition-all w-full ${width == null || !width ? (size === 'sm' ? 'max-w-md' : (size === 'md' ? 'max-w-4xl' : 'max-w-7xl')) : width}`}
              >
                {/* <!-- Modal header --> */}
                { (DialogHeader || title || showClose === true) && 
                  <div className='flex items-center justify-between p-0 m-0 rounded-t dark:border-gray-600'>
                    {DialogHeader &&
                      <DialogHeader />}
                    {title &&
                      <h4 className='ml-1 text-md font-medium text-gray-600 dark:text-white'>
                        {title}
                      </h4>}
                    {/*   data-modal-toggle="small-modal" */}
                    {showClose === true &&
                      <div
                        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-0.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                        onClick={() => { setIsOpen(false) }}
                      >
                        {/* <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' /></svg> */}
                        <XMarkIcon className='h-7 w-7 ' />
                        <span className='sr-only'>Close modal</span>
                      </div>}
                  </div>
                }
                {/* <!-- Modal body --> */}
                <div className={` mt-1 px-0 space-y-6 ${ showOverflow ? '' : 'overflow-auto'} px-1 p-l-1.5 p-r-1.5 `} style={{ maxHeight: maxHeight }}>
                  {children && children}
                </div>
                {/* <!-- Modal footer --> */}
                {DialogFooter &&
                  <div className='flex items-center justify-end p-2 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
                    <DialogFooter />
                  </div>}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
