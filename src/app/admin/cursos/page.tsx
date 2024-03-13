'use client'

import React, { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import CursosService from '../../../services/umgService';
import APIService from '../../../services/umgService'; 
import { useTranslations } from 'next-intl';
import useI18n from '@/hooks/useI18n';
import { Cursos } from '@/models/interface/Cursos';
import presets from '@/utils/globalPresets';
import cursosHeaders from '@/models/cursos/encabezadoModel';
import { EyeIcon } from '@heroicons/react/24/solid';
import ViewDetailsModal from './ViewDetailsModal';
import DynamicForm from "@/components/general/DynamicForm/DynamicForm";
// import VDialog from "@/components/general/VDialog/VDialog";
import cursosProps from "@/models/cursos/cursosProp"





type Header = {
  text: string;
  value: string;
};

// //@ts-ignore
// const DataTable = dynamic(() => import('componentslibrary/dist/DataTable'), {
//   ssr: false,
// });

//@ts-ignore
const DataTable = dynamic(() => import("vComponents/dist/DataTable"), {
  ssr: false,
});

//@ts-ignore
const VDialog = dynamic(() => {return import("vComponents/dist/VDialog");},
  { ssr: false }
);

const MyPage = () => {
  const i18n = useI18n();
  const t = useTranslations('general');
  const [cursosItems, setCursosItems] = useState<Cursos[]>([]);
  const [headers, setHeaders] = useState<Header[]>([]);
  const cursosService = new CursosService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState<Cursos | null>(null);
  const apiService = new APIService();
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [formMode, setFormMode] = useState('insert');
  const [isEditMode, setIsEditMode] = useState(false);
const [currentCurso, setCurrentCurso] = useState(null);


  useEffect(() => {
    fetchCursos();
    setHeaders(cursosHeaders() as any);
  }, []);

  useEffect(() => {
    if (selectedCurso && isEditMode) {
      setCodigo(selectedCurso.codigo);
      setNombre(selectedCurso.Curso);
      setDescripcion(selectedCurso.DescripcionCurso);
    }
  }, [selectedCurso, isEditMode]);
  

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

  const handleNewClick = () => {
    // Resetear el formulario a los valores predeterminados para la creación
    setCurrentCurso({
      codigo: '',
      nombre: '',
      descripcion: ''
    });
    setIsEditMode(false);
    setIsFormVisible(true);
  };


  const handleEdit = (curso: Cursos) => {
    // Usa spread para crear un nuevo objeto con los datos del curso seleccionado
    setCurrentCurso({
      codigo: curso.codigo,
      nombre: curso.Curso,
      descripcion: curso.DescripcionCurso
    });
    setIsEditMode(true);
    setIsFormVisible(true);
  };

// Esta función debería recibir los valores del formulario, no los valores de los estados individuales.
const handleSubmit = async () => {
  try {
    let result;
    if (isEditMode) {
      // Asegúrate de que currentCurso tenga el id correcto. Deberías confirmar cómo estás pasando el id.
      result = await apiService.apiService.callSPUpdate('SPR_CURSOS_U', [currentCurso.id, codigo, nombre, descripcion]);
    } else {
      result = await apiService.apiService.callSPInsert('SPR_CURSOS_I', [codigo, nombre, descripcion]);
    }
    console.log('Operación exitosa:', result);
    console.log("error", error)
    // Cerrar el diálogo y restablecer el estado del formulario
    setIsFormVisible(false);
    setIsEditMode(false);
    setCurrentCurso(null);
    // Limpieza de los campos del formulario
    setCodigo('');
    setNombre('');
    setDescripcion('');
    // Recargar la lista de cursos
    fetchCursos();
  } catch (error) {
    console.error('Error al realizar la operación:', error);
  }
};

// No olvides eliminar el parámetro `formData` del método `handleSubmit` y asegúrate de que el DynamicForm esté pasando correctamente los valores actuales de los estados del formulario.


  


  return (
    <div>
      <DataTable
      //@ts-ignore
        headers={headers}
        items={values}
        presets={presets}
        i18n={i18n}
        onNewItem={handleNewClick}
        onEditItem={handleEdit} 
        // showNewButton={false}
        showEditButton={true}
        showDeleteButton={true}
        onSearch={true}
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
<DynamicForm
  formProps={cursosProps}
  onSubmit={handleSubmit}
  showCreateButton={!isEditMode} // Muestra este botón solo si NO es modo de edición
  showUpdateButton={isEditMode} // Muestra este botón solo si es modo de edición
  initialFormData={isEditMode ? currentCurso : {}}
  // Añade una key para forzar el reinicio del componente cuando cambia el curso seleccionado
  key={isEditMode ? currentCurso.codigo : 'new'}
  // Resto de tus props...
/>
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

<div>
<div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="codigo">Código:</label>
        <input
          type="text"
          id="codigo"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          required
        />

        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <button type="submit">Insertar Curso</button>
      </form>
    </div>
</div>
    </div>
  );
};

export default MyPage;
