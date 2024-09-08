import React from 'react';
import ModalBase from '../../../components/templates/ModalBase/index';
import { useTranslations } from 'next-intl';

interface Props {
  selectedTopic: any;
  onClose: () => void;
}

const ViewDetailsModal: React.FC<Props> = ({ selectedTopic, onClose }) => {
  const t = useTranslations('general');

  if (!selectedTopic) return null;

  const { nombre, descripcion, curso, catedraticos } = selectedTopic;

  return (
    <ModalBase onClose={onClose} title={t('details')} width={1200} className="bg-white rounded-lg shadow-xl">
      <div className="p-4">
        {/* Información del tema */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{nombre}</h2>
          <p className="mt-1 text-lg text-gray-600">{descripcion || t('noDescriptionAvailable')}</p>
        </div>

        {/* Información del curso */}
        <div className="border-t border-gray-200 pt-2 mb-4">
          <h4 className="text-xl font-semibold text-gray-800">{t('course')}</h4>
          <div className="bg-gray-100 p-3 rounded-lg shadow mt-2">
            {curso ? (
              <>
                <p><strong>{t('name')}:</strong> {curso.nombre}</p>
                <p><strong>{t('code')}:</strong> {curso.codigo}</p>
                <p><strong>{t('description')}:</strong> {curso.descripcion}</p>
                <p><strong>{t('year')}:</strong> {curso.año || t('notSpecified')}</p>
              </>
            ) : (
              <p>{t('noCourseAssigned')}</p>
            )}
          </div>
        </div>

        {/* Información de los catedráticos */}
        <div className="border-t border-gray-200 pt-2 mb-4">
          <h4 className="text-xl font-semibold text-gray-800">{t('lecturers')}</h4>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {catedraticos && catedraticos.length > 0 ? (
              catedraticos.map((catedratico:any) => (
                <div key={catedratico.id} className="bg-gray-100 p-3 rounded-lg shadow">
                  <p><strong>{t('name')}:</strong> {catedratico.nombre}</p>
                  <p><strong>{t('title')}:</strong> {catedratico.titulo}</p>
                  <p><strong>{t('email')}:</strong> {catedratico.email}</p>
                </div>
              ))
            ) : (
              <p>{t('noLecturersAssigned')}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Botón para cerrar */}
      <div className="flex flex-row gap-4 mt-4 justify-center pb-4">
        <button
          onClick={() => onClose()}
          className="px-4 py-2 text-white bg-sky-800 rounded-full hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-700 transition duration-150 ease-in-out"
        >
          {t('close')}
        </button>
      </div>
    </ModalBase>
  );
};

export default ViewDetailsModal;
