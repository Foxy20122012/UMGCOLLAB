'use client'

import { useCallback } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

const IconExitOrange = require('@/assets/images/buttons/icon_exit_orange.png')

const LogoutButton = () => {
  const t = useTranslations('general')
  const { replace } = useRouter()

  const handleOnPress = useCallback(() => {
    localStorage.clear()
    replace('/store')
  }, [replace])

  return (
    <button
      onClick={handleOnPress}
      className=" text-md text-subtitle font-medium w-full mt-3 flex flex-row items-center"
    >
      <div className={`flex`}>{t('logout')}</div>
      <Image
        alt="right icon"
        src={IconExitOrange}
        width={24}
        height={24}
        draggable={false}
        className="ml-1 flex w-[24px] h-[24px] min-w-[24px] min-h-[24px] self-center"
      />
    </button>
  )
}

export default LogoutButton
