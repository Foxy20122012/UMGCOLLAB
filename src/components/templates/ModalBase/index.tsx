'use client'

import HintText from '../../atoms/HintText/index'
import ModalExitButton from '../../atoms/ModalExitButton/index'
import SubTitle from '../../atoms/SubTitle/index'
import IconClose from '../../../assets/images/buttons/icon_close_black.png';
import { ReactNode } from 'react'

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
    <div className="bg-black z-[1100] fixed inset-0 bg-opacity-80 py-10 px-2 overflow-y-auto flex justify-center items-center">
      <div
        className={`
          flex flex-col 
          h-fit relative bg-white p-6 rounded-lg shadow-lg ${className}
        `}
        style={{
          width: width ? width : '90vw', // Ajuste responsive a 90% del ancho del viewport
          maxWidth: '700px', // Valor máximo para evitar que sea demasiado ancho en pantallas grandes
        }}
      >
        {/* Botón para cerrar el modal */}
        <ModalExitButton
          icon={IconClose}
          onClick={onClose}
          className="absolute top-1 right-1 m-[10px]"
        />

        {/* Mostrar label si existe */}
        {label && label !== '' && <HintText text={label} />}

        {/* Mostrar título si existe */}
        {title && title !== '' && <SubTitle text={title} className="mb-2" />}

        {/* Contenido del modal */}
        {children}
      </div>
    </div>
  )
}

export default ModalBase
