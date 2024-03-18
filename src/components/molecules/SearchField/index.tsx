'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

const IconSearch = require('@/assets/images/buttons/Icon_search_black.png')

interface Props {
  mini?: boolean
}

const SearchField = (props: Props) => {
  const t = useTranslations('general')
  const { push } = useRouter()

  const [searchText, setSearchText] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const myDivRef = useRef<HTMLDivElement | null>(null)

  const doSearch = useCallback(() => {
    if (searchText.length > 2) {
      setSearchText('')
      setError(undefined)
      push(`/store/list?search=${searchText}`)
    } else {
      setError(t('please_type_at_least_3_chars'))
    }
  }, [searchText, push, t])

  const handleTextKeyPress = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        doSearch()
      }
    },
    [doSearch]
  )

  useEffect(() => {
    document.addEventListener('click', () => setError(undefined))

    return () => {
      document.removeEventListener('click', () => setError(undefined))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative w-full" ref={myDivRef}>
      <input
        type="search"
        value={searchText}
        onKeyDown={handleTextKeyPress}
        placeholder="Buscar"
        onChange={(e: any) => setSearchText(e.target.value)}
        className={`w-full px-6 py-1 h-[${
          props.mini ? 44 : 52
        }px] rounded-full bg-white border border-gray-300 focus:outline-none focus:border-blue-500`}
      />
      <button
        className="absolute inset-y-0 right-0 flex items-center pr-4"
        onClick={doSearch}
      >
        <Image
          className=""
          alt="search"
          src={IconSearch}
          width={24}
          height={24}
          draggable={false}
        />
      </button>
      {error && (
        <div className="absolute right-4">
          <div className="relative w-full z-50">
            <div className="absolute w-3 h-3 bg-white transform rotate-45 top-3 right-2 "></div>
            <div className="right-0  right-0 top-4 bg-white text-base absolute w-[200px] px-1 py-2 rounded-lg text-center shadow-lg">
              {error}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchField
