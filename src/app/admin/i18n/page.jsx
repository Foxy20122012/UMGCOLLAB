'use client'
import React, { useEffect, useState, useMemo, useRef } from 'react';
import APIService from '../../../services/umgService'; // Asegúrate de que la ruta de importación sea correcta
import { useTranslations } from 'next-intl'



const MyPage = () => {

  const apiService = new APIService();
  const t = useTranslations('general')

  
  useEffect(() => {
    fetchCursos();
  }, []);

  const [cursos, setCursos] = useState([]); // Asegúrate de tener este estado definido

  const fetchCursos = async () => {
    try {
      const result = await apiService.apiService.callSP("SPR_I18N_S", []);
      if (result.data[0] && Array.isArray(result.data[0])) {
        setCursos(result.data[0]);
      } else {
        console.error('Formato de respuesta inesperado:', result);
      }
    } catch (error) {
      console.error('Error al obtener cursos:', error);
    }
  };
  
  



  return (
    <div className='text-center font-bold text-xl'>

  
     

 i18n

        
    </div>
  );
};

export default MyPage;
