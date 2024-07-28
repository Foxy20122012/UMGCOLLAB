import React from 'react'
import PropTypes from 'prop-types'

UserAvatar.propTypes = {
  initials: PropTypes.string,
  fullName: PropTypes.string
}

// From https://reactjs.org/docs/hooks-state.html
export default function UserAvatar ({ initials, fullName }) {
  const initialsFromFullName = (name) => {
    if (name && name.length > 0) {
      const parts = name.toUpperCase().replace(' DE ', ' ').replace(' DEL ', ' ').split(' ')
      let initials = ''
      if (parts.length > 2) {
        initials = parts[0].substring(0, 1) + parts[2].substring(0, 1)
      } else if (parts.length === 2) {
        initials = parts[0].substring(0, 1) + parts[1].substring(0, 1)
      } else {
        initials = parts[0].substring(0, 2)
      }
      return initials
    }
    return ''
  }

  return (
    <div className='inline-flex overflow-hidden relative justify-center items-center w-8 h-8 bg-gray-700 rounded-full dark:bg-gray-100'>
      <div className='font-medium text-gray-100 dark:text-gray-700'>{initials || initialsFromFullName(fullName)}</div>
    </div>
  )
}