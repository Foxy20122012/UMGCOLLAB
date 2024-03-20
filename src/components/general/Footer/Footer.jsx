import React from 'react'
import PropTypes from 'prop-types'

Footer.propTypes = {
  version: PropTypes.string,
  imageUrl: PropTypes.string
}

// From https://reactjs.org/docs/hooks-state.html
export default function Footer ({autor="" ,version = '1.0.0', imageUrl = 'https://www.via-asesores.com/logos/logo_via.png', label = 'Versión' }) {
  return (
    <footer className='fixed bottom-0 z-50 w-full bg-white shadow-2xl shadow-inner rounded-t-md '>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-9 -mb-px'>
          {/* Header: Left side */}
          <div className='flex'>
            <span>® {autor}</span>
          </div>
          {/* Header: Right side */}
          <div className='flex items-center'>
            {/*  Divider */}
            <hr className='w-px h-6 bg-slate-200 mx-3' />
            <a href='http://www.via-asesores.com/'>
              <img src={imageUrl} alt='logo' width={30} height={30} />
            </a>
            {/*  Divider */}
            <hr className='w-px h-6 bg-slate-200 mx-3' />
            <span>{`${label} ${version}`}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}