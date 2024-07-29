
import ActionButton from '../../atoms/ActionButton'
import Checkbox from '../../../components/atoms/Checkbox/index'
import IconedButton from '../../atoms/IconedButton/index'
//import IconedButton from '@/components/atoms/IconedButton'
import LoadingIndicator from '../../atoms/LoadingIndicator/index'
//import LoadingIndicator from '@/components/atoms/LoadingIndicator'
import TextField from '../../atoms/TextField/index'
//import TextField from '@/components/atoms/TextField'
import { PaginationData } from '../../../services/umgService/commonInterfaces/IPaginatedData'
//import { PaginationData } from '@/services/umgService/commonInterfaces/IPaginatedData'
import { useTranslations } from 'next-intl'


import React, { useCallback, useMemo, useState } from 'react'

const IconLeftArrow = require('./../../assets/images/buttons/icon_arrow_left_orange.png')
const IconRightArrow = require('../../../assets/images/buttons/icon_arrow_right_orange.png')

// Define types for the columns and values
type TableColumn = {
  key: string
  name: string
}

type TableValue = {
  [key: string]: string | number | boolean | JSX.Element
}

type Props = {
  columns: TableColumn[]
  values: TableValue[]
  searchPlaceHolder?: string
  searchedText?: string
  
  actions?: (index: number, ids?: string[]) => JSX.Element
  paginationData?: PaginationData
  loading?: boolean
  hideSearchBar?: boolean
}

const TP_X = 'px-2'
const TP_Y = 'py-2'

const DynamicTable: React.FC<Props> = ({
  columns,
  values,
  searchPlaceHolder,
  searchedText,
  actions,
  paginationData,
 
  loading,
  hideSearchBar,
}) => {
  const t = useTranslations('general')

  const [selectedRows, setSelectedRows] = useState<string[]>([])
   const [searchText, setSearchText] = useState(searchedText ?? '')

  const handleCheckboxChange = (id: string) => {
    // const isChecked = e.target.checked
    setSelectedRows((prevSelectedRows) => {
      if (!prevSelectedRows.includes(id)) {
        return [...prevSelectedRows, id]
      } else {
        return prevSelectedRows.filter((rowId) => rowId !== id)
      }
    })
  }

  const handleToggleSelectedAll = useCallback(() => {
    if (selectedRows.length === values.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(values.map((v) => String(v.id)))
    }
    // setSelectedAll((prv) => !prv)
  }, [selectedRows, setSelectedRows, values])

  const handleSearch = useCallback(() => {
  ({
        page: 1,
        searchText: searchText,
      })
  }, [searchText, ])

  const handleChangePage = useCallback(
    (pageNumber: number) => {
      
      
      
    },
    [searchText, paginationData, ]
  )

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const paginationMatrixPages = useMemo(() => {
    return [1, 2, 3, 4, 5]
  }, [])

  return (
    <div className="w-full relative">
      <div className="mb-2">
        <div className=" flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center">
            {selectedRows.length > 0 && (
              <>
                <span className="text text-base text-opaque1">
                  {selectedRows.length === values.length
                    ? t('all')
                    : selectedRows.length}{' '}
                  {t('selected')}
                </span>
                {actions && actions(-1, selectedRows)}
              </>
            )}
          </div>
          {!hideSearchBar && (
            <div className="flex flex-row gap-1">
              <div className="flex w-full min-w-[300px]">
                <TextField
                  placeholder={searchPlaceHolder ?? t('search')}
                  value={searchText}
                  setValue={setSearchText}
                  onKeyDown={handleKeyDown}
                  type={'text'}
                />
              </div>
              <ActionButton
                title={t('search')}
                type={'primary'}
                className="rounded-md"
                onClick={handleSearch}
              />
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full rounded-tl-md rounded-tr-md overflow-hidden relative">
          {loading && (
            <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 bg-white opacity-90 z-10">
              <LoadingIndicator fillWidth className="top-1 bottom-1 h-full" />
            </div>
          )}

          <thead className="bg-background1">
            <tr className="">
              <th className={`border-[1px] border-opaque1 ${TP_X} ${TP_Y} `}>
                <Checkbox
                  checked={selectedRows.length === values.length}
                  onPress={handleToggleSelectedAll}
                />
              </th>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`border-[1px] border-opaque1 ${TP_X} ${TP_Y} text-title font-normal text-base`}
                >
                  {column.name}
                </th>
              ))}
              {actions && (
                <th
                  className={`border-[1px] border-opaque1 ${TP_X} ${TP_Y} text-title font-normal text-base `}
                >
                  {t('actions')}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {values.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className={` ${TP_X} ${TP_Y} `}>
                  <Checkbox
                    checked={selectedRows.includes(row.id as string)}
                    onPress={() => handleCheckboxChange(row.id as string)}
                  />
                </td>
                {columns.map((column, colIndex) => (
                  <td
                    className={` ${TP_X} ${TP_Y}  text-title font-normal text-base text-center`}
                    key={colIndex}
                  >
                    {row[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className={`${TP_X} ${TP_Y}`}>{actions(rowIndex)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {paginationData && (
        <div className="mt-4">
          <div className=" flex flex-row justify-center">
            <div className="flex flex-row gap-4 items-center justify-center">
              {paginationData.currentPage > 1 && (
                <IconedButton
                  icon={IconLeftArrow}
                  onClick={() =>
                    handleChangePage(paginationData.currentPage - 1)
                  }
                />
              )}

              {paginationData.currentPage > 1 && (
                <>
                  {paginationMatrixPages.map((pageNumber) => (
                    <>
                      {paginationData.currentPage -
                        (paginationMatrixPages.length - (pageNumber - 1)) >
                        0 &&
                        paginationData.currentPage -
                          (paginationMatrixPages.length - (pageNumber - 1)) <
                          paginationData.currentPage && (
                          <span
                            className="py-1 px-3  border-[1px] rounded border-secondary text-base cursor-pointer text-secondary"
                            onClick={() =>
                              handleChangePage(
                                paginationData.currentPage -
                                  (paginationMatrixPages.length -
                                    (pageNumber - 1))
                              )
                            }
                          >
                            {paginationData.currentPage -
                              (paginationMatrixPages.length - (pageNumber - 1))}
                          </span>
                        )}
                    </>
                  ))}
                </>
              )}

              <span className="py-1 px-3  border-[1px] rounded border-disabled text-base">
                {paginationData.currentPage}
              </span>

              {paginationData.currentPage < paginationData.totalPages && (
                <>
                  {paginationMatrixPages.map((pageNumber) => (
                    <>
                      {paginationData.currentPage + pageNumber <=
                        paginationData.totalPages && (
                        <span
                          className="py-1 px-3  border-[1px] rounded border-secondary text-base cursor-pointer text-secondary"
                          onClick={() =>
                            handleChangePage(
                              paginationData.currentPage + pageNumber
                            )
                          }
                        >
                          {paginationData.currentPage + pageNumber}
                        </span>
                      )}
                    </>
                  ))}
                </>
              )}

              {paginationData.currentPage < paginationData.totalPages && (
                <IconedButton
                  icon={IconRightArrow}
                  onClick={() =>
                    handleChangePage(paginationData.currentPage + 1)
                  }
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DynamicTable
