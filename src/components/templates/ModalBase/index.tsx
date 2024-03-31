'use client'

import HintText from '@/components/atoms/HintText'
import ModalExitButton from '@/components/atoms/ModalExitButton'
import SubTitle from '@/components/atoms/SubTitle'
import { ReactNode } from 'react'

const IconClose = require('@/assets/images/buttons/icon_close_black.png')

export interface ModalBaseChildrenProps {
  onClose: () => void
}

interface ModalBaseProps extends ModalBaseChildrenProps {
  width?: number | string // '50%', 50px
  maxWidth?: string // '50%', 50px
  title?: string
  children?: ReactNode
  className?: string
  label?: string
}

const ModalBase: React.FC<ModalBaseProps> = ({
  onClose,
  width,
  title,
  children,
  className,
  label,
}) => {
  return (
    <div className="bg-black z-50 fixed inset-0 bg-opacity-80 py-10 px-2 overflow-y-auto flex justify-center">
      <div
        className={`
        flex flex-col 
        h-fit relative bg-white p-6 rounded-lg shadow-lg ${className}
      `}
        style={{ width: width ? width : 700 }}
      >
        <ModalExitButton
          icon={IconClose}
          onClick={onClose}
          className="absolute top-1 right-1 m-[10px]"
        />

        {label && label !== '' && <HintText text={label} />}
        {title && title !== '' && <SubTitle text={title} className="mb-2" />}

        {children}
      </div>
    </div>
  )
}

export default ModalBase
