import React, { useState } from 'react';
import ModalBase from '../../../../components/templates/ModalBase/index';
import { useTranslations } from 'next-intl';
import { LeftOutlined, RightOutlined, FileOutlined } from '@ant-design/icons';

interface Props {
    selectedPost: any | null;
    onClose: () => void;
}

const ViewDetailsModal: React.FC<Props> = ({ selectedPost, onClose }) => {
    const t = useTranslations('general');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentDocIndex, setCurrentDocIndex] = useState(0);

    if (!selectedPost) {
        return (
            <ModalBase onClose={onClose} title={t('details')} width={1200} className="bg-white rounded-lg shadow-xl">
                <div className="p-4">
                    <p>No se encontraron detalles para el post seleccionado.</p>
                </div>
            </ModalBase>
        );
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % selectedPost.imagenes.length
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + selectedPost.imagenes.length) % selectedPost.imagenes.length
        );
    };

    const handleNextDoc = () => {
        setCurrentDocIndex((prevIndex) =>
            (prevIndex + 1) % selectedPost.archivos_adjuntos.length
        );
    };

    const handlePrevDoc = () => {
        setCurrentDocIndex((prevIndex) =>
            (prevIndex - 1 + selectedPost.archivos_adjuntos.length) % selectedPost.archivos_adjuntos.length
        );
    };

    return (
        <ModalBase onClose={onClose} title={t('details')} width={1200} className="bg-white rounded-lg shadow-xl">
            <div className="p-4">
                <h2 className="text-lg font-bold mb-4">Detalles del Post</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-medium">ID:</p>
                        <p>{selectedPost.id}</p>
                    </div>
                    <div>
                        <p className="font-medium">Título:</p>
                        <p>{selectedPost.titulo}</p>
                    </div>
                    <div>
                        <p className="font-medium">Contenido:</p>
                        <p>{selectedPost.contenido}</p>
                    </div>
                    <div>
                        <p className="font-medium">Estado:</p>
                        <p>{selectedPost.estado}</p>
                    </div>
                    {/* Otros campos adicionales aquí */}
                </div>

                <div className="mt-4">
                    <h3 className="font-medium">Imágenes:</h3>
                    {selectedPost.imagenes?.length > 0 ? (
                        <div className="flex items-center justify-center mt-2 relative">
                            <button onClick={handlePrevImage} className="absolute left-0 z-10">
                                <LeftOutlined />
                            </button>
                            <div className="flex justify-center items-center w-full h-64 overflow-hidden">
                                <img
                                    src={selectedPost.imagenes[currentImageIndex].url}
                                    alt={`Imagen ${currentImageIndex + 1}`}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <button onClick={handleNextImage} className="absolute right-0 z-10">
                                <RightOutlined />
                            </button>
                        </div>
                    ) : (
                        <p>No hay imágenes disponibles.</p>
                    )}
                </div>

                <div className="mt-6">
                    <h3 className="font-medium">Documentos:</h3>
                    {selectedPost.archivos_adjuntos?.length > 0 ? (
                        <div className="flex items-center justify-center mt-2">
                            <button onClick={handlePrevDoc}>
                                <LeftOutlined />
                            </button>
                            <a
                                href={selectedPost.archivos_adjuntos[currentDocIndex].url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-4 flex items-center text-blue-600 underline"
                            >
                                <FileOutlined className="mr-2" />
                                Documento {currentDocIndex + 1}
                            </a>
                            <button onClick={handleNextDoc}>
                                <RightOutlined />
                            </button>
                        </div>
                    ) : (
                        <p>No hay documentos disponibles.</p>
                    )}
                </div>
            </div>
        </ModalBase>
    );
};

export default ViewDetailsModal;
