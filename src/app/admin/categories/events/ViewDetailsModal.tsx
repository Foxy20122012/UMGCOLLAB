import React from 'react';
import ModalBase from '../../../../components/templates/ModalBase/index';
import { useTranslations } from 'next-intl';
import { EventsCategory } from '../../../../models/interface/categories/EventsCategory'; // Cambiar el modelo

interface Props {
    selectedEventsCategory: EventsCategory | null; // Puede ser null cuando no haya datos
    onClose: () => void;
}

const ViewDetailsModal: React.FC<Props> = ({ selectedEventsCategory, onClose }) => {
    const t = useTranslations('general');

    // Si selectedEventsCategory es null o indefinido, muestra un mensaje o retorna null
    if (!selectedEventsCategory) {
        return (
            <ModalBase onClose={onClose} title={t('details')} width={1200} className="bg-white rounded-lg shadow-xl">
                <div className="p-4">
                    <p>No se encontraron detalles para la categoría seleccionada.</p>
                </div>
            </ModalBase>
        );
    }

    return (
        <ModalBase onClose={onClose} title={t('details')} width={1200} className="bg-white rounded-lg shadow-xl">
            <div className="p-4">
                <h2 className="text-lg font-bold mb-4">Detalles de la Categoría de Evento</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-medium">ID Detalle:</p>
                        <p>{selectedEventsCategory.id_detalle}</p>
                    </div>
                    <div>
                        <p className="font-medium">Número de Categoría:</p>
                        <p>{selectedEventsCategory.numero_categoria}</p>
                    </div>
                    <div>
                        <p className="font-medium">Nombre de la Categoría:</p>
                        <p>{selectedEventsCategory.nombre_categoria}</p>
                    </div>
                    <div>
                        <p className="font-medium">Código de la Categoría:</p>
                        <p>{selectedEventsCategory.codigo_categoria}</p>
                    </div>
                    <div>
                        <p className="font-medium">Descripción:</p>
                        <p>{selectedEventsCategory.descripcion}</p>
                    </div>
                    <div>
                        <p className="font-medium">Alias:</p>
                        <p>{selectedEventsCategory.alias}</p>
                    </div>
                    <div>
                        <p className="font-medium">Estado:</p>
                        <p>{selectedEventsCategory.estado}</p>
                    </div>
                    <div>
                        <p className="font-medium">Fecha Creado:</p>
                        <p>{new Date(selectedEventsCategory.fecha_creado).toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="font-medium">Categoría General:</p>
                        <p>{selectedEventsCategory.categoria_general}</p>
                    </div>
                </div>
            </div>
        </ModalBase>
    );
};

export default ViewDetailsModal;
