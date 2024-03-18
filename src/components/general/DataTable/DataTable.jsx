'use client'
import React, { useEffect, useState } from 'react'
import Paginator from '../Paginator/Paginator'
import { PencilSquareIcon, TrashIcon, MagnifyingGlassIcon, DocumentPlusIcon, BackspaceIcon, ArrowLongUpIcon, ArrowLongDownIcon } from '@heroicons/react/24/solid'
import * as HeroIcons from '@heroicons/react/24/outline'
import * as iconsMd from 'react-icons/md'
import functions from 'v-functions'
import { groupBy, countBy } from 'underscore'
import mq from 'js-mq'
import { useTranslations } from 'next-intl';

import PropTypes from 'prop-types'
/**
 * @brief Componente que permite visualizar datos en filas tipo tabla
 * @param headers encabezados o columnas a mostrar en la tabla, caso especial value que inicia con '*' indica que no es columna basetable, list indica que se muestra la información segun una lista
 * @param item los datos que son pasados a la tabla
 * @param sortHeaders campos o columnas que filtran la tabla
 * @param searchText palabra o texto de busqueda general, es decir, en todas las columnas
 * @param selectedRowsPerPage indica cuantas filas por pagina son visualizadas
 * @param selectedPage indica la pagina a visualizar
 * @param onNewItem evento que se debe disparar al presionar el boton Nuevo
 * @param onEditItem evento que se debe disparar al presionar el boton Editar (lapiz)
 * @param onDeleteItem evento que se debe disparar al presionar el boton Eliminar (basurero)
 * @paran UpperButtons botones adicionales en el top antes del campo de busqueda
 * @paran UpperRightButtons botones adicionales en el top antes del botón de New
 */
DataTable.propTypes = {
  headers: PropTypes.array,
  items: PropTypes.array,
  groupTableBy: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  calculatedColumns: PropTypes.array, // [{ aggregation_type: 'min', data_id: 1, value: 'monto_total', filters: [{ column: 'to_pay', value: 'S' }] }]
  sortHeaders: PropTypes.array,
  searchText: PropTypes.string,
  headerClass: PropTypes.string,
  groupClass: PropTypes.string,
  selectedRowsPerPage: PropTypes.number,
  selectedPage: PropTypes.number,
  showNewButton: PropTypes.bool,
  showEditButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  showActions: PropTypes.bool,
  onNewItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  UpperButtons: PropTypes.func,
  UpperRightButtons: PropTypes.func,
  PrependActionButtons: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  i18n: PropTypes.object,
  router: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  environment: PropTypes.object,
  hideSearchHeader: PropTypes.bool,
  groupHeaders: PropTypes.array,
  onClickRow: PropTypes.func,
  onClickCelda: PropTypes.func,
  searchRequired: PropTypes.bool,
  highlightListItems: PropTypes.bool,
  onSearch: PropTypes.func,
  showTotales: PropTypes.bool,
  hideInputSearch: PropTypes.bool,
  urlServerImages: PropTypes.string
}

const fsHeader = ' xs:text-md sm:text-md md:text-md lg:text-base xl:text-base ' // ' via-label !text-white '
const fsCelda = ' xs:text-base sm:text-base md:text-base lg:text-sm xl:text-sm ' // ' via-input '

// From https://reactjs.org/docs/hooks-state.html
export default function DataTable ({ fontClassHeader, fontClassCelda, headers, items, groupTableBy, sortHeaders = [], searchText = '', headerClass = 'bg-slate-500 ', groupClass = '', selectedRowsPerPage = 10, selectedPage = 1, showNewButton = true, showEditButton = true, showDeleteButton = true, showActions = true, onNewItem, onEditItem, onDeleteItem, UpperButtons, UpperRightButtons, PrependActionButtons, i18n = { t: () => { return 'txtNone' } }, router = {}, environment = {}, hideSearchHeader = false, groupHeaders, onClickCelda = () => {}, onClickRow = () => {}, searchRequired = true, highlightListItems = true, onSearch = () => {}, calculatedColumns = [], showTotales = false, hideInputSearch = false, mobileItemAside, divideDocumentUrl = true, useOverflow = true, textRowsPerPage, urlServerImages, HeaderActionButtons, onChangePaginator = () => {}, totalItems, stylesHeaders = {}, overflowHidden = true, tableAsideClass, tableAside, headerAsideClass, headerAside }) {
  // const i18n = useI18n()
  // const router = useRouter()
  const t = useTranslations('general');
  const [_selectedRowsPerPage, setSelectedRowsPerPage] = useState(selectedRowsPerPage)
  const [_selectedPage, setSelectedPage] = useState(selectedPage)
  const [_sortHeaders, setSortHeaders] = useState(sortHeaders)
  const [_searchText, setSearchText] = useState(searchText)
  const [initialIndex, setInitialIndex] = useState(0)
  const [finalIndex, setFinalIndex] = useState(0)
  const [_totalItems, setTotalItems] = useState(totalItems ?? 0)
  const [filteredItems, setFilteredItems] = useState([])
  const [objRefCalculated, setObjRefCalculated] = useState({})
  const [resultCalculated, setResultCalculated] = useState({})
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const fileServerUrl = urlServerImages ?? process.env.urlServerImages
  
  const getFontSize = (base, fsClass) => {
    if (base != null &&
        (base.includes('text-xs') || base.includes('text-sm') || base.includes('text-base') || base.includes('text-md') || base.includes('text-lg') || base.includes('text-xl'))) {
      return ''
    }
    return fsClass
  }


  /**
   * @brief verifica si una fila incluye un texto de busqueda
   * @param {*} item fila o registro
   * @param {*} search texto a buscar
   * @returns verdadero si el texto se incluye en alguno de los campos sino falso
   */
  const testHeadersIncludes = (item, search) => {
    if (search && search !== null && search.length > 0 && item && item !== null) {
      const realHeaders = headers.filter(head => head.value.includes('*') === false)
      for (let idx = 0; idx < realHeaders.length; idx++) {
        if (item[realHeaders[idx].value] && typeof (item[realHeaders[idx].value] + ' ').includes === 'function' && (item[realHeaders[idx].value] + ' ').toLowerCase().includes(search.toLowerCase()) === true) {
          return true
        }
      }
      // revisa en los headers que tienen listas asociadas
      const listHeaders = headers.filter(head => head.list && Array.isArray(head.list) && head.list.length > 0)
      for (let idx = 0; idx < listHeaders.length; idx++) {
        if (item[realHeaders[idx].value] && item[realHeaders[idx].value] !== null) {
          const valOfItem = listHeaders[idx].list.filter(list => list.valor === item[realHeaders[idx].value])
          if (valOfItem && Array.isArray(valOfItem) && valOfItem.length > 0) {
            for (let idxList = 0; idxList < valOfItem.length; idxList++) {
              if ((valOfItem[idxList].texto + ' ').toLowerCase().includes(search.toLowerCase()) === true) {
                return true
              }
            }
          }
        }
      }
      return false
    }
    return true
  }

  /**
   * @brief comparador generico de arreglo de objetos para ordenarlo *reducer*
   * @param {*} sortHdrs arreglo de objetos, value el campo a comparar, direction (1) ascendente, (-1) descendente
   * @param {*} a el registro actual
   * @param {*} b el registro siguiente
   * @returns -1, 0, 1 según corresponda la direccion del ordenamiento
   */
  const sort = (sortHdrs, a, b) => {
    let i = 0
    let result = 0
    while (i < sortHdrs.length && result === 0) {
      if (typeof a[sortHdrs[i].value] === 'undefined') {
        i++
        continue
      }
      if (typeof b[sortHdrs[i].value] === 'undefined') {
        i++
        continue
      }
      const aVal = a[sortHdrs[i].value] ?? ''
      const bVal = b[sortHdrs[i].value] ?? ''
      result = sortHdrs[i].direction * (aVal.toString() < bVal.toString() ? -1 : (aVal.toString() > bVal.toString() ? 1 : 0))
      i++
    }
    return result
  }

  const validarNumero = (valor) => {
    var numero = parseFloat(valor)
    if (isNaN(numero)) {
      return 0
    }
    return numero
  }

  const tryFormatValue = (valToFormat, format, type, showTextOnNull = false, textOnNull = '') => {
    let formatedValue = ''
    try {
      formatedValue = functions.formatedValue(valToFormat, format, type, showTextOnNull, textOnNull)
    } catch (e) {
      formatedValue = valToFormat
    }
    return formatedValue
  }

  const validarFiltrosCalculos = (conf, fila) => {
    if (conf != null && conf.filters != null && conf.filters.length ) {
      let continuar = true
      conf.filters.forEach((filter) => {
        if (fila[filter.column] !== filter.value) {
          continuar = false
        }
      })
      return continuar
    }
    return true
  }

  /**
   * @brief actualizar un subconjunto de las filas filtradas, ordenadas y en el rango de filas a visualizar
   * @param {*} allItems el arreglo completo de filas
   * @param {*} sortHdrs los encabezados de ordenamiento
   * @param {*} rows filas por pagina seleccionada
   * @param {*} pg pagina seleccionada
   */
  const updateFilteredItems = (allItems = [], sortHdrs = [], rows = 10, pg = 1) => {
    const _objRefCalculated = {}
    if (calculatedColumns != null && calculatedColumns.length) {
      calculatedColumns.forEach((calCol) => {
        _objRefCalculated[calCol.value] ??= 0
        _objRefCalculated[calCol.value]++
      })
    }
    
    const helem = document.getElementById('_searchText')
    const text = helem != null ? helem.value : ''
    let _items = [...allItems]
    let filtered = _items.filter(item => testHeadersIncludes(item, text))
    let _allItems = _items.filter(item => testHeadersIncludes(item, text))

    filtered = filtered.sort((a, b) => sort(sortHdrs, a, b))
    let initial = 0
    let final = 0
    const countItems = totalItems ?? filtered.length
    let page = 1
    if (countItems > 0) {
      initial = (pg - 1) * rows + 1
      final = pg * rows > countItems ? countItems : pg * rows
      page = pg > (countItems / rows) ? 1 : pg
    }
    setInitialIndex(initial)
    setFinalIndex(final)
    if (totalItems == null) {
      setSelectedPage(page)
    }
    const _resultCalculated = {}
    if (groupTableBy && groupTableBy !== null) {
      const grouped = groupBy(filtered, groupTableBy.value)
      let allIndex = 0
      filtered = {} // lo convierte a objeto
      // crea nuevas llaves
      Object.keys(grouped).forEach(key => {
        filtered[key] = {
          count: 0,
          data: []
        }
      })
      let idx = 0
      Object.keys(grouped).forEach(key => {
        for (let idxKey = 0; idxKey < grouped[key].length; idxKey++) {
          if (totalItems == null) {
            if (idx >= initial - 1 && idx <= final -1) {
              filtered[key].data.push(grouped[key][idxKey])
            }
          }
          if (calculatedColumns != null && calculatedColumns.length) {
            calculatedColumns.forEach((calCol) => {
              const calKey = `${calCol.aggregation_type}_${calCol.value}_${calCol.data_id}`
              if (filtered[key][calKey] == null) {
                filtered[key][calKey] = 0
              }
              if (_resultCalculated[calKey] == null) {
                _resultCalculated[calKey] = 0
              }
              let calcular = validarFiltrosCalculos(calCol, grouped[key][idxKey])
              if (calcular) {
                filtered[key].count = filtered[key].count + 1
                let _val = validarNumero(grouped[key][idxKey][calCol.value])
                if (calCol.format != null) {
                  const unformatVal = validarNumero(grouped[key][idxKey][`rv_${calCol.value}`]) // functions.unformatedValue(grouped[key][idxKey][calCol.value], calCol.format, calCol.type, true, 0)
                  _val = validarNumero(unformatVal) 
                }
                if (calCol.aggregation_type === 'max') {
                  if (_val > filtered[key][calKey] || idxKey === 0) {
                    filtered[key][calKey] = _val
                  }
                  if (_val > _resultCalculated[calKey] || allIndex === 0) {
                    _resultCalculated[calKey] = _val
                  }
                } else if (calCol.aggregation_type === 'min') {
                  if (_val < filtered[key][calKey] || idxKey === 0) {
                    filtered[key][calKey] = _val
                  }
                  if (_val < _resultCalculated[calKey] || allIndex === 0) {
                    _resultCalculated[calKey] = _val
                  }
                } else {
                  filtered[key][calKey] = filtered[key][calKey] + _val
                  _resultCalculated[calKey] = _resultCalculated[calKey] + _val
                }
                allIndex++
              }
            })
          }
          idx++
        }
        if (calculatedColumns != null && calculatedColumns.length) {
          // console.log('calculatedColumns ', calculatedColumns)
          calculatedColumns.forEach((calCol) => {
            const calKey = `${calCol.aggregation_type}_${calCol.value}_${calCol.data_id}`
            if (calCol.aggregation_type === 'avg') {
              filtered[key][calKey] = (filtered[key][calKey] / filtered[key].count)
            } if (calCol.aggregation_type === 'countd') {
              const objCountDistinct = countBy(grouped[key], (item) => {
                if (calCol.type === 'number') {
                  return validarNumero(item[calCol.value]);
                }
                return item[calCol.value]
              })
              const arrKeyDistinct = Object.keys(objCountDistinct)
              filtered[key][calKey] = arrKeyDistinct.length
            } if (calCol.aggregation_type === 'count') {
              filtered[key][calKey] = filtered[key].count
            }
          })
        }
      })
      if (calculatedColumns != null && calculatedColumns.length) {
        // console.log('calculatedColumns ', calculatedColumns)
        calculatedColumns.forEach((calCol) => {
          const calKey = `${calCol.aggregation_type}_${calCol.value}_${calCol.data_id}`
          if (calCol.aggregation_type === 'avg') {
            _resultCalculated[calKey] = (_resultCalculated[calKey] / (allIndex+1))
          } if (calCol.aggregation_type === 'countd') {
            const objCountDistinct = countBy(_allItems, (item) => {
              if (calCol.type === 'number') {
                return validarNumero(item[calCol.value]);
              }
              return item[calCol.value]
            })
            const arrKeyDistinct = Object.keys(objCountDistinct)
            _resultCalculated[calKey] = arrKeyDistinct.length
          } if (calCol.aggregation_type === 'count') {
            _resultCalculated[calKey] = (allIndex+1)
          }
        })
      }
    } else {
      let filteredCount = 0
      if (filtered.length && calculatedColumns != null && calculatedColumns.length) {
        filtered.forEach((fila, idxKey) => {
          if (calculatedColumns != null && calculatedColumns.length) {
            calculatedColumns.forEach((calCol) => {
              const calKey = `${calCol.aggregation_type}_${calCol.value}_${calCol.data_id}`
              if (_resultCalculated[calKey] == null) {
                _resultCalculated[calKey] = 0
              }
              let calcular = validarFiltrosCalculos(calCol, fila)
              if (calcular) {
                filteredCount++
                let _val = validarNumero(fila[calCol.value])
                if (calCol.format != null) {
                  const unformatVal = validarNumero(fila[`rv_${calCol.value}`]) // functions.unformatedValue(fila[calCol.value], calCol.format, calCol.type, true, 0)
                  _val = validarNumero(unformatVal) 
                }
                if (calCol.aggregation_type === 'max') {
                  if (_val > _resultCalculated[calKey] || idxKey === 0) {
                    _resultCalculated[calKey] = _val
                  }
                } else if (calCol.aggregation_type === 'min') {
                  if (_val < _resultCalculated[calKey] || idxKey === 0) {
                    _resultCalculated[calKey] = _val
                  }
                } else {
                  _resultCalculated[calKey] = _resultCalculated[calKey] + _val
                }
              }
            })
          }
        })
        if (calculatedColumns != null && calculatedColumns.length) {
          // console.log('calculatedColumns ', calculatedColumns)
          calculatedColumns.forEach((calCol) => {
            const calKey = `${calCol.aggregation_type}_${calCol.value}_${calCol.data_id}`
            if (calCol.aggregation_type === 'avg') {
              _resultCalculated[calKey] = (_resultCalculated[calKey] / filteredCount)
            } if (calCol.aggregation_type === 'countd') {
              const objCountDistinct = countBy(filtered, (item) => {
                if (calCol.type === 'number') {
                  return validarNumero(item[calCol.value]);
                }
                return item[calCol.value]
              })
              const arrKeyDistinct = Object.keys(objCountDistinct)
              _resultCalculated[calKey] = arrKeyDistinct.length
            } if (calCol.aggregation_type === 'count') {
              _resultCalculated[calKey] = filteredCount
            }
          })
        }
      }
      if (totalItems == null) {
        filtered = filtered.slice(initial - 1, final)
      }
    }
    setResultCalculated(_resultCalculated)
    setFilteredItems(filtered)
    setTotalItems(totalItems ?? countItems)
    setObjRefCalculated(_objRefCalculated)
    _items = null
  }

  /**
   * @brief Agrega encabezados en ascendente a los encabezados de búsqueda, si el encabezado ya existe lo cambia a descendente, si ya existe como descendente lo quita del arreglo
   * @param {*} header encabezado a agregar a los ordenamientos
   */
  const setSortBy = (header) => {
    const sorters = _sortHeaders.filter(head => head.value === header.value)
    const tempSortHeaders = _sortHeaders.slice()
    if (Array.isArray(sorters) && sorters.length > 0) {
      const idx = tempSortHeaders.indexOf(sorters[0])
      if (sorters[0].sort === 'asc') {
        tempSortHeaders.splice(idx, 1, { ...header, sort: 'desc', direction: 1 })
      } else {
        tempSortHeaders.splice(idx, 1)
      }
    } else {
      tempSortHeaders.push({ ...header, sort: 'asc', direction: -1 })
    }
    setSortHeaders(tempSortHeaders)
    updateFilteredItems(items, tempSortHeaders, _selectedRowsPerPage, _selectedPage)
  }

  /**
   * @brief permite determinar si un encabezado es parte de los ordenamiento y la dirección del ordenamiento
   * @param {*} header encabezado a evaluar
   * @returns 'asc', 'desc', 'none' si no tiene ordenamiento por dicho encabezado
   */
  const orderByHeader = (header) => {
    const sorters = _sortHeaders.filter(head => head.value === header.value)
    if (Array.isArray(sorters) && sorters.length > 0) {
      return sorters[0].sort
    }
    return 'none'
  }

  /**
   * @brief Devuelve el icono svg para un campo de conteo
   * @param {*} header encabezado a evaluar
   * @param {*} item
   * @returns icon svg a mostrar
   */
  const iconBadge = (header, item) => {
    try {
      const IconComponent = HeroIcons[header.icon]
      if (IconComponent != null) {
        return (
          <button
            type='button'
            className='inline-flex relative items-center p-3 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none '
            onClick={() => {
              if (header.toLocation != null) {
                functions.setEncodeStorage(`${process.env.idApp}/${process.env.NODE_ENV}${header.toLocation}:item`, item)
                functions.setEncodeStorage(`${process.env.idApp}/${process.env.NODE_ENV}${header.toLocation}:header`, header)
                router.push(`${header.toLocation}/${environment.getTime()}`)
              }
            }}
          >
            <IconComponent className={`h-6 w-6 left-1/2 p-0 mt-0.5 ml-1 mr-1 ${header.iconClass}`} />
            <div className='sr-only'>{header.text}</div>
            <div className={`inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold  rounded-full border-2 ${header.badgeClass}`}>{item[header.value]}</div>
          </button>
        )
      }
      const IconComponentMd = iconsMd[header.icon]
      if (IconComponentMd != null) {
        return (
          <button
            type='button'
            className='inline-flex relative items-center p-3 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none '
            onClick={() => {
              if (header.toLocation != null) {
                functions.setEncodeStorage(`${process.env.idApp}/${process.env.NODE_ENV}${header.toLocation}:item`, item)
                functions.setEncodeStorage(`${process.env.idApp}/${process.env.NODE_ENV}${header.toLocation}:header`, header)
                router.push(`${header.toLocation}/${environment.getTime()}`)
              }
            }}
          >
            <IconComponentMd className={`h-6 w-6 left-1/2 p-0 mt-0.5 ml-1 mr-1 ${header.iconClass}`} />
            <div className='sr-only'>{header.text}</div>
            <div className={`inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold  rounded-full border-2 ${header.badgeClass}`}>{item[header.value]}</div>
          </button>
        )
      }
      return null
    } catch (e) {
      return null
    }
  }

  /**
   * @brief Devuelve el icono svg de una lista de valores
   * @param {*} header encabezado a evaluar
   * @param {*} value  valor a buscar entre la lista
   * @returns icon svg a mostrar
   */
  const iconFromList = (header, value) => {
    const icon = header.list.filter(lst => (lst.valor === value || (typeof lst.valor === 'number' && lst.valor === parseFloat(value))))
    if (Array.isArray(icon) && icon.length > 0) {
      if (icon[0].icono && icon[0].icono.length > 0) {
        try {
          const IconComponent = HeroIcons[icon[0].icono]
          if (IconComponent != null) {
            return (
              <button className={`w-full flex justify-center cursor-default ${icon[0].clases_css}`} title={icon[0].texto}>
                <IconComponent className={`h-6 w-6 left-1/2 p-0 mt-0.5 ml-1 mr-1 ${icon[0].clases_css}`} />
              </button>
            )
          }
          const IconComponentMd = iconsMd[icon[0].icono]
          if (IconComponentMd != null) {
            return (
              <button className={`w-full flex justify-center cursor-default ${icon[0].clases_css}`} title={icon[0].texto}>
                <IconComponentMd className={`h-6 w-6 left-1/2 p-0 mt-0.5 ml-1 mr-1 ${icon[0].clases_css}`} />
              </button>
            )
          }
          return null
        } catch (e) {
          return null
        }
      } else {
        return icon[0].texto
      }
    }
    return ''
  }

  /**
   * @brief Devuelve el texto de una lista de valores
   * @param {*} header encabezado a evaluar
   * @param {*} value  valor a buscar entre la lista
   * @returns textos a mostrar
   */
  // const textFromList = (header, value) => {
  //   const text = header.list.filter(lst => lst.valor === value)
  //   if (Array.isArray(text) && text.length > 0) {
  //     return text[0].texto
  //   }
  //   return ''
  // }

  /**
   * @brief Devuelve las clases CSS asociadas a una lista
   * @param {*} header encabezado a evaluar
   * @param {*} value valor a busrar en la lista
   * @returns clases CSS
   */
  // const classFromList = (header, value) => {
  //   const clases = header.list.filter(lst => lst.valor === value)
  //   if (Array.isArray(clases) && clases.length > 0) {
  //     return `via-states-datatable ${clases[0].clases_css}`
  //   }
  //   return ''
  // }

  /**
   * @brief misma funcionalidad en DataForm*
   */

  const getFileParams = (item, header, name) => {
    const { filename, extension } = functions.getFilePattern(name)
    const params = {}
    if (header.logicalName && header.logicalName !== null) {
      if (typeof header.logicalName === 'function') {
        params.logico = header.logicalName(item)  
      } else {
        params.logico = header.logicalName
      }
    } else {
      params.logico = filename
    }
    if (header.logicalExtension && header.logicalExtension !== null) {
      if (typeof header.logicalExtension === 'function') {
        params.ext = header.logicalExtension(item)
      } else {
        params.ext = header.logicalExtension
      }
    } else {
      params.ext = extension
    }
    return params
  }

  const documentUrl = (header, item) => {
    const params = getFileParams(item, header, item[header.value])
    const url = `${fileServerUrl}${divideDocumentUrl !== false ? '/' : ''}${params.logico}${params.ext}`
    return url
  }

  const DisplayFile = (header, item) => {
    return (
      <>
        {header.docType && header.docType === 'img' && item[header.value] && item[header.value] !== null &&
          <img src={documentUrl(header, item)} width={100} height={100} className={'inline-block h-12 w-12 rounded-full ring-2 ring-white'} title={item[header.value]} alt={item[header.value]} />
        }
        {header.docType && header.docType !== 'img' && item[header.value] && item[header.value] !== null &&
          <div data-filetype={functions.getExtension(item[header.value])} className="filepicker-file-icon m-0 p-0 -top-3 rounded-full ring-2 ring-white" title={item[header.value]}></div>
        }
      </>
    )
  }

  const DisplayValue = ({ header, item }) => {
    try {
      if (header.substituteVal && typeof header.substituteVal === 'function') {
        return (
          <>{ header.substituteVal(item) }</>
        )
      } else if (header.inputProps && header.inputProps.type === 'file') { 
        return (
          <>{DisplayFile(header, item)}</>
        )
      } else if (header.list && header.list.length > 0) {
        return (
          <>{iconFromList(header, item[header.value])}</>
        )
      } else if (header.showAsBadge === true) {
        return (
          <>{iconBadge(header, item)}</>
        )
      } else if (header.value != null && item[header.value] != null) {
        return (
          <>{item[header.value]}</>
        )
      }
    } catch (e) {
      return (
        <></>
      )
    }
    return (
      <></>
    )
  }

  const displayTitle = (header, item) => {
    return !header.substituteVal ? (!header.showAsBadge ? (!header.list ? item[header.value] : iconFromList(header, item[header.value])) : '') : header.substituteVal(item)
  }

  const RowItem = ({ item, idxRow, onClickRow, onClickCelda, groupKey = null, idxGroupKey = null }) => {
    if (isMobile === true) {
      const mobileHeaders = headers.filter(head => (head.mobileItemAside !== true && head.showInTable !== false && head.showInMobile !== false))
      const itemsAside = headers.filter(head => (head.mobileItemAside === true && head.showInTable !== false && head.showInMobile !== false))
      return (
        <div
          className={` group hover:shadow-sm text-gray-700 hover:ring-1 ring-inset w-full ring-blue-100 ${((idxRow % 2) ? 'bg-blue-50' : '')}`}
          onClick={(event) => { onClickRow(item, idxRow, event) }} >
          <div className='flex flex-row w-full divide-y divide-x divide-blue-300' >
            <div className='flex flex-none content-center border-t border-blue-300 space-y-8 flex-wrap overflow-hidden '>
              { mobileItemAside != null && mobileItemAside(item) }
              {itemsAside.map((column, idx) => {
                return (
                  <div key={idx} className=' text-black flex w-full flex-col scale-125 '>
                    <span className=" text-[0.6rem] font-semibold text-gray-500 ml-6 "> { column.text } </span>
                    <DisplayValue header={column} item={item} />
                  </div>
                )
              })}
            </div>
            <div className='flex flex-grow w-full '>
              <table className='w-full whitespace-no-wrap ' >
                <tbody >
                  {mobileHeaders.map((column, idx) => {
                    return (
                      <tr key={idx} className=' hover:border-gray-300 border-b border-transparent' >
                        <td className=" w-32 min-w-32 max-w-32 px-1" >
                          <span className={'  text-gray-500 ' + fsHeader.replace('!text-white')} >
                            { column.text }
                          </span>
                        </td>
                        <td
                          className={` text-black pr-2 ${typeof column.classItem === 'function' && header.preventClassItem !== true ? column.classItem(item) : ''}  ${column.class ? column.class : ''} ${getFontSize(column.class, fontClassCelda ?? fsCelda)} border border-spacing-0.5 border-transparent table-cell group-hover:border-blue-300 align-middle truncate text-ellipsis overflow-hidden whitespace-nowrap ${(column.list && column.list.length && highlightListItems) > 0 ? 'via-states-datatable' : ''} `}
                          title={displayTitle(column, item)}
                          onClick={(e) => { onClickCelda(item, idxRow, column, idx, groupKey, idxGroupKey, e) }} >
                          <DisplayValue header={column} item={item} />
                        </td>
                      </tr>
                    )
                  })}
                  <tr>
                    <td colSpan={2} className='p-4 overflow-hidden ' >
                      {showActions === true &&
                        <div className={` flex w-full space-x-4 justify-center scale-150 `}>
                          {/* {PrependActionButtons ? PrependActionButtons : ''} */}
                          {/* <PrependActionButtons /> */}
                          {PrependActionButtons ? PrependActionButtons(item) : ''}
                          {showEditButton === true &&
                            <button className='rounded-sm hover:bg-blue-300' title={t('common.editRow')} onClick={() => onEditItem(item)}>
                              <PencilSquareIcon className='h-5 w-5 m-0 p-0 mr-2 ml-2 text-sky-700' />
                            </button>}
                          {showDeleteButton === true &&
                            <button className='rounded-sm hover:bg-red-300' title={t('common.deleteRow')} onClick={() => onDeleteItem(item)}>
                              <TrashIcon className='h-5 w-5 m-0 p-0 mr-2 ml-2 text-rose-700' />
                            </button>}
                        </div>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div key={idxRow} className='table-row mt-1 group hover:shadow-sm'  onClick={(event) => { onClickRow(item, idxRow, event) }}>
        { idxRow === 0 && tableAside != null &&
          <td  rowspan="0" className=" relative" >
            { typeof tableAside === 'function' ? tableAside(item) : '' }
            <div
              className={` absolute w-full h-full top-0 left-0 flex justify-center items-center px-4 py-3 bg-white ${tableAsideClass} ${overflowHidden ? ' overflow-hidden overflow-ellipsis' : ''} `} >
              { typeof tableAside === 'function' ? tableAside(item) : '' }
            </div>
          </td>
        }
        {
          headers.map((header, idxCol) => {
            if (header && header.showInTable !== false) {
              return (
                <td
                  key={idxCol}
                  className={` text-black ${idxRow % 2 !== 0 ? 'bg-neutral-200' : ''} ${header.class ? header.class : ''} ${getFontSize(header.class, fontClassCelda ?? fsCelda)} ${typeof header.classItem === 'function' && header.preventClassItem !== true ? header.classItem(item) : ''} border border-spacing-0.5 border-transparent table-cell group-hover:border-blue-300 align-middle p-1 truncate text-ellipsis overflow-hidden whitespace-nowrap ${(header.list && header.list.length && highlightListItems) > 0 ? 'via-states-datatable' : ''}`}
                  title={displayTitle(header, item)}
                  onClick={(e) => { onClickCelda(item, idxRow, header, idxCol, groupKey, idxGroupKey, e) }}
                >
                  <DisplayValue header={header} item={item} />
                </td>
              )
            }
          })
        }
        {showActions === true &&
          <div className={` align-middle table-cell border border-spacing-0.5 border-transparent group-hover:border-blue-300  text-center border p-0 ${idxRow % 2 !== 0 ? 'bg-neutral-200' : ''} group-hover:border-blue-300 w-24 `}>
            {/* {PrependActionButtons ? PrependActionButtons : ''} */}
            {/* <PrependActionButtons /> */}
            {PrependActionButtons ? PrependActionButtons(item) : ''}
            <div className="inline w-24 m-0 p-0">
              {showEditButton === true &&
                <button className='rounded-sm hover:bg-blue-300' title={t('common.editRow')} onClick={() => onEditItem(item)}>
                  <PencilSquareIcon className='h-5 w-5 m-0 p-0 mr-2 ml-2 text-sky-700' />
                </button>}
              {showDeleteButton === true &&
                <button className='rounded-sm hover:bg-red-300' title={t('common.deleteRow')} onClick={() => onDeleteItem(item)}>
                  <TrashIcon className='h-5 w-5 m-0 p-0 mr-2 ml-2 text-rose-700' />
                </button>}
            </div>
          </div>}
      </div>
    )
  }
  RowItem.propTypes = {
    item: PropTypes.object,
    idxRow: PropTypes.number
  }
  
  /* eslint-disable */
  const registrarBreckpoint = () => {
    if (typeof document !== undefined) {
      try {
        mq.register([
      /* eslint-enable */
          { name: 'mobile', query: '(max-width: 767px)' },
          { name: 'desktop', query: '(min-width: 768px)' }
        ])
        mq.on('mobile', (e) => {
          setIsMobile(true)
        })
        mq.on('desktop', (e) => {
          setIsMobile(false)
        })
        const arrayEstadoMq = mq.getState()
        if (arrayEstadoMq.length && (arrayEstadoMq[0] === 'not-mobile' || arrayEstadoMq[0] === 'desktop')) {
          setIsMobile(false)
        } else {
          setIsMobile(true)
        }
      } catch (e) {
        console.error(`Error al registrar mq breackpoints - ${e.message}`)
      }
    }
  }

  useEffect(() => {
    registrarBreckpoint()
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      onChangePaginator(_selectedPage, _selectedRowsPerPage)
    }
  }, [_selectedPage, _selectedRowsPerPage])

  useEffect(() => {
    // console.log('useEffect [items, groupTableBy]')
    if (selectedRowsPerPage != null && selectedRowsPerPage !== _selectedRowsPerPage && isMounted) {
      setSelectedRowsPerPage(selectedRowsPerPage)
      updateFilteredItems(items, _sortHeaders, selectedRowsPerPage, _selectedPage)
    }
  }, [selectedRowsPerPage])
  /**
   * actualiza la visualizacion al cambiar los items
   */
  useEffect(() => {
    // console.log('useEffect [items, groupTableBy]')
    updateFilteredItems(items, _sortHeaders, _selectedRowsPerPage, _selectedPage)
  }, [items, groupTableBy, selectedRowsPerPage])

  useEffect(() => {
    if (isMounted === true && calculatedColumns != null && calculatedColumns.length) {
      // console.log('useEffect [calculatedColumns]')
      updateFilteredItems(items, _sortHeaders, _selectedRowsPerPage, _selectedPage)
    }
  }, [calculatedColumns])

  return (
    <>
      {/* busqueda general por texto */}
      { hideSearchHeader !== true && 
        <div className='form-group w-full flex flex-row pb-1'>
          {UpperButtons ? UpperButtons() : ''}
          { hideInputSearch !== true &&
            <div className='w-full relative mr-2'>
              <input
                id='_searchText'
                name='_searchText'
                value={_searchText}
                required={searchRequired}
                // placeholder={ i18n ? i18n.t('common.search') : '' }
                type='text'
                className='via-input'
                onKeyDown={(e) => { if (e.key === 'Enter') { setSearchText(e.target.value); onSearch(e.target.value); updateFilteredItems(items, _sortHeaders, _selectedRowsPerPage, _selectedPage) } }}
                onInput={(e) => { setSearchText(e.target.value); onSearch(e.target.value); updateFilteredItems(items, _sortHeaders, _selectedRowsPerPage, _selectedPage); }}
                onChange={() => { }}
              />
              {_searchText && _searchText.length > 0 &&
                <button
                  className='via-append-input-extra'
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); document.getElementById('_searchText').value = ''; setSearchText(''); updateFilteredItems(items, _sortHeaders, _selectedRowsPerPage, _selectedPage) }}
                >
                  <BackspaceIcon className='w-5 h-5' />
                </button>}
              <button
                className='via-append-input'
                onClick={(e) => { e.stopPropagation() }}
                disabled
              >
                <MagnifyingGlassIcon className='w-5 h-5' />
              </button>
            </div>
          }
          {UpperRightButtons ? UpperRightButtons() : ''}
          {showNewButton === true &&
            <button
              type='button'
              className='w-36 focus:ring-4 focus:outline-none font-medium rounded-lg text-base px-5 py-0.5 text-center inline-flex items-center mr-2 text-white bg-emerald-600 hover:bg-emerald-700  focus:ring-emerald-300  dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800'
              onClick={() => onNewItem()}
            >
              <DocumentPlusIcon className='mr-2 -ml-1 w-5 h-5' />
              {t('common.newItem')}
            </button>}
        </div>
      }

      <div className={` ${ useOverflow ? 'overflow-auto' : ''} rounded-lg shadow `}>
        {/* divs en visualizacion tipo tabla */}
        { isMobile !== true &&
          <table className='table table-fixed w-[800px] md:w-full bg-slate-50'>
            {/* encabezado */}
            <thead className='table-header-group '>
              { groupHeaders != null && groupHeaders.length &&
                <tr className='table-row'>
                  {groupHeaders.map((header, idx) => {
                    return (
                      <th
                        key={idx}
                        id='identificador-grupo-table'
                        className={`px-3 py-1 text-center overflow-hidden ${header.class ? header.class : ''} ${getFontSize(header.class, fontClassHeader ?? fsHeader)} `}
                        colSpan={header.colspan} >
                        { header.text }
                        { header.element != null ? header.element() : '' }
                      </th>
                    )
                  })}
                </tr>
              }
              <tr className='table-row'>
                { tableAside != null &&
                  <th className={` px-3 py-1 text-center overflow-hidden ${headerAsideClass} `}>
                    { headerAside != null && typeof headerAside === 'function' ? headerAside() : '' }
                  </th>
                }
                {headers.map((header, idx) => {
                  if (header && header.showInTable !== false) {
                    return (
                      // truncate text-ellipsis overflow-hidden whitespace-nowrap
                      <td
                        key={idx}
                        id='dtbl-header'
                        className={`relative align-middle !table-cell text-center font-semibold border p-1 text-gray-50 ${idx === 0 ? 'rounded-tl-lg' : idx === headers.length - 1 ? 'rounded-tr-lg' : ''} ${header.headerClass ? header.headerClass : ''}  ${getFontSize(header.headerClass, fontClassHeader ?? fsHeader)} ${headerClass}`}
                        style={{ ...(stylesHeaders ?? {}) }}
                        onClick={() => { if (header.value.includes('*') === false) { setSortBy(header) } }}
                      >
                        {header.text}
                        {header && header.value && header.value.includes('*') === false && orderByHeader(header) === 'asc' &&
                          <div className='inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full'>
                            <ArrowLongUpIcon className='w-3 h-3' />
                          </div>}
                        {header && header.value && header.value.includes('*') === false && orderByHeader(header) === 'desc' &&
                          <div className='inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full'>
                            <ArrowLongDownIcon className='w-3 h-3' />
                          </div>}
                        {HeaderActionButtons ? HeaderActionButtons(header) : ''}
                      </td>
                    )
                  }
                })}
                {/* Actions Header Col */}
                {showActions === true &&
                  <div
                    className={`!table-cell align-middle text-center font-semibold border p-1 bg-slate-500 text-gray-50 rounded-tr-lg w-24 ${headerClass} ${getFontSize(headerClass, fontClassHeader ?? fsHeader)} `}
                  >
                    {t('common.actions')}
                  </div>}
              </tr>
            </thead>
            {/* filas */}
            <tbody className='table-row-group bg-white'>
              {filteredItems && Array.isArray(filteredItems) === false && // crea una fila de agrupacion
                Object.keys(filteredItems).map((groupKey, idxGroupKey) => {
                  let _headersTable = headers.filter((head) => (head.showInTable !== false))
                  return (
                    <>
                      <tr className='table-row'>
                        <td key={'group_' + idxGroupKey} className={`col-span-full bg-slate-300 text-slate-800 ${groupClass}`} colSpan={_headersTable.length}>
                          <div className='flex w-full items-center justify-between' >
                            <div className='flex items-center ' >
                              <div className='inline-flex text-sm'>{groupTableBy && groupTableBy !== null ? groupTableBy.label + ': ' : ''}</div>
                              {groupTableBy && groupTableBy !== null &&
                                <>
                                  <div className={`inline-flex font-medium ml-1 items-baseline  ${getFontSize(headerClass, fontClassHeader ?? fsHeader)} `}> {groupTableBy.list ? iconFromList(groupTableBy, groupKey) : groupKey} </div>
                                  <div className='inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full'>
                                    {filteredItems[groupKey].count}
                                  </div>
                                </>}
                            </div>
                            <div className='flex items-center ' >
                              { calculatedColumns.map((calCol, idx) => {
                                const calKey = `${calCol.aggregation_type}_${calCol.value}_${calCol.data_id}`
                                return (
                                  <div className='inline-flex justify-between justify-self-end px-2 items-center ml-2 w-40 text-xs font-semibold text-blue-800 bg-blue-200 rounded-md -top-0.5' key={idx} >
                                    <div className=' flex flex-col w-20 truncate' >
                                      <span >{ i18n.t(`queryDefinition.qd_${calCol.aggregation_type}`) }</span>
                                      <span>{ calCol.text } </span>
                                    </div>
                                    <div className=' flex items-center text-sm text-black' >
                                      { calCol.aggregation_type !== 'count' && calCol.aggregation_type !== 'countd' &&
                                        <span title={filteredItems[groupKey][calKey]} >
                                          { calCol.format != null ? tryFormatValue(filteredItems[groupKey][calKey], calCol.format, calCol.type, true, 0) : functions.formatMoney(filteredItems[groupKey][calKey]) }
                                        </span>
                                      }
                                      { (calCol.aggregation_type === 'count' || calCol.aggregation_type === 'countd') &&
                                        <span>{ filteredItems[groupKey][calKey] }</span>
                                      }
                                    </div>
                                  </div>
                                )
                              }) }
                            </div>
                          </div>
                        </td>
                      </tr>
                      {filteredItems[groupKey] && filteredItems[groupKey].data && Array.isArray(filteredItems[groupKey].data) && filteredItems[groupKey].data.map((item, idxRow) => {
                        return <RowItem key={idxGroupKey + '_' + idxRow} item={item} idxRow={idxRow} onClickRow={onClickRow} onClickCelda={onClickCelda} groupKey={groupKey} idxGroupKey={idxGroupKey} />
                      })}
                    </>
                  )
                })}
              {Array.isArray(filteredItems) &&
                filteredItems.map((item, idxRow) => {
                  return <RowItem key={idxRow} item={item} idxRow={idxRow} onClickRow={onClickRow} onClickCelda={onClickCelda} />
                })}
            </tbody>
            { showTotales && 
              <tfoot className='table-header-group '>
                <tr className='table-row'>
                  {headers.map((header, idx) => {
                    if (header && header.showInTable !== false) {
                      if (objRefCalculated[header.value] == null || objRefCalculated[header.value] < 0) {
                        return (
                          // truncate text-ellipsis overflow-hidden whitespace-nowrap
                          <td
                            key={idx}
                            className={` align-middle !table-cell font-semibold border p-1  ${header.footerClass ? header.footerClass : ' text-right '}`}
                          >
                            { typeof header.footerLabel === 'function' ? header.footerLabel(header) : header.footerLabel }
                          </td>
                        )
                      }
                      const arrObjCalculated = (calculatedColumns != null && calculatedColumns.length) ? calculatedColumns.filter((calCol) => (calCol.value === header.value)) : []
                      ///const calCol = arrObjCalculated[arrObjCalculated.length - 1]
                      return (
                        // truncate text-ellipsis overflow-hidden whitespace-nowrap
                        <td
                          key={idx}
                          className={`align-middle !table-cell text-right font-semibold border px-1  ${header.footerClass ? header.footerClass : ''}`}
                        >
                          {arrObjCalculated.map((calCol) => {
                            const calKey = `${calCol.aggregation_type}_${calCol.value}_${calCol.data_id}`
                            return (
                              <div key={calKey} className={`group border-b flex flex-col w-full overflow-auto relative py-1 ${header.footerClass ? header.footerClass : ''}`} >
                                <div className=' flex w-full absolute top-0 ' >
                                  <span className={`bg-white group-hover:opacity-25 transition duration-300 px-2 py-1 rounded-full  ${getFontSize(header.footerLabelClass, fontClassCelda ?? fsCelda)}  ${header.footerLabelClass ? header.footerLabelClass : ''}`} >{ header.footerLabel ?? i18n.t(`queryDefinition.qd_${calCol.aggregation_type}`) }</span>
                                </div>
                                <div className=' flex w-full justify-end ' >
                                  { calCol.aggregation_type !== 'count' && calCol.aggregation_type !== 'countd' &&
                                    <span className={` ${getFontSize(header.footerResultClass, fontClassHeader ?? fsHeader)} ${header.footerResultClass ? header.footerResultClass : ''}`} title={resultCalculated[calKey]} >
                                      { calCol.format != null ? tryFormatValue(resultCalculated[calKey], calCol.format, calCol.type, true, 0) : functions.formatMoney(resultCalculated[calKey]) }
                                    </span>
                                  }
                                  { (calCol.aggregation_type === 'count' || calCol.aggregation_type === 'countd') &&
                                    <span className={` ${getFontSize(header.footerResultClass, fontClassHeader ?? fsHeader)} ${header.footerResultClass ? header.footerResultClass : ''}`} >{ resultCalculated[calKey] }</span>
                                  }
                                </div>
                              </div>
                            )
                          })}
                        </td>
                      )
                    }
                  })}
                  {/* Actions Header Col */}
                  {showActions === true &&
                    <div
                      className={` align-middle !table-cell text-center font-semibold border `}
                    >
                    </div>}
                </tr>
              </tfoot>
            }
          </table>
        }
        { isMobile === true &&
          <div className="flex flex-col bg-white divide-y divide-x items-center block " >
            {filteredItems && Array.isArray(filteredItems) === false && // crea una fila de agrupacion
              Object.keys(filteredItems).map((groupKey, idxGroupKey) => {
                if (isMobile === true) {
                  return (
                    <>
                      <div key={'group_' + idxGroupKey} className={` bg-slate-300 text-slate-800 ${groupClass} w-full flex-wrap space-y-1 space-x-2 px-2`} >
                        <div className=' flex w-full items-center' >
                          <div className='inline-flex text-sm '>{groupTableBy && groupTableBy !== null ? groupTableBy.label + ': ' : ''}</div>
                          {groupTableBy && groupTableBy !== null &&
                            <>
                              <div className='inline-flex font-medium ml-1 items-baseline'> {groupTableBy.list ? iconFromList(groupTableBy, groupKey) : groupKey} </div>
                              <div className='inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full'>
                                {filteredItems[groupKey].count}
                              </div>
                            </>}
                        </div>
                        { calculatedColumns.map((calCol, idx) => {
                          const calKey = `${calCol.aggregation_type}_${calCol.value}_${calCol.data_id}`
                          return (
                            <div className='group inline-flex justify-between justify-self-end px-2 items-center w-44 text-xs font-semibold text-blue-800 bg-blue-200 rounded-md -top-0.5' key={idx} >
                              <div className=' flex flex-col w-20 truncate' >
                                <span >{ i18n.t(`queryDefinition.qd_${calCol.aggregation_type}`) }</span>
                                <span>{ calCol.text } </span>
                              </div>
                              <div className=' flex items-center text-sm text-black' >
                                { calCol.aggregation_type !== 'count' && calCol.aggregation_type !== 'countd' &&
                                  <span title={filteredItems[groupKey][calKey]} >
                                    { calCol.format != null ? tryFormatValue(filteredItems[groupKey][calKey], calCol.format, calCol.type, true, 0) : functions.formatMoney(filteredItems[groupKey][calKey]) }
                                  </span>
                                  
                                }
                                { (calCol.aggregation_type === 'count' || calCol.aggregation_type === 'countd') &&
                                  <span>{ filteredItems[groupKey][calKey] }</span>
                                }
                              </div>
                            </div>
                          )
                        }) }
                      </div>
                      {filteredItems[groupKey] && filteredItems[groupKey].data && Array.isArray(filteredItems[groupKey].data) && filteredItems[groupKey].data.map((item, idxRow) => {
                        return <RowItem key={idxGroupKey + '_' + idxRow} item={item} idxRow={idxRow} onClickRow={onClickRow} onClickCelda={onClickCelda} groupKey={groupKey} idxGroupKey={idxGroupKey} />
                      })}
                    </>
                  )
                }
                return (
                  <></>
                )
              })}
            {Array.isArray(filteredItems) &&
              filteredItems.map((item, idxRow) => {
                return <RowItem key={idxRow} item={item} idxRow={idxRow} onClickRow={onClickRow} onClickCelda={onClickCelda} />
              })}
            { showTotales && 
              <div className={`  hover:shadow-sm text-gray-700 hover:ring-1 ring-inset w-full ring-blue-100 ${((filteredItems.length % 2) ? 'bg-blue-50' : '')}`} >
                <div className='flex flex-grow w-full '>
                  <table className='w-full whitespace-no-wrap ' >
                    <tbody >
                      {headers.map((header, idx) => {
                        if (header && header.showInTable !== false) {
                          if (header.footerLabel == null && (objRefCalculated[header.value] == null || objRefCalculated[header.value] < 0)) {
                            return (
                              <></>
                            )
                          }
                          if ((objRefCalculated[header.value] == null || objRefCalculated[header.value] < 0) && header.footerLabel != null ) {
                            return (
                              // truncate text-ellipsis overflow-hidden whitespace-nowrap
                              <tr key={idx}>
                                <td 
                                  className={` font-semibold border p-1  ${header.footerClass ? header.footerClass : ' text-right '}`}
                                >
                                  { header.footerLabel }
                                </td>
                              </tr>
                            )
                          }
                          const arrObjCalculated = (calculatedColumns != null && calculatedColumns.length) ? calculatedColumns.filter((calCol) => (calCol.value === header.value)) : []
                          // const calCol = arrObjCalculated[arrObjCalculated.length - 1]
                          // const calKey = `${calCol.aggregation_type}_${calCol.value}_${calCol.data_id}`
                          return (
                            // truncate text-ellipsis overflow-hidden whitespace-nowrap
                            <tr key={idx} >
                              <td
                                className={` flex flex-col w-full font-semibold border p-1  ${header.footerClass ? header.footerClass : ''}`}
                              >
                                <div className='w-full bg-blue-50 pb-1 px-2 border-t '>
                                  <span className={` ${header.footerLabelClass ? header.footerLabelClass : ''}`} >{ arrObjCalculated[0].text }</span>
                                </div>
                                {arrObjCalculated.map((calCol) => {
                                  const calKey = `${calCol.aggregation_type}_${calCol.value}_${calCol.data_id}`
                                  return (
                                    <div key={calKey} className={`group flex flex-col w-full overflow-auto relative ${header.footerClass ? header.footerClass : ''}`} >
                                      <div className=' flex w-full absolute top-0 ' >
                                        <span className={`bg-white group-hover:opacity-25 transition duration-300 px-2 py-1 rounded-full  ${header.footerLabelClass ? header.footerLabelClass : ''}`} >{ header.footerLabel ?? i18n.t(`queryDefinition.qd_${calCol.aggregation_type}`) }</span>
                                      </div>
                                      <div className=' flex w-full justify-end ' >
                                        { calCol.aggregation_type !== 'count' && calCol.aggregation_type !== 'countd' &&
                                          <span className={` ${header.footerResultClass ? header.footerResultClass : ''}`} title={resultCalculated[calKey]} >
                                            { calCol.format != null ? tryFormatValue(resultCalculated[calKey], calCol.format, calCol.type, true, 0) : functions.formatMoney(resultCalculated[calKey]) }
                                          </span>
                                        }
                                        { (calCol.aggregation_type === 'count' || calCol.aggregation_type === 'countd') &&
                                          <span className={` ${header.footerResultClass ? header.footerResultClass : ''}`} >{ resultCalculated[calKey] }</span>
                                        }
                                      </div>
                                    </div>
                                  )
                                })}
                              </td>
                            </tr>
                          )
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            }
          </div>
        }

        <Paginator
          i18n={i18n}
          initialIndex={initialIndex}
          finalIndex={finalIndex}
          totalItems={_totalItems}
          selectedRowsPerPage={(_selectedRowsPerPage != null && _selectedRowsPerPage) ? _selectedRowsPerPage : 10}
          selectedPage={_selectedPage}
          onChangeRowsPerPage={(rows) => { setSelectedRowsPerPage(rows); updateFilteredItems(items, _sortHeaders, rows, _selectedPage) }}
          onChangePage={(pg) => { setSelectedPage(pg); updateFilteredItems(items, _sortHeaders, _selectedRowsPerPage, pg) }}
          textRowsPerPage={textRowsPerPage}
          onEndBuildListaRPP={() => { updateFilteredItems(items, _sortHeaders, _selectedRowsPerPage, _selectedPage) }}
          fontClassHeader={fontClassHeader ?? fsHeader}
          fontClassCelda={fontClassCelda ?? fsCelda}
        />
      </div>

    </>
  )
}