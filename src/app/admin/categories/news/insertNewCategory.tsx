import React, { useState } from 'react';
import ModalBase from '../../../../components/templates/ModalBase/index';
import { useTranslations } from 'next-intl';
import { NewsCategory } from '@/models/interface/categories/Newscategory';
import NewsCategoryService  from '../../../../services/umgService/collabAdmin/categories/newsCategoryService';
import { notification } from 'antd';

interface Props {
    onClose: () => void;
    fetchNewsCategory: () => void;
}

const InsertNewsCategoryModal: React.FC<Props> = ({ onClose, fetchNewsCategory }) => {
    const t = useTranslations('general');
    const [descripcion, setDescripcion] = useState('');
    const [alias, setAlias] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const newsCategoryService  = new NewsCategoryService ();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); // Bloquea el botón para evitar múltiples clics.
    
        try {
            const newCategory = { descripcion, alias };
    
            // Inserta la nueva categoría
            const response = await newsCategoryService.createNewsCategory(newCategory);
    
            // Validamos que `response` exista y contenga los datos correctos
            if (response && response.data && response.status === 201) {
                notification.success({
                    message: 'Categoría creada',
                    description: 'La categoría ha sido creada exitosamente',
                });
    
                // Refresca la tabla de categorías
                fetchNewsCategory();
    
                // Cierra el modal
                onClose();
            } else {
                // Si la respuesta no es exitosa, lanza un error
                throw new Error('Error en la creación de la categoría');
            }
        } catch (error) {
            // Captura y maneja cualquier error
            console.error('Error al crear categoría:', error);
            notification.error({
                message: 'Error al crear categoría',
                description: 'Ocurrió un error al intentar crear la categoría. Inténtalo de nuevo.',
            });
        } finally {
            setIsLoading(false); // Desbloquea el botón tras la finalización
        }
    };
    

    return (
        <ModalBase onClose={onClose} title={t('details')} width={800} className="bg-white rounded-lg shadow-xl">
            <form onSubmit={handleSubmit} className="p-4">
                <div className="mb-4">
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                        Descripción
                    </label>
                    <input
                        id="descripcion"
                        type="text"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-opacity-50"
                        placeholder="Ingresa la descripción de la categoría"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="alias" className="block text-sm font-medium text-gray-700">
                        Alias
                    </label>
                    <input
                        id="alias"
                        type="text"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-opacity-50"
                        placeholder="Ingresa el alias de la categoría"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring focus:ring-opacity-50 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </ModalBase>
    );
};

export default InsertNewsCategoryModal;
