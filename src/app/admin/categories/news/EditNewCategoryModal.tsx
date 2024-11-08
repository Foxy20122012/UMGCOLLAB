import React, { useState, useEffect } from 'react';
import ModalBase from '../../../../components/templates/ModalBase/index';
import { useTranslations } from 'next-intl';
import { NewsCategory } from '@/models/interface/categories/Newscategory';
import NewsCategoryService from '../../../../services/umgService/collabAdmin/categories/newsCategoryService';
import { notification } from 'antd';

interface Props {
    onClose: () => void;
    fetchNewsCategory: () => void;
    currentCategory: NewsCategory | null; // El objeto de categoría actual para editar
}

const EditNewsCategoryModal: React.FC<Props> = ({ onClose, fetchNewsCategory, currentCategory }) => {
    const t = useTranslations('general');
    const [descripcion, setDescripcion] = useState('');
    const [alias, setAlias] = useState('');
    const [estado, setEstado] = useState(''); // Agregar el estado
    const [isLoading, setIsLoading] = useState(false);
    const newsCategoryService = new NewsCategoryService();

    // Actualiza los campos cuando se recibe un nuevo currentCategory
    useEffect(() => {
        if (currentCategory) {
            setDescripcion(currentCategory.descripcion || '');  // Mantén el valor actual o vacío si no existe
            setAlias(currentCategory.alias || '');              // Mantén el valor actual o vacío si no existe
            setEstado(currentCategory.estado || 'activo');      // Mantén el estado actual, por defecto 'activo'
        }
    }, [currentCategory]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Creamos un objeto vacío que contendrá solo los campos que han cambiado
            const updatedCategory = {
                descripcion: descripcion || currentCategory?.descripcion,
                alias: alias || currentCategory?.alias,
                estado: estado || currentCategory?.estado,
            };

            // Realiza la actualización solo con los campos modificados
            await newsCategoryService.updateNewsCategory(currentCategory?.id_detalle, updatedCategory);
            notification.success({
                message: 'Categoría actualizada',
                description: 'La categoría ha sido actualizada exitosamente',
            });

            fetchNewsCategory(); // Actualiza la lista de categorías
            onClose(); // Cierra el modal
        } catch (error) {
            notification.error({
                message: 'Error al actualizar categoría',
                description: 'Ocurrió un error al intentar actualizar la categoría. Inténtalo de nuevo.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ModalBase onClose={onClose} title={t('edit_details')} width={800} className="bg-white rounded-lg shadow-xl">
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
                        placeholder="Ingresa la nueva descripción de la categoría"
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
                        placeholder="Ingresa el nuevo alias de la categoría"
                    />
                </div>

                {/* Campo Select para el estado */}
                <div className="mb-4">
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                        Estado
                    </label>
                    <select
                        id="estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-opacity-50"
                    >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
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

export default EditNewsCategoryModal;
