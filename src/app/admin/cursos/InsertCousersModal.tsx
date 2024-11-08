import React, { useState } from 'react';
import ModalBase from '../../../components/templates/ModalBase/index';
import { useTranslations } from 'next-intl';
import CursosService from '../../../services/umgService';
import { CiCircleCheck } from "react-icons/ci";

import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


interface Props {
  onClose: () => void;
  fetchCursos: () => void; // Función para actualizar la lista de cursos después de insertar uno nuevo
}

const InsertCoursersModal: React.FC<Props> = ({ onClose, fetchCursos }) => {
  const t = useTranslations('general');
  const [cursoNombre, setCursoNombre] = useState('');
  const [cursoDescripcion, setCursoDescripcion] = useState('');
  const cursosService = new CursosService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCurso = {
        nombre: cursoNombre,
        descripcion: cursoDescripcion,
      };
      await cursosService.cursosService.createCurso(newCurso);
      fetchCursos(); // Actualiza la lista de cursos
      onClose();     // Cierra el modal
   //   toast.success('Curso agregado con éxito'); // Muestra el toast
    } catch (error) {
      console.error('Error al crear el curso:', error);
    //  toast.error('Error al crear el curso');
    }
  };

  return (
    <ModalBase onClose={onClose} title={t('details')} width={800} className="bg-white rounded-lg shadow-xl">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 text-base font-semibold mb-2">
            {t("name")}<span className='text-red-600'>(*)</span>
          </label>
          <input
  type="text"
  id="nombre"
  value={cursoNombre}
  onChange={(e) => {
    const inputValue = e.target.value;
    const regex = /^[A-Za-z\s]*$/; // Expresión regular que permite letras y espacios
    if (regex.test(inputValue) || inputValue === "") {
      setCursoNombre(inputValue);
    }
  }}
  required={true}
  minLength={5}
  maxLength={20}
  className="border rounded-md w-full py-2 px-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:shadow-outline shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
/>


        </div>
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-gray-700 text-base font-semibold mb-2">
            {t("description")}<span className='text-red-600'>(*)</span>
          </label>
          <textarea
            id="descripcion"
            value={cursoDescripcion}
            onChange={(e) => setCursoDescripcion(e.target.value)}
            
            required={true}
            minLength={5}
            maxLength={240}
            className="border rounded-md w-full py-2 px-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:shadow-outline shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mr-2"
          >
            {t('create')}<CiCircleCheck className="inline ml-2 text-xl font-extrabold" />
          </button>
        </div>
      </form>

      <div className="flex flex-row gap-4 mt-4 justify-center pb-4">
        <button
          onClick={() => onClose()}
          className="px-2 py-2 text-white bg-sky-800 rounded-full hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-700 transition duration-150 ease-in-out"
        >
          {t('close')}
        </button>
      </div>
    </ModalBase>
  );
};

export default InsertCoursersModal;

