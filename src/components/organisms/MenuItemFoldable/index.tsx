'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { Area } from '@/models/Area'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const IconArrowUpBlack = require('@/assets/images/buttons/icon_arrow_up_black.png')
const IconArrowDownBlack = require('@/assets/images/buttons/icon_arrow_down_black.png')

interface MenuItemFoldableProps {
  area: Area
  onPressSubcategory?: () => void
  toggleMenuVisible?: () => void
}

const MenuItemFoldable = (props: MenuItemFoldableProps) => {
  const t = useTranslations('general')
  const { push } = useRouter()

  const [opened, setOpened] = useState(false)

  const toggleOpened = useCallback(() => {
    setOpened(!opened)
  }, [opened, setOpened])

  const handleMenuItemOnPress = useCallback(
    (onPress: () => void) => {
      onPress()

      props.toggleMenuVisible && props.toggleMenuVisible()
    },
    [props]
  )

  return (
    <div key={props.area.id}>
      <button className="flex items-center py-3 w-full" onClick={toggleOpened}>
        <div className="flex text-subtitle font-medium text-base  leading-normal">
          {props.area.name}
        </div>
        <Image
          alt="up"
          src={opened ? IconArrowUpBlack : IconArrowDownBlack}
          height={24}
          width={24}
          draggable={false}
          className="min-h-[24px] min-w-[24px] flex ml-1"
        />
      </button>
      {opened && (
        <div className="pb-2">
          <div className="px-[10px]" key={'category_all'}>
            <div
              className="text-subtitle font-bold text-base  py-1"
              key={'category_all_all'}
            >
              <button
                onClick={() =>
                  handleMenuItemOnPress(() =>
                    push(`/store/list?area=${props.area.id}`)
                  )
                }
              >
                {t('all')}
              </button>
            </div>
          </div>
          {props.area.categories?.map((category, index) => (
            <div className="px-[10px]" key={index}>
              <div
                className="text-subtitle font-bold text-base  py-1"
                key={category.id}
              >
                <button
                  onClick={() =>
                    handleMenuItemOnPress(() =>
                      push(
                        `/store/list?area=${props.area.id}&category=${category.id}`
                      )
                    )
                  }
                >
                  {category.name}
                </button>
              </div>
              {category.subCategories?.map((subcateogry, index) => (
                <div key={index}>
                  <button
                    onClick={() =>
                      handleMenuItemOnPress(() =>
                        push(
                          `/store/list?area=${props.area.id}&category=${category.id}&subCategory=${subcateogry.id}`
                        )
                      )
                    }
                  >
                    <div
                      className="text-subtitle font-normal text-base  py-1"
                      key={subcateogry.id}
                    >
                      {subcateogry.name}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MenuItemFoldable
