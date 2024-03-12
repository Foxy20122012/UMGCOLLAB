'use client'
import { createContext, useState, useRef, useEffect } from 'react';
import useHasMounted from '@/hooks/useHasMounted';
import APIService from '../services/umgService'; // Asegúrate de que la ruta de importación sea correcta

const defaultLanguage = 'es';
const languages = ['es', 'en'];
const contentLanguageMap = { es: 'es-GT', en: 'en-US' };

export const I18nContext = createContext();

const I18nProvider = ({ children, locale, dict = {} }) => {
  const activeLocaleRef = useRef(locale || defaultLanguage);
  const [, setTick] = useState(0);
  const firstRender = useRef(true);
  const [langIsLoaded, setLangIsLoaded] = useState(false);
  const hasMounted = useHasMounted();
  const [messages, setMessages] = useState({});
  const apiService = new APIService();

  const t = (key) => messages[key] || key;

// ... resto de tu código ...

const fetchi18n = async () => {
  try {
    const result = await apiService.apiService.callSP('SPR_I18N_S', [locale]);
    if (result.data[0] && Array.isArray(result.data[0])) {
      // Cambiamos la forma de construir el objeto de mensajes para no agrupar por ID_MENSAJE_PADRE
      const msgs = result.data[0].reduce((obj, elm) => {
        if (elm.LENGUAJE === locale) { // Filtramos por el idioma actual para no mezclar mensajes
          obj[elm.ID_MENSAJE] = elm.MENSAJE;
        }
        return obj;
      }, {});
      setMessages(msgs);
    } else {
      console.error('Formato de respuesta inesperado:', result);
    }
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
  }
};

// ... resto de tu código ...


  const setLanguage = async () => {
    if (hasMounted) {
      await fetchi18n();
    }
    setLangIsLoaded(true);
  };

  // for initial SSR render
  if (locale && firstRender.current === true) {
    firstRender.current = false;
    setLanguage();
  }

  // when locale is updated
  useEffect(() => {
    if (locale) {
      setLanguage();
    }
  }, [locale]);

  // when page is mounted
  useEffect(() => {
    if (hasMounted) {
      setLanguage();
    }
  }, [hasMounted]);

  return (
    <I18nContext.Provider value={{ t, langIsLoaded, activeLocale: activeLocaleRef.current }}>
      {children}
    </I18nContext.Provider>
  );
};

export default I18nProvider;
