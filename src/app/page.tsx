'use client'
import React, { useEffect, useState, useMemo, useRef } from 'react';
import dynamic from "next/dynamic";
import CursosService from '../services/umgService'; // Asegúrate de que la ruta de importación sea correcta
import DynamicTable from '@/components/organisms/DynamicTable'
import { useTranslations } from 'next-intl'
import Footer from "../components/footer/Footer"
import {
  Cursos
} from '@/models/interface/Cursos'
import presets from "@/utils/globalPresets";
// import DataTable from 'componentslibrary/dist/DataTable';


const DataTable = dynamic(() => import("componentslibrary/dist/DataTable"), {
  ssr: false,
});

const MyPage = () => {
  const [users, setUsers] = useState([]);
  const [cursosItems, setCursosItems] = useState<Cursos[]>([])
  const cursosService = new CursosService();
  const t = useTranslations('general')

  
  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    try {
      const result = await cursosService.cursosService.getCursos();
      if (result && Array.isArray(result)) {
        setCursosItems(result); // Cambiado de setCursos a setCursosItems
      } else {
        console.error('Formato de respuesta inesperado:', result);
      }
    } catch (error) {
      console.error('Error al obtener cursos:', error);
    }
  };
  
  
  const columns = [
    { key: 'CursoId', name: t('CursoId') },
    { key: 'Curso', name: t('Curso') },
    { key: 'DescripcionCurso', name: t('DescripcionCurso') },
    { key: 'Semestre', name: t('Semestre') },
    { key: 'Creditos', name: t('Creditos') },
    // { key: 'TemaNombre', name: t('TemaNombre') }, // Cambia 'nombre' por 'TemaNombre' para que coincida con la clave en 'values'
  ];
  
  const values = useMemo(() => {
    return cursosItems.map((curso) => ({
      CursoId: curso.CursoId,
      Curso: curso.Curso,
      DescripcionCurso: curso.DescripcionCurso,
      Semestre: curso.Semestre,
      Creditos: curso.Creditos,
      // TemaNombre: curso.Temas?.[0]?.nombre // Asegúrate de que 'Temas' existe y tiene al menos un elemento
    }));
  }, [cursosItems]);
  

  return (
    <div>
            <DataTable
        className= "flex items-center"
        headers={columns}
        items={users}
        presets={presets}
        // onNewItem={() => setIsFormVisible(true)} // Abrir formulario al hacer clic en "Nuevo"
        // onEditItem={(item) => {
        //   setSelectedUser(item);
        //   setFormData({ nombre: item.nombre, email: item.email });
        //   setIsFormVisible(true);
        // }} // Abrir formulario con datos al hacer clic en "Editar"
        onDeleteItem="" // Iniciar el proceso de eliminación al hacer clic en "Eliminar"
      />
     <div className=''>
           {/* <DynamicTable
            columns={columns}
            values={values}
            hideSearchBar={true}
          />  */}
     </div>
     

 
          {/* <div className=''>
            <Footer/>
          </div> */}
        
    </div>
  );
};

export default MyPage;
