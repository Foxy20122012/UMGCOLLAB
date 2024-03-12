'use client'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'

const IconArrow = require('@/assets/images/buttons/icon_arrow_down_white.png')

interface NavButtonProps {
  text?: string
  icon: StaticImport | string
  onPress: () => void
  showArrow?: boolean
  badgeText?: string
  href?: string
  id?: string
}

const NavButton = (props: NavButtonProps) => {
  const handleOnPress = useCallback(() => {
    props.onPress && props.onPress()
  }, [props])

  return (
    <Link
      onClick={handleOnPress}
      href={props.href ?? ''}
      className="text-white p-2 flex"
    >
      <Image
        alt="option"
        src={props.icon}
        width={24}
        height={24}
        layout="fixed"
        draggable={false}
        className="min-w-[24px]"
      />
      {props.text}

      <div>
        <div
          id={props.id}
          className="text-white bg-error rounded-full px-1 font-roboto text-sm font-medium leading-4 tracking-wider ml-[-3px]"
        >
          {props.badgeText !== '0' ? props.badgeText : ''}
        </div>
      </div>

      {props.showArrow && (
        <div className="w-[24px] h-[24px]">
          <Image
            alt="arrow"
            width={24}
            height={24}
            src={IconArrow}
            draggable={false}
          />
        </div>
      )}
    </Link>
  )
}

export default NavButton
