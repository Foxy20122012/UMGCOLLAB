import { useContext } from 'react'
import { I18nContext } from '../plugins/i18nContext'

const useI18n = () => {
  const i18n = useContext(I18nContext)
  return i18n
}

export default useI18n