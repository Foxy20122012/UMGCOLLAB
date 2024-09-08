import React, { useState, useEffect } from 'react';
import ModalBase from '../../../components/templates/ModalBase/index';
import { useTranslations } from 'next-intl';
import TemaService from '../../../services/umgService/collabAdmin/topics/topicsService';
import CursoService from '../../../services/umgService/collabAdmin/cursoService';
import { CiCircleCheck } from "react-icons/ci";
import { Cursos } from '@/models/interface/Cursos';

interface Props {
  onClose: () => void;
  fetchTemas: () => void; // Función para actualizar la lista de temas después de insertar uno nuevo
}

const InsertTopicsModal: React.FC<Props> = ({ onClose, fetchTemas }) => {
  const t = useTranslations('general');
  const [temaNombre, setTemaNombre] = useState('');
  const [temaDescripcion, setTemaDescripcion] = useState('');
  const [cursos, setCursos] = useState<Cursos[]>([]);
  const [selectedCurso, setSelectedCurso] = useState<string>(''); // Ahora es un string que guarda el nombre del curso
  const temaService = new TemaService();
  const cursoService = new CursoService();

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const result = await cursoService.getCursos();
        if (result && Array.isArray(result.data)) {
          setCursos(result.data);
        } else {
          console.error('Error al obtener cursos:', result);
        }
      } catch (error) {
        console.error('Error al obtener cursos:', error);
      }
    };

    fetchCursos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Enviar los datos al backend, incluyendo el nombre del curso
      await temaService.createTema({
        nombre: temaNombre,
        descripcion: temaDescripcion,
        nombre_curso: selectedCurso, // Enviar el nombre del curso
      });

      fetchTemas(); // Actualizar la lista de temas
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error al crear tema:', error);
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
            value={temaNombre}
            onChange={(e) => {
              const inputValue = e.target.value;
              const regex = /^[A-Za-z\s]*$/; // Expresión regular que permite letras y espacios
              if (regex.test(inputValue) || inputValue === "") {
                setTemaNombre(inputValue);
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
            value={temaDescripcion}
            onChange={(e) => setTemaDescripcion(e.target.value)}
            required={true}
            minLength={5}
            maxLength={240}
            className="border rounded-md w-full py-2 px-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:shadow-outline shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="curso" className="block text-gray-700 text-base font-semibold mb-2">
            {t("select_course")}<span className='text-red-600'>(*)</span>
          </label>
          <select
            id="curso"
            value={selectedCurso}
            onChange={(e) => setSelectedCurso(e.target.value)}
            required={true}
            className="border rounded-md w-full py-2 px-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:shadow-outline shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccione un curso</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.nombre}>
                {curso.nombre}
              </option>
            ))}
          </select>
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

export default InsertTopicsModal;
