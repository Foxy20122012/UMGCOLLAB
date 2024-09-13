import React, { useState } from 'react';
import ModalBase from '../../../../components/templates/ModalBase/index';
import { useTranslations } from 'next-intl';
import { EventsCategory } from '../../../../models/interface/categories/EventsCategory'; // Cambia el modelo
import EventsCategoryService from '../../../../services/umgService/collabAdmin/categories/eventsCategoryService'; // Cambia el servicio
import { notification } from 'antd';

interface Props {
    onClose: () => void;
    fetchEventsCategory: () => void; // Cambia el nombre de la función
}

const InsertEventsCategoryModal: React.FC<Props> = ({ onClose, fetchEventsCategory }) => {
    const t = useTranslations('general');
    const [descripcion, setDescripcion] = useState('');
    const [alias, setAlias] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const eventsCategoryService = new EventsCategoryService(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); 
    
        try {
            const newCategory = { descripcion, alias }; 
            const response = await eventsCategoryService.createEventsCategory(newCategory);
            if (response && response.data && response.status === 201) {
                notification.success({
                    message: 'Categoría de evento creada',
                    description: 'La categoría de evento ha sido creada exitosamente',
                });
    
                // Refresca la tabla de categorías de eventos
                fetchEventsCategory();
    
                // Cierra el modal
                onClose();
            } else {
                // Si la respuesta no es exitosa, lanza un error
                throw new Error('Error en la creación de la categoría de evento');
            }
        } catch (error) {
            // Captura y maneja cualquier error
            console.error('Error al crear categoría de evento:', error);
            notification.error({
                message: 'Error al crear categoría de evento',
                description: 'Ocurrió un error al intentar crear la categoría de evento. Inténtalo de nuevo.',
            });
        } finally {
            setIsLoading(false); // Desbloquea el botón tras la finalización
        }
    };

    return (
        <ModalBase onClose={onClose} title={t('details')} width={800} className="bg-white rounded-lg shadow-xl">
            <form onSubmit={handleSubmit} className="p-4">
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
                        placeholder="Ingresa el alias de la categoría de evento"
                    />
                </div>
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
                        placeholder="Ingresa la descripción de la categoría de evento"
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

export default InsertEventsCategoryModal;