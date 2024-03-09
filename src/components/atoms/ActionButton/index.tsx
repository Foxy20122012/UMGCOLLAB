'use client'

import Image, { StaticImageData } from 'next/image'
import {
  forwardRef,
  useRef,
  useImperativeHandle,
  useMemo,
  useCallback,
} from 'react'
import LoadingIndicator from '../LoadingIndicator'

type ActionButtonProps = {
  title: string
  onClick?: (e?: any) => void
  actionType?: 'button' | 'submit' | 'reset'
  type:
    | 'primary'
    | 'secondary'
    | 'opaque'
    | 'outlined'
    | 'transparent'
    | 'white'
    | 'purple'
    | 'purple-secondary'
  fullRounded?: boolean
  disabled?: boolean
  fullWidth?: boolean
  rightIcon?: string | StaticImageData
  leftIcon?: string | StaticImageData
  className?: string
  iconHeight?: number
  iconWidth?: number
  mini?: boolean
  semiRounded?: boolean
  proccessing?: boolean
}

const ActionButton = forwardRef(({ ...props }: ActionButtonProps, ref) => {
  const { title, onClick, actionType, disabled, type, rightIcon, leftIcon } =
    props
  const elementRef = useRef(null)

  useImperativeHandle(ref, () => ({
    focus: () => {
      ;(elementRef.current as any)?.focus()
    },
  }))

  const classes = [
    'flex font-bold relative text-center items-center justify-center',
    'disabled:bg-disabled disabled:text-opaque0 hover:filter-darken ',
    props.mini ? 'py-1' : 'py-[10px] min-h-[40px]',
    props.type === 'primary'
      ? 'bg-secondary text-white'
      : props.type === 'secondary'
      ? 'bg-ternary text-secondary'
      : props.type === 'purple'
      ? 'bg-primary text-white'
      : props.type === 'purple-secondary'
      ? 'bg-purple1 text-primary'
      : props.type === 'opaque'
      ? 'bg-opaque0 text-black'
      : props.type === 'outlined'
      ? 'bg-white text-secondary border-2 border-secondary'
      : props.type === 'white'
      ? 'bg-white text-secondary border-2 border-white text-black'
      : props.type === 'transparent'
      ? 'bg-transparent border-transparent'
      : 'bg-white text-black',
    props.fullRounded ? 'rounded-full' : '',
    props.semiRounded ? 'rounded' : '',
    props.fullWidth ? 'w-full' : '',
    props.title === '' ? 'px-0' : props.mini ? 'px-[12px]' : 'px-8',
    props.className,
  ]

  const iconHeight = useMemo(() => {
    return props.iconHeight ? props.iconHeight : 18
  }, [props.iconHeight])

  const iconWidth = useMemo(() => {
    return props.iconWidth ? props.iconWidth : 18
  }, [props.iconWidth])

  const handleOnClick = useCallback(() => {
    if (!props.proccessing && props.onClick) {
      props.onClick()
    }
  }, [props])

  return (
    <button
      className={classes.join(' ')}
      disabled={disabled}
      ref={elementRef}
      onClick={handleOnClick}
      type={actionType}
    >
      {leftIcon && (
        <Image
          alt="left icon"
          src={leftIcon}
          width={iconWidth}
          draggable={false}
          height={iconHeight}
          className={`mr-2 flex w-[${iconWidth}px] h-[${iconHeight}px] min-w-[${iconWidth}px] min-h-[${iconHeight}px] self-center`}
        />
      )}
      <div className="flex w-full justify-center text-md">{title}</div>
      {props.proccessing && (
        <div className="absolute top-0 right-0 left-0 bottom-0 cursor-default">
          <div className="flex w-full bg-gray-500 bg-opacity-40 items-center justify-center h-full rounded-full">
            <LoadingIndicator mini size={6} />
          </div>
        </div>
      )}
      {rightIcon && (
        <Image
          alt="right icon"
          src={rightIcon}
          draggable={false}
          width={iconWidth}
          height={iconHeight}
          className={`ml-1 flex w-[${iconWidth}px] h-[${iconHeight}px] min-w-[${iconWidth}px] min-h-[${iconHeight}px] self-center`}
        />
      )}
    </button>
  )
})
ActionButton.displayName = 'ActionButton'

export default ActionButton
