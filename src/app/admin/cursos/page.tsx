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




type Header = {
  text: string;
  value: string;
};

//@ts-ignore
const DataTable = dynamic(() => import('componentslibrary/dist/DataTable'), {
  ssr: false,
});




const MyPage = () => {
  const i18n = useI18n();
  const [cursosItems, setCursosItems] = useState<Cursos[]>([]);
  const [headers, setHeaders] = useState<Header[]>([]);
  const cursosService = new CursosService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState<Cursos | null>(null);

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



  return (
    <div>
      <DataTable
      //@ts-ignore
        headers={headers}
        items={values}
        presets={presets}
        i18n={i18n}
        showNewButton={false}
        showEditButton={false}
        showDeleteButton={false}
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

    </div>
  );
};

export default MyPage;
