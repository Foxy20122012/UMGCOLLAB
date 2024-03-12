import { StaticImageData } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { useCallback } from 'react'

interface IconButtonProps {
  onClick?: () => void
  icon: string | StaticImageData
  className?: string
}

const ModalExitButton = (props: IconButtonProps) => {
  const handleOnClick = useCallback(() => {
    props.onClick && props.onClick()
  }, [props])

  return (
    <button
      className="absolute top-1 right-1 m-[10px] bg-white border border-secondary rounded"
      onClick={handleOnClick}
    >
      <Image
        src={props.icon}
        alt="close"
        height={24}
        width={24}
        draggable={false}
        className="w-[24px] h-[24px] min-h-[24px] min-w-[24px]"
      />
    </button>
  )
}

export default ModalExitButton
