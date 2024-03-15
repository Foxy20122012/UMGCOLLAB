'use client'

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import CursosService from '../../../services/umgService';
import { useTranslations } from 'next-intl';
import useI18n from '@/hooks/useI18n';
import { Cursos } from '@/models/interface/Cursos';
import presets from '@/utils/globalPresets';
import cursosHeaders from '@/models/cursos/encabezadoModel';
import { EyeIcon } from '@heroicons/react/24/solid';
import ViewDetailsModal from './ViewDetailsModal';
import DynamicForm from "@/components/general/DynamicForm/DynamicForm";
import DataTable from "@/components/general/DataTable/DataTable"
// import VDialog from "@/components/general/VDialog/VDialog";
import cursosProps from "@/models/cursos/cursosProp"


type Header = {
  text: string;
  value: string;
};

//@ts-ignore
// const DataTable = dynamic(() => import("vComponents/dist/DataTable"), {
//   ssr: false,
// });

//@ts-ignore
const VDialog = dynamic(() => {return import("vComponents/dist/VDialog");},
  { ssr: false }
);

const MyPage = () => {
  
  const t = useTranslations('general');
  const [cursosItems, setCursosItems] = useState<Cursos[]>([]);
  const [headers, setHeaders] = useState<Header[]>([]);
  const cursosService = new CursosService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState<Cursos | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [cursoCodigo, setCursoCodigo] = useState('');
  const [cursoNombre, setCursoNombre] = useState('');
  const [cursoDescripcion, setCursoDescripcion] = useState('');
  const [currentCurso, setCurrentCurso] = useState<Cursos | null>(null);

  const [cursoSemestre, setCursoSemestre] = useState<number | null>(null);
const [cursoCreditos, setCursoCreditos] = useState<number | null>(null);


const handleEdit = (curso: Cursos) => {
  setCurrentCurso(curso);
  setCursoCodigo(curso.codigo);
  setCursoNombre(curso.nombre);
  setCursoDescripcion(curso.descripcion);
  setCursoSemestre(curso.semestre);
  setCursoCreditos(curso.creditos);
  setIsFormVisible(true);
};

const handleUpdateCurso = async (id: number, curso: Partial<Cursos>) => {
  try {
      await cursosService.cursosService.updateCurso(id, curso);
      fetchCursos();
      setIsFormVisible(false);
  } catch (error) {
      console.error('Error al actualizar el curso:', error);
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (currentCurso && currentCurso.id) {
      const updatedCurso = {
          codigo: cursoCodigo,
          nombre: cursoNombre,
          descripcion: cursoDescripcion,
          semestre: cursoSemestre,
          creditos: cursoCreditos,
      };
      await handleUpdateCurso(currentCurso.id, updatedCurso);
      setIsFormVisible(false);  // Cierra el modal
      fetchCursos();            // Recarga la data
  } else {
      console.error('Error: No se ha seleccionado ningún curso para actualizar');
  }
};





  

  useEffect(() => {
    fetchCursos();
    setHeaders(cursosHeaders() as any);
  }, []);



  const values = useMemo(() => cursosItems, [cursosItems]); // Si ya tiene la forma correcta, no necesitas mapear

  const fetchCursos = async () => {
    try {
      const result = await cursosService.cursosService.getCursos();
      if (result && Array.isArray(result)) {
        setCursosItems(result);
      } else {
        console.error('Formato de respuesta inesperado:', result);
      }
    } catch (error) {
      console.error('Error al obtener cursos:', error);
    }
  };


  




  
  

const handleDeleteCurso = async (curso: Cursos) => {
  try {
    await cursosService.cursosService.deleteCurso(curso.id);
    // Actualizar la lista de cursos después de la eliminación exitosa
    fetchCursos();
  } catch (error) {
    console.error('Error al eliminar el curso:', error);
  }
};


  const handleNewClick = () => {
    setIsFormVisible(true);
  };




  return (
    <div>
      <DataTable
      //@ts-ignore
        headers={headers}
        items={values}
        presets={presets}
        onNewItem={handleNewClick}
        // onEditItem={handleEdit} 
        onEditItem={handleEdit}
    onDeleteItem={(id) => handleDeleteCurso(id)}
        // showNewButton={false}
        showEditButton={true}
        showDeleteButton={true}
        // onSearch={true}
        PrependActionButtons={(item: any) => (
          <button
            className=""
            onClick={() => {
              setSelectedCurso(item);
              setIsModalOpen(true);
            }}
          >
            <EyeIcon className="h-5 w-5 mr-2 text-blue-800" />
          </button>
        )}
      />

{isModalOpen && selectedCurso && (
  <ViewDetailsModal
    selectedCurso={selectedCurso}
    onClose={() => setIsModalOpen(false)}
  />
)}

{isFormVisible && isFormVisible === true && 

      <VDialog
      isOpen={isFormVisible}
      size='sm'
      className='-translate-x-1/2 bg-black bg-opacity-25'
      >

<form onSubmit={handleSubmit} className="p-4">
                        <div className="mb-4">
                            <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código</label>
                            <input
                                type="text"
                                id="codigo"
                                value={cursoCodigo}
                                onChange={(e) => setCursoCodigo(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                value={cursoNombre}
                                onChange={(e) => setCursoNombre(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                            <textarea
                                id="descripcion"
                                value={cursoDescripcion}
                                onChange={(e) => setCursoDescripcion(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="semestre" className="block text-sm font-medium text-gray-700">Semestre</label>
                            <input
                                type="number"
                                id="semestre"
                                value={cursoSemestre || ''}
                                onChange={(e) => setCursoSemestre(parseInt(e.target.value) || null)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="creditos" className="block text-sm font-medium text-gray-700">Créditos</label>
                            <input
                                type="number"
                                id="creditos"
                                value={cursoCreditos || ''}
                                onChange={(e) => setCursoCreditos(parseInt(e.target.value) || null)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Actualizar
                            </button>
                        </div>
                    </form>

            <div className="flex justify-end mt-4">
    <button
      onClick={() => setIsFormVisible(false)} // Cierra el modal o dialogo
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Cancelar
    </button>
  </div>
      </VDialog>
      }


    </div>
  );
};

export default MyPage;
