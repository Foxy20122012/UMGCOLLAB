import React, { useState, useEffect } from 'react';
import ModalBase from '../../../../components/templates/ModalBase/index';
import { useTranslations } from 'next-intl';
import { EventsCategory } from '../../../../models/interface/categories/EventsCategory'; // Cambiar el modelo
import EventsCategoryService from '../../../../services/umgService/collabAdmin/categories/eventsCategoryService'; // Cambiar el servicio
import { notification } from 'antd';

interface Props {
    onClose: () => void;
    fetchEventsCategory: () => void; // Cambié la función de actualización para eventos
    currentCategory: EventsCategory | null; // Ahora utilizamos 'EventsCategory'
}

const EditEventsCategoryModal: React.FC<Props> = ({ onClose, fetchEventsCategory, currentCategory }) => {
    const t = useTranslations('general');
    const [descripcion, setDescripcion] = useState('');
    const [alias, setAlias] = useState('');
    const [estado, setEstado] = useState(''); // Estado para el campo 'estado'
    const [isLoading, setIsLoading] = useState(false);
    const eventsCategoryService = new EventsCategoryService(); // Cambiar a EventsCategoryService

    // Este hook actualiza los campos cuando se recibe un nuevo currentCategory
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
            const updatedCategory = {
                descripcion: descripcion || currentCategory?.descripcion,
                alias: alias || currentCategory?.alias,
                estado: estado || currentCategory?.estado,
            };

            await eventsCategoryService.updateEventsCategory(currentCategory?.id_detalle, updatedCategory); // Cambiar a updateEventCategory
            notification.success({
                message: 'Categoría de evento actualizada',
                description: 'La categoría de evento ha sido actualizada exitosamente',
            });

            fetchEventsCategory(); // Actualiza la lista de categorías de eventos
            onClose(); // Cierra el modal
        } catch (error) {
            notification.error({
                message: 'Error al actualizar categoría de evento',
                description: 'Ocurrió un error al intentar actualizar la categoría de evento. Inténtalo de nuevo.',
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
                        placeholder="Ingresa la nueva descripción de la categoría de evento"
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
                        placeholder="Ingresa el nuevo alias de la categoría de evento"
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

export default EditEventsCategoryModal;
