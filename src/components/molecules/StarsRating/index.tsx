'use client'

import Image from 'next/image'
import { useCallback, useMemo } from 'react'

const IconStarFilled = require('@/assets/images/buttons/star_outline_filled_orange.png')
const IconStarUnFilled = require('@/assets/images/buttons/star_outline_unfilled_orange.png')
const IconStarHalf = require('@/assets/images/buttons/star_outline_half_orange.png')

interface StarsRatingProps {
  value: number
  setValue?: (val: number) => void
  readOnly?: boolean
  iconSize?: number
  numberOfStars?: number
}

const StarsRating = (props: StarsRatingProps) => {
  const iconSize = useMemo(() => {
    return props.iconSize ? props.iconSize : 20
  }, [props.iconSize])

  const HeartIcon = useCallback(
    (startNumber: number) => {
      const _val = props.value + 1 - startNumber

      if (_val > 0.6) {
        return IconStarFilled
      } else if (_val > 0.3 && _val <= 0.6) {
        return IconStarHalf
      } else {
        return IconStarUnFilled
      }
    },
    [props.value]
  )

  const handleSetValue = useCallback(
    (val: number) => {
      props.setValue && props.setValue(val)
    },
    [props]
  )

  const Stars = useMemo(() => {
    let _starts: any[] = []

    for (let i = 1; i <= (props.numberOfStars ? props.numberOfStars : 5); i++) {
      _starts.push(
        <button
          className={`flex h-[${iconSize}px] w-[${iconSize}px] min-h-[${iconSize}px] min-w-[${iconSize}px]`}
          onClick={() => handleSetValue(i)}
        >
          <Image
            height={iconSize}
            width={iconSize}
            draggable={false}
            alt="star"
            className={`h-[${iconSize}px] w-[${iconSize}px] min-h-[${iconSize}px] min-w-[${iconSize}px]`}
            src={HeartIcon(i)}
          />
        </button>
      )
    }
    return _starts
  }, [props.numberOfStars, iconSize, HeartIcon, handleSetValue])

  return <div className="flex flex-row">{Stars}</div>
}

export default StarsRating
