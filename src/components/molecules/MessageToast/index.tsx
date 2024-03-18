'use client'

import FixedSizedImage from '@/components/atoms/FixedSizeImage'

const iconWarning = require('@/assets/images/buttons/icon_warning_white.png')
const iconClose = require('@/assets/images/buttons/icon_close_white.png')
const iconCloseBlack = require('@/assets/images/buttons/icon_close_black.png')
const iconSuccess = require('@/assets/images/buttons/icon_success_white.png')
const iconSuccessBlack = require('@/assets/images/buttons/icon_success_black.png')

export interface MessageToastProps {
  message: string
  type: 'error' | 'warning' | 'success' | 'info'
  onClose: () => any
}

const MessageToast = (props: MessageToastProps) => {
  const containerClassName = [
    'flex flex-row justify-between px-6 py-4 rounded-[8px] items-center ',
    props.type === 'error'
      ? ' bg-error text-white'
      : props.type === 'success'
      ? ' bg-success text-white'
      : props.type === 'warning'
      ? ' bg-warning color-title'
      : props.type === 'info'
      ? ' bg-opaque6 border-[1px] border-background1 color-title'
      : ' bg-disabled text-white',
  ]

  return (
    <div className={containerClassName.join(' ')}>
      <div className="bg-white-100 mr-4 flex">
        <FixedSizedImage
          className="flex"
          src={
            props.type === 'success'
              ? iconSuccess
              : props.type === 'info'
              ? iconSuccessBlack
              : iconWarning
          }
          alt="toast"
          width={24}
          height={24}
        />
      </div>
      <span className=" text-base text-left font-normal whitespace-normal break-words  mr-4 flex-1 flex ">
        {props.message.replaceAll(',', ', ').replaceAll(':', ': ')}
      </span>
      <div className="flex">
        <button
          onClick={() => {
            props.onClose()
          }}
        >
          <FixedSizedImage
            className=""
            src={props.type === 'info' ? iconCloseBlack : iconClose}
            alt="toast"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  )
}

export default MessageToast
