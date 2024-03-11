'use client'

import React, { useCallback } from 'react'

interface CheckboxProps {
  checked: boolean
  handleChange?: (val: boolean) => void
  label?: string
  className?: string
  disabled?: boolean
  readOnly?: boolean
  sufix?: string
  sufixLink?: { text: string; onPress?: () => void }
  fullWidth?: boolean
  onPress?: () => void
}

const Checkbox = (props: CheckboxProps) => {
  const handleChange = () => {
    props.handleChange &&
      !props.readOnly &&
      !props.disabled &&
      props.handleChange(!props.checked)

    props.onPress && props.onPress()
  }

  const handleSufixLinkOnPress = useCallback(
    (e: any) => {
      props.sufixLink && props.sufixLink.onPress && props.sufixLink.onPress()
      e.stopPropagation()
    },
    [props]
  )

  return (
    <button
      className={[
        'flex items-center justify ',
        props.className,
        props.readOnly ? 'cursor-default' : '',
        props.fullWidth ? 'w-full' : '',
      ].join(' ')}
      onClick={handleChange}
      disabled={props.disabled}
    >
      <div
        className={[
          'flex w-4 h-4 rounded ',

          props.checked ? (props.disabled ? 'bg-opaque1' : 'bg-secondary') : '',
          props.disabled ? ' border-opaque1' : ' border-secondary',
        ].join(' ')}
        style={{ borderWidth: 2, borderStyle: 'solid' }}
      >
        <div className="inset-0 flex items-center justify-center  ">
          {props.checked && (
            <svg
              className="w-3 h-3 text-white fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )}
        </div>
      </div>
      <div className="flex-1 ml-2">
        <div className="w-full flex flex-row justify-between">
          <div className="flex text-base">{props.label}</div>
          <div className="flex text-base text-opaque5">{props.sufix}</div>
          {props.sufixLink && (
            <div
              className="ml-1 flex text-base text-secondary"
              onClick={(e) => handleSufixLinkOnPress(e)}
            >
              {' '}
              {props.sufixLink?.text}
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

export default Checkbox
