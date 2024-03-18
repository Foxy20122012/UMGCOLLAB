import React from 'react';
import ModalBase from '@/components/templates/ModalBase';
import { Cursos } from '@/models/interface/Cursos';
import { useTranslations } from 'next-intl';

interface Props {
  selectedCurso: Cursos;
  onClose: () => void;
}

const ViewDetailsModal: React.FC<Props> = ({ selectedCurso, onClose }) => {
  const t = useTranslations('general');

  return (

<ModalBase onClose={onClose} title={t('details')} width={1200} className="bg-white rounded-lg shadow-xl">
  {selectedCurso && (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800">{selectedCurso.nombre}</h3>
        <p className="mt-1 text-sm text-gray-600">{selectedCurso.descripcion || t('noDescriptionAvailable')}</p>
      </div>

      <div className="border-t border-gray-200 pt-2">
        <h4 className="text-xl font-semibold text-gray-800">{t('topics')}</h4>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {selectedCurso.temas && selectedCurso.temas.length > 0 ? (
            selectedCurso.temas.map((tema) => (
              <div key={tema.id} className="bg-gray-100 p-3 rounded-lg shadow">
                {tema.nombre && tema.descripcion ? (
                  <div>
                    <strong className="text-md font-semibold">{tema.nombre}:</strong>
                    <p className="text-gray-700 text-sm">{tema.descripcion}</p>
                  </div>
                ) : (
                  <p>{t('noAssignedTopics')}</p> // Mensaje cuando el tema es null.
                )}
              </div>
            ))
          ) : (
            <p>{t('noRelatedTopics')}</p> // Mensaje cuando no hay temas.
          )}
        </div>
      </div>
    </div>
  )}
  <div className="flex flex-row gap-4 mt-4 justify-center pb-4">
    <button
      onClick={() => onClose()}
      className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
    >
      {t('close')}
    </button>
  </div>
</ModalBase>



  );
};

export default ViewDetailsModal;
