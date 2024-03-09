import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

export interface FixedSizedImageProps {
  src: string | StaticImport
  height: number
  width: number
  alt?: string
  className?: string
  rounded?: boolean
  onError?: () => void
}

const FixedSizedImage = (props: FixedSizedImageProps) => {
  return (
    <div
      className={`${props.rounded ? 'rounded-full' : ''}  w-[${
        props.width
      }px] h-[${props.height}px] 
                min-w-[${props.width}px] min-h-[${props.height}px] 
                max-w-[${props.width}px] max-h-[${
        props.height
      }px] self-center overflow-hidden ${props.className}`}
    >
      <Image
        style={{
          height: props.height,
          width: props.width,
        }}
        alt={props.alt || ''}
        src={props.src}
        width={props.width}
        objectFit="cover"
        onError={props.onError}
        draggable={false}
        height={props.height}
        className={`w-[${props.width}px] h-[${props.height}px] min-w-[${props.width}px] 
                min-h-[${props.height}px] max-w-[${props.width}px] max-h-[${props.height}px] self-center`}
      />
    </div>
  )
}

export default FixedSizedImage
