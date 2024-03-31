'use client'

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import CursosService from '../../../services/umgService';
import { useTranslations } from 'next-intl';
import useI18n from '@/hooks/useI18n';
import { Cursos } from '@/models/interface/Cursos';
import presets from '@/utils/globalPresets';
import cursosModel from '@/models/cursos/CursosModel';
import { EyeIcon } from '@heroicons/react/24/solid';
import { SiMicrosoftexcel } from "react-icons/si";
import ViewDetailsModal from './ViewDetailsModal';
import InsertCoursersModal from "./InsertCousersModal"
import DynamicForm from "@/components/general/DynamicForm/DynamicForm";
import DataTable from "@/components/general/DataTable/DataTable"

type Header = {
  text: string;
  value: string;
};

const VDialog = dynamic(() => { return import("@/components/general/VDialog/VDialog"); },
  { ssr: false }
);


const MyPage = () => {

  const t = useTranslations('general');
  const [cursosItems, setCursosItems] = useState<Cursos[]>([]);
  const [headers, setHeaders] = useState<Header[]>([]);
  const cursosService = new CursosService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen]= useState(false);
  const [selectedCurso, setSelectedCurso] = useState<Cursos | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [cursoNombre, setCursoNombre] = useState('');
  const [cursoDescripcion, setCursoDescripcion] = useState('');
  const [currentCurso, setCurrentCurso] = useState<Cursos | null>(null);

  const handleEdit = (curso: Cursos) => {
    setCurrentCurso(curso);
    setCursoNombre(curso.nombre);
    setCursoDescripcion(curso.descripcion);
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
        nombre: cursoNombre,
        descripcion: cursoDescripcion,
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
    setHeaders(cursosModel() as any);
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

  const handleDownloadExcelID = async (id: number) => {
    try {
      const blob = await cursosService.cursosService.getCursoExcelId(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `curso_${id}.xlsx`; // Nombre del archivo con el ID del curso
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el archivo Excel:', error);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const blob = await cursosService.cursosService.getCursoExcel();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cursos.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al descargar el archivo Excel:', error);
    }
  };

  const handleDeleteCurso = async (curso: Cursos) => {
    try {
      await cursosService.cursosService.deleteCurso(curso.id);
      fetchCursos();
    } catch (error) {
      console.error('Error al eliminar el curso:', error);
    }
  };

  const handleNewClick = () => {
    setIsOpen(true);
  };

  return (
    <div>
      {t("Courses")}
      <div className='flex justify-end my-2'>
        <button onClick={handleDownloadExcel} className=''><SiMicrosoftexcel  className='text-2xl text-green-700'/></button>
      </div>
      <DataTable
        //@ts-ignore
        headers={headers}
        items={values}
        //@ts-ignore
        presets={presets}
        onNewItem={handleNewClick}
        onEditItem={handleEdit}
        onDeleteItem={handleDeleteCurso}
        showEditButton={true}
        showDeleteButton={true}
        PrependActionButtons={(item: any) => (
          <div className='flex justify-center'>
            <button
              className=""
              onClick={() => {
                setSelectedCurso(item);
                setIsModalOpen(true);
              }}
            >
              <EyeIcon className="h-5 w-5 mr-2 text-blue-800" />
            </button>
            <button
              className=""
              onClick={() => handleDownloadExcelID(item.id)}
            >
              <SiMicrosoftexcel className='text-green-700' />
            </button>
          </div>

        )}
      />

      {isModalOpen && selectedCurso && ( 
        <ViewDetailsModal
          selectedCurso={selectedCurso}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isOpen && (
        <InsertCoursersModal
          fetchCursos={fetchCursos}
          onClose={() => setIsOpen(false)}
        />
      )}

      {isFormVisible && isFormVisible === true &&(
        //@ts-ignore
        <VDialog
          isOpen={isFormVisible}
          size='sm'
        >
          <form onSubmit={handleSubmit} className="p-4">
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
              onClick={() => setIsFormVisible(false)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </VDialog>
      )}
    </div>
  );
};

export default MyPage;
