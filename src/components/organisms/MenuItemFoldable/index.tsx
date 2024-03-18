'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const IconArrowUpBlack = require('@/assets/images/buttons/icon_arrow_up_black.png')
const IconArrowDownBlack = require('@/assets/images/buttons/icon_arrow_down_black.png')

interface MenuItemFoldableProps {
 
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
    <div >
      <button className="flex items-center py-3 w-full" onClick={toggleOpened}>
        <div className="flex text-subtitle font-medium text-base  leading-normal">
        
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
                    push(`/store/list?area=`)
                  )
                }
              >
                {t('all')}
              </button>
            </div>
          </div>
          
            <div className="px-[10px]" >
              <div
                className="text-subtitle font-bold text-base  py-1"
                
              >
                <button
                  onClick={() =>
                    handleMenuItemOnPress(() =>
                      push(
                        `/store/list?area=&category=`
                      )
                    )
                  }
                >
                  
                </button>
              </div>
             
                <div >
                  <button
                    onClick={() =>
                      handleMenuItemOnPress(() =>
                        push(
                          `/store/list?area=&category=&subCategory=`
                        )
                      )
                    }
                  >
                    <div
                      className="text-subtitle font-normal text-base  py-1"
                      
                    >
                      
                    </div>
                  </button>
                </div>
            
            </div>
        
        </div>
      )}
    </div>
  )
}

export default MenuItemFoldable
