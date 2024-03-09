interface JsonData {
  general: { [key: string]: string }
}

import jsonData from '@/localization/es.json'

export const useTranslations = (val?: string) => {
  return t
}

export const createMiddleware = () => {}

export const useLocale = () => {
  return 'es'
}

export function NextIntlClientProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode
  locale?: any
  messages?: any
}) {
  return <>{children}</>
}

const t = (key: string) => {
  // Use a type assertion to inform TypeScript about the type of jsonData.general
  return (jsonData.general as JsonData['general'])[key] || `-${key}-`
}
