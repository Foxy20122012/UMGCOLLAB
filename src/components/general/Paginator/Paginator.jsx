'use client'

import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
// import useI18n from '../hooks/useI18n'

import PropTypes from 'prop-types'
import { useTranslations } from 'next-intl';
/**
 * @brief Paginador para tabla o data iterator
 * @param {*} initialIndex fila en la que inicia la visualizacion
 * @param finalIndex fila en la que termina la visualizacion
 * @param totalItems cantidad total de filas
 * @param selectedRowsPerPage filas a visualizar por pagina
 * @param selectePage pagina actual en la visualizacion
 * @param onChangeRowsPerPage evento que se dispara al cambiar la cantidad de filas por pagina
 * @param onChangePage evento que se dispara al cambiar de pagina
 */
Paginator.propTypes = {
  initialIndex: PropTypes.number,
  finalIndex: PropTypes.number,
  totalItems: PropTypes.number,
  selectedRowsPerPage: PropTypes.number,
  selectedPage: PropTypes.number,
  onChangeRowsPerPage: PropTypes.func,
  onChangePage: PropTypes.func,
  i18n: PropTypes.object
}

const fsHeader = ' xs:text-md sm:text-md md:text-md lg:text-base xl:text-base ' // ' via-label !text-white '
const fsCelda = ' xs:text-base sm:text-base md:text-base lg:text-sm xl:text-sm ' // ' via-input '

// From https://reactjs.org/docs/hooks-state.html
export default function Paginator ({ fontClassHeader, fontClassCelda, initialIndex, finalIndex, totalItems, selectedRowsPerPage = 10, selectedPage, onChangeRowsPerPage, onChangePage, i18n = { t: () => { return 'txtNone' } }, textRowsPerPage, onEndBuildListaRPP = () => {} }) {
  // const i18n = useI18n()
  /**
   * @brief genera un arreglo con la cantidad de paginas segun la cantidad de filas y la cantidad de filas por pagina
   * @param totalItems cantidad de filas
   * @param selectedRowsPerPage cantidad de filas por pagina
   */
  const t = useTranslations('general');
  const initializePages = (totalItems, selectedRowsPerPage) => {
    const pagesCount = []
    if (totalItems > 0) {
      for (let idx = 0; idx < (totalItems / selectedRowsPerPage); idx++) {
        pagesCount.push(idx + 1)
      }
    }
    return pagesCount
  }
  const [pages, setPages] = useState(initializePages(totalItems, selectedRowsPerPage))
  const [_selectedRowsPerPage, setSelectedRowsPerPage] = useState(selectedRowsPerPage)
  const [_selectedPage, setSelectedPage] = useState(selectedPage)

  const initialObjOpciones = { 5: true, 10: true, 25: true, 50: true, 75: true, 100: true, 200: true, 500: true, 1000: true }
  const [rowsPerPage, setRowsPerPage] = useState([])
  const [objOpciones, setObjOpciones] = useState({})
  
  const getFontSize = (base, fsClass) => {
    if (base != null &&
        (base.includes('text-xs') || base.includes('text-sm') || base.includes('text-base') || base.includes('text-md') || base.includes('text-lg') || base.includes('text-xl'))) {
      return ''
    }
    return fsClass
  }

  /**
   * @brief Cambia de pagina seleccionada en una posicion
   * @param direction '<' indica una posicion hacia atrás y '>' indica una posicion hacia adelante
   */
  const changePage = (direction) => {
    if (direction === '<') {
      if (_selectedPage > 1) {
        const page = _selectedPage - 1
        setSelectedPage(page)
        onChangePage(page)
      }
    } else {
      let totalPag = (totalItems / _selectedRowsPerPage)
      // console.log('totalPag', totalPag)
      const totalPagInt = parseInt(totalPag)
      if (totalPag !== totalPagInt) {
        totalPag = totalPagInt + 1
      }
      if (_selectedPage < totalPag) {
        const page = _selectedPage + 1
        setSelectedPage(page)
        onChangePage(page)
      }
    }
  }

  useEffect(() => {
    if (selectedRowsPerPage != null) {
      if (initialObjOpciones[selectedRowsPerPage]) {
        setObjOpciones({ ...initialObjOpciones })
        setRowsPerPage(Object.keys(initialObjOpciones))
      } else {
        let crearLista = true
        if (selectedRowsPerPage > 7 && objOpciones[selectedRowsPerPage]) {
          crearLista = false
        }
        if (crearLista) {
          const valMitad = parseInt(selectedRowsPerPage / 2)
          const newObj = {}
          if (selectedRowsPerPage < 10 && valMitad > 1) {
            newObj[valMitad] = true
          }
          const max = 20
          let idx = 1
          while (idx <= max) {
            if (idx%2 !== 0 && selectedRowsPerPage > 10 && idx < 6) {
              const _valMitad = valMitad * idx
              if (_valMitad < 100) {
                newObj[_valMitad] = true
              }
            }
            const _val = selectedRowsPerPage * idx
            if (_val < 100) {
              newObj[_val] = true
            }
            idx++
            if (selectedRowsPerPage < 5 && idx > 4) {
              idx++
            }
          }
          newObj[100] = true
          newObj[200] = true
          newObj[500] = true
          newObj[1000] = true
          setObjOpciones({ ...newObj })
          setRowsPerPage(Object.keys(newObj))
        }
        onEndBuildListaRPP()
      }
    }
    if (selectedRowsPerPage != null && selectedRowsPerPage && selectedRowsPerPage !== _selectedRowsPerPage) {
      setSelectedRowsPerPage(selectedRowsPerPage)
    }
    if (selectedRowsPerPage == null || !selectedRowsPerPage) {
      setSelectedRowsPerPage(10)
      setRowsPerPage(Object.keys(initialObjOpciones))
    }
  }, [selectedRowsPerPage])
  /***
   * @brief recalcula el arreglo con la cantidad de paginas caca vez que cambia el total de filas o la cantidad de filas por pagina
   */
  useEffect(() => {
    setPages(initializePages(totalItems, _selectedRowsPerPage))
  }, [totalItems, _selectedRowsPerPage])

  return (
    <div className='flex px-4 py-2 font-semibold tracking-wide border-t w-full items-center justify-between flex-wrap border rounded-bl-lg rounded-br-lg bg-white'>
      <div className={` sm:flex items-center pr-4  hidden  ${fontClassHeader ?? fsHeader} `}>
        {t('dataIterator.pageText', { 0: initialIndex, 1: finalIndex, 2: totalItems })}
      </div>
      <div className='flex items-center sm:flex-grow-0 flex-grow flex-wrap '>
        <div className='flex items-center '>
          <div className={`sm:flex hidden pr-2  ${fontClassHeader ?? fsHeader} `}>
            { textRowsPerPage ?? t('dataIterator.roswPerPageText')}
          </div>
          <select
            value={_selectedRowsPerPage}
            className='block w-16 p-0 m-0 pr-8 text-sm form-select focus:outline-none focus:shadow-outline-purple rounded-md ring-1 text-right '
            onChange={(e) => { setSelectedRowsPerPage(e.target.value); onChangeRowsPerPage(e.target.value) }}
          >
            {
              rowsPerPage.map((rowPerPage) => {
                return (
                  <option key={rowPerPage} value={rowPerPage}>{rowPerPage}</option>
                )
              })
            }
          </select>
        </div>
        <div className='flex mt-2 sm:mt-auto justify-end items-center flex-grow  '>
          <nav aria-label='Table navigation'>
            <ul className='inline-flex items-center'>
              <li>
                <button
                  title={t('dataIterator.prevPage')}
                  onClick={() => changePage('<')}
                  className='px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple'
                  aria-label='Previous'
                >
                  <ChevronLeftIcon className='w-5 h-5' />
                </button>
              </li>
              <li>
                <select
                  value={_selectedPage}
                  className='block w-16 p-0 m-0 pr-8 text-sm form-select focus:outline-none focus:shadow-outline-purple rounded-md ring-1 text-right '
                  onChange={(e) => { setSelectedPage(parseInt(e.target.value)); onChangePage(e.target.value) }}
                >
                  {
                    pages.map((page) => {
                      return (
                        <option key={page} value={page}>{page}</option>
                      )
                    })
                  }
                </select>
              </li>
              <li>
                <button
                  onClick={() => changePage('>')}
                  title={t('dataIterator.nextPage')}
                  className='px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple'
                  aria-label='Next'
                >
                  <ChevronRightIcon className='w-5 h-5' />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className={` flex items-center pr-4 sm:hidden pt-2  ${fontClassHeader ?? fsHeader} `}>
        {t('dataIterator.pageText', { 0: initialIndex, 1: finalIndex, 2: totalItems })}
      </div>
    </div>
  )
}