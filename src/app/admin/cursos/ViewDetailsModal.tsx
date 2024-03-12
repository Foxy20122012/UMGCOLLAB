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
    <ModalBase onClose={onClose} title={t('details')} width={1200}>
      {selectedCurso && (
        <div>
          <h3>{selectedCurso.Curso}</h3>
          <p>{selectedCurso.DescripcionCurso || t('noDescriptionAvailable')}</p>
          <h4>{t('topics')}</h4>
          <ul>
            {selectedCurso.Temas && selectedCurso.Temas.length > 0 ? (
              selectedCurso.Temas.map((tema) => (
                <li key={tema.id}>
                  {tema.nombre && tema.descripcion ? (
                    <>
                      <strong>{tema.nombre}:</strong> {tema.descripcion}
                    </>
                  ) : (
                    <p>{t('noAssignedTopics')}</p> // Mensaje cuando el tema es null.
                  )}
                </li>
              ))
            ) : (
              <p>{t('noRelatedTopics')}</p> // Mensaje cuando no hay temas.
            )}
          </ul>
        </div>
      )}
      <div className="flex flex-row gap-4 mt-4 justify-center">
        <button onClick={() => onClose()}>{t('close')}</button>
      </div>
    </ModalBase>
  );
};

export default ViewDetailsModal;
