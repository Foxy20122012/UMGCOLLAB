'use client'

import React, { useCallback, useState } from 'react'
import FixedSizedImage, { FixedSizedImageProps } from '../FixedSizeImage'

interface ImageProps extends FixedSizedImageProps {
  fallbackSrc: string
}

const FixedImageWithFallback = (props: ImageProps) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = useCallback(() => {
    setImageError(true)
  }, [setImageError])

  return (
    <FixedSizedImage
      {...props}
      src={imageError ? props.fallbackSrc : props.src}
      onError={handleImageError}
    />
  )
}

export default FixedImageWithFallback
