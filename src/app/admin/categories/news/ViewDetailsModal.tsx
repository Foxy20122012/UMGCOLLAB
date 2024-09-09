import React from 'react';
import ModalBase from '../../../../components/templates/ModalBase/index';
import { useTranslations } from 'next-intl';
import { NewsCategory } from '@/models/interface/categories/Newscategory';

interface Props {
    selectedNewsCategory: NewsCategory | null; // Puede ser null cuando no haya datos
    onClose: () => void;
}

const ViewDetailsModal: React.FC<Props> = ({ selectedNewsCategory, onClose }) => {
    const t = useTranslations('general');

    // Si selectedPostCategory es null o indefinido, muestra un mensaje o retorna null
    if (!selectedNewsCategory) {
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
                <h2 className="text-lg font-bold mb-4">Detalles de la Categoría</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-medium">ID Detalle:</p>
                        <p>{selectedNewsCategory.id_detalle}</p>
                    </div>
                    <div>
                        <p className="font-medium">Número de Categoría:</p>
                        <p>{selectedNewsCategory.numero_categoria}</p>
                    </div>
                    <div>
                        <p className="font-medium">Nombre de la Categoría:</p>
                        <p>{selectedNewsCategory.nombre_categoria}</p>
                    </div>
                    <div>
                        <p className="font-medium">Código de la Categoría:</p>
                        <p>{selectedNewsCategory.codigo_categoria}</p>
                    </div>
                    <div>
                        <p className="font-medium">Descripción:</p>
                        <p>{selectedNewsCategory.descripcion}</p>
                    </div>
                    <div>
                        <p className="font-medium">Alias:</p>
                        <p>{selectedNewsCategory.alias}</p>
                    </div>
                    <div>
                        <p className="font-medium">Estado:</p>
                        <p>{selectedNewsCategory.estado}</p>
                    </div>
                    <div>
                        <p className="font-medium">Nombre del Usuario Creador:</p>
                        <p>{selectedNewsCategory.nombre_usuario_creador}</p>
                    </div>
                    <div>
                        <p className="font-medium">Nombre del Usuario Actualizador:</p>
                        <p>{selectedNewsCategory.nombre_usuario_actualizador || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="font-medium">Fecha Creado:</p>
                        <p>{new Date(selectedNewsCategory.fecha_creado).toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="font-medium">Categoría General:</p>
                        <p>{selectedNewsCategory.categoria_general}</p>
                    </div>
                </div>
            </div>
        </ModalBase>
    );
};

export default ViewDetailsModal;
