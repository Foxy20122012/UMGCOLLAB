'use client'

import { createContext, useState, useEffect } from 'react';
import useHasMounted from '@/hooks/useHasMounted';
import APIService from '../services/umgService';
import useLoading from "@/hooks/useLoading"
import dynamic from 'next/dynamic'
import presets from "@/utils/globalPresets"

const LoadingSpinner = dynamic(() => { return import("vComponents/dist/Loading") }, { ssr: false })

const defaultLanguage = 'es';
export const I18nContext = createContext();

const I18nProvider = ({ children, locale = defaultLanguage }) => {
  const [langIsLoaded, setLangIsLoaded] = useState(false);
  const [messages, setMessages] = useState({});
  const hasMounted = useHasMounted();
  const apiService = new APIService();
  const loading = useLoading()

  // Función para traducir los identificadores a mensajes
  const t = (key) => messages[key] || key;

  // Función para cargar los mensajes de la API
  const fetchi18n = async () => {
    try {
      const result = await apiService.apiService.callSP('SPR_I18N_S', []);
      const newMessages = result.data?.reduce((acc, { LENGUAJE, ID_MENSAJE, MENSAJE }) => {
        if (LENGUAJE === locale) {
          acc[ID_MENSAJE] = MENSAJE;
        }
        return acc;
      }, {});

      setMessages(newMessages || {});
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
    }
  };

  // Cargar mensajes al montar y al cambiar el idioma
  useEffect(() => {
    if (hasMounted && locale) {
      fetchi18n().then(() => setLangIsLoaded(true));
    }
  }, [hasMounted, locale]);

  // Renderizar proveedor con el contexto actualizado
  return (
    <I18nContext.Provider value={{ t, langIsLoaded }}>
      {langIsLoaded ? children :  <LoadingSpinner loading={loading} image={presets.images.imageLoader} background={'backgroundLoader'} color={'colorLoader'} />}
    </I18nContext.Provider>
  );
};

export default I18nProvider;
