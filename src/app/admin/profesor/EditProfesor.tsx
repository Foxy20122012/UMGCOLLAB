import React, { useState, useEffect } from 'react';
import ModalBase from '../../../components/templates/ModalBase/index';
import { Usuario } from '../../../models/interface/user/User';
import RegistroProfesorService from '../../../services/umgService/collabAdmin/registerProfessors/registerProfessorsService';
import { useTranslations } from 'next-intl';
import { notification } from 'antd';

interface Props {
    onClose: () => void;
    fetchProfesores: () => void; // Para refrescar la lista de profesores después de editar uno
    currentProfesor: Usuario | null; // El objeto del profesor actual para editar
}

const EditProfesor: React.FC<Props> = ({ onClose, fetchProfesores, currentProfesor }) => {
    const t = useTranslations('general');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [ocupacion, setOcupacion] = useState('');
    const [intereses, setIntereses] = useState('');
    const [activo, setActivo] = useState(true); // Para manejar el campo activo
    const [isLoading, setIsLoading] = useState(false);
    const registroProfesorService = new RegistroProfesorService();

    // Actualiza los campos cuando se recibe un nuevo currentProfesor
    useEffect(() => {
        if (currentProfesor) {
            setNombre(currentProfesor.nombre || '');
            setApellido(currentProfesor.apellido || '');
            setCorreo(currentProfesor.correo || '');
            setTelefono(currentProfesor.telefono || '');
            setDireccion(currentProfesor.direccion || '');
    
            // Convertimos la fecha de nacimiento al formato 'YYYY-MM-DD'
            if (currentProfesor.fecha_nacimiento) {
                const formattedDate = new Date(currentProfesor.fecha_nacimiento).toISOString().split('T')[0];
                setFechaNacimiento(formattedDate);
            } else {
                setFechaNacimiento('');
            }
    
            setOcupacion(currentProfesor.ocupacion || '');
            setIntereses(currentProfesor.intereses || '');
            setActivo(currentProfesor.activo || false);
        }
    }, [currentProfesor]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Creamos un objeto que contendrá solo los campos que han cambiado
            const updatedProfesor = {
                nombre: nombre || currentProfesor?.nombre,
                apellido: apellido || currentProfesor?.apellido,
                correo: correo || currentProfesor?.correo,
                telefono: telefono || currentProfesor?.telefono,
                direccion: direccion || currentProfesor?.direccion,
                fecha_nacimiento: fechaNacimiento || currentProfesor?.fecha_nacimiento,
                ocupacion: ocupacion || currentProfesor?.ocupacion,
                intereses: intereses || currentProfesor?.intereses,
                activo: activo,
            };

            // Realiza la actualización solo con los campos modificados
            await registroProfesorService.updateRegistroProfesor(currentProfesor?.id, updatedProfesor);
            notification.success({
                message: 'Profesor actualizado',
                description: 'La información del profesor ha sido actualizada exitosamente',
            });

            fetchProfesores(); // Actualiza la lista de profesores
            onClose(); // Cierra el modal
        } catch (error) {
            notification.error({
                message: 'Error al actualizar profesor',
                description: 'Ocurrió un error al intentar actualizar la información del profesor. Inténtalo de nuevo.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ModalBase onClose={onClose} title={t('edit_details')} width={800} className="bg-white rounded-lg shadow-xl">
            <form onSubmit={handleSubmit} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                        Nombre
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-opacity-50"
                        placeholder="Ingresa el nombre del profesor"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                        Apellido
                    </label>
                    <input
                        id="apellido"
                        type="text"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-opacity-50"
                        placeholder="Ingresa el apellido del profesor"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                        Correo
                    </label>
                    <input
                        id="correo"
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-opacity-50"
                        placeholder="Ingresa el correo del profesor"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                        Teléfono
                    </label>
                    <input
                        id="telefono"
                        type="text"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-opacity-50"
                        placeholder="Ingresa el teléfono del profesor"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                        Dirección
                    </label>
                    <input
                        id="direccion"
                        type="text"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-opacity-50"
                        placeholder="Ingresa la dirección del profesor"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">
                        Fecha de Nacimiento
                    </label>
                    <input
                        id="fechaNacimiento"
                        type="date"
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="ocupacion" className="block text-sm font-medium text-gray-700">
                        Ocupación
                    </label>
                    <input
                        id="ocupacion"
                        type="text"
                        value={ocupacion}
                        onChange={(e) => setOcupacion(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="intereses" className="block text-sm font-medium text-gray-700">
                        Intereses
                    </label>
                    <input
                        id="intereses"
                        type="text"
                        value={intereses}
                        onChange={(e) => setIntereses(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-opacity-50"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="activo" className="block text-sm font-medium text-gray-700">
                        Activo
                    </label>
                    <select
                        id="activo"
                        value={activo ? '1' : '0'}
                        onChange={(e) => setActivo(e.target.value === '1')}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-opacity-50"
                    >
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                </div>

                <div className="col-span-2 flex justify-end">
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

export default EditProfesor;
