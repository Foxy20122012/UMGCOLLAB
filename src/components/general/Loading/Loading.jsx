// import Image from 'next/image'
import React from 'react'
import PropTypes from 'prop-types'

LoadingSpinner.propTypes = {
  loading: PropTypes.bool,
  background: PropTypes.string,
  color: PropTypes.string,
  darkColor: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string
}

// From https://reactjs.org/docs/hooks-state.html
export default function LoadingSpinner ({ loading, background, color, darkColor, type, image }) {
  if (loading === true) {
    return (
      <div id='defaultModal' tabIndex='-1' aria-hidden='true' className='overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-[99] w-screen md:inset-0 h-screen'>
        <div className='relative p-4 w-screen h-screen bg-white/40 backdrop-blur-sm'>
          <figure className={`flex flex-col justify-center rounded-xl !h-[160px] !w-[250px] px-6 py-4  div_loading ${background}`}>
            <img className='w-11/12 h-[calc(75%-10px)] mx-auto' src={image} alt='' />
            <div className='text-center space-y-4'>
              <figcaption className='font-medium'>
                <div className='spinner w-full h-6'>
                  {Array(4).fill('').map((val, i) =>
                    <div key={`${i}`} className={`h-10 w-10 ${color} ${darkColor ? `dark:${darkColor}` : ''}`} />
                  )}
                </div>
              </figcaption>
            </div>
          </figure>
        </div>
      </div>
    )
  }
}