import { StaticImageData } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useCallback, useMemo } from 'react'

interface IconButtonProps {
  onClick?: () => void
  icon: string | StaticImageData
  className?: string
  disabled?: boolean
  size?: 'mini' | 'normal'
  hideBorder?: boolean
  transparent?: boolean
}

const IconedButton = (props: IconButtonProps) => {
  const handleOnClick = useCallback(() => {
    props.onClick && !props.disabled && props.onClick()
  }, [props])

  const iconSize = useMemo(() => {
    switch (props.size) {
      case 'mini':
        return 12

      case 'normal':
        return 24

      default:
        return 24
    }
  }, [props.size])

  return (
    <button
      className={` border hover:bg-opaque0 ${
        props.disabled ? 'cursor-pointer' : ''
      } 
      
      ${props.transparent ? 'bg-transparent' : 'bg-white'}
      ${
        props.hideBorder
          ? ''
          : props.disabled
          ? 'border-opaque0'
          : 'border-secondary'
      }
      
      rounded p-[2px]`}
      onClick={handleOnClick}
    >
      <Image
        src={props.icon}
        alt="close"
        height={iconSize}
        draggable={false}
        width={iconSize}
        className={`w-[${iconSize}px] h-[${iconSize}px] min-h-[${iconSize}px] min-w-[${iconSize}px] ${
          props.disabled ? 'filter grayscale' : ''
        }`}
      />
    </button>
  )
}

export default IconedButton
