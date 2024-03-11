'use client'
import React, { useEffect, useState, useMemo } from 'react';
import CursosService from '../services/umgService'; // Asegúrate de que la ruta de importación sea correcta
import DynamicTable from '@/components/organisms/DynamicTable'
import { useTranslations } from 'next-intl'
import Footer from "../components/footer/Footer"

const MyPage = () => {
  const [users, setUsers] = useState([]);
  const cursosService = new CursosService();
  const t = useTranslations('general')

  
  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      const result = await cursosService.cursosService.getCursos();
      if (result.data && Array.isArray(result.data)) {
        setCursos(result.data);
      } else {
        console.error('Formato de respuesta inesperado:', result);
      }
    } catch (error) {
      console.error('Error al obtener cursos:', error);
    }
  };
  
  const columns = [
    { key: 'id', name: t('ID') },
    { key: 'proceso_id', name: t('Proceso ID') },
    { key: 'numero_paso', name: t('Número de Paso') },
    { key: 'nombre_paso', name: t('Nombre del Paso') },
    { key: 'descripcion', name: t('Descripción') },
    { key: 'nombre_proceso', name: t('Nombre del Proceso') },
  ];

  const values = useMemo(() => {
    return users.map((user) => ({
      id: user.id,
      proceso_id: user.proceso_id,
      numero_paso: user.numero_paso,
      nombre_paso: user.nombre_paso,
      descripcion: user.descripcion,
      nombre_proceso: user.nombre_proceso
    }))
  }, [users]);

  return (
    <div className='m-10'>
     <div className='mt-20'>
      
     </div>
     

      {/* <DynamicTable
            columns={columns}
            values={values}
            hideSearchBar={true}
          /> */} 
        <Footer/>
    </div>
  );
};

export default MyPage;
