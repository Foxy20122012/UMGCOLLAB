import React, { useState } from 'react';
import ModalBase from '../../../components/templates/ModalBase/index';
import { Usuario } from '../../../models/interface/user/User'; 
import RegistroProfesorService from '../../../services/umgService/collabAdmin/registerProfessors/registerProfessorsService'; 
import { useTranslations } from 'next-intl';
import { notification } from 'antd';

interface Props {
    onClose: () => void;
    fetchProfesores: () => void; // Para refrescar la lista de profesores después de insertar uno nuevo
}

const InsertProfesor: React.FC<Props> = ({ onClose, fetchProfesores }) => {
    const t = useTranslations('general');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [ocupacion, setOcupacion] = useState('');
    const [intereses, setIntereses] = useState('');
    const [contraseña, setContraseña] = useState(''); // Nuevo estado para la contraseña
    const [isLoading, setIsLoading] = useState(false);
    const registroProfesorService = new RegistroProfesorService();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); // Bloquea el botón para evitar múltiples clics.

        try {
            // Datos que se enviarán al servidor
            const newProfesor: Partial<Usuario> = {
                nombre,
                apellido,
                correo,
                telefono,
                direccion,
                fecha_nacimiento: fechaNacimiento,
                ocupacion,
                intereses,
                rol: 'catedratico', // Por defecto es 'catedratico'
                puesto: 'Catedrático', // Asigna 'Catedrático' al campo de puesto
                activo: true, // Por defecto activo
                contraseña // Añadir la contraseña al objeto a enviar
            };

            // Llamada al servicio para crear el nuevo profesor
            const response = await registroProfesorService.createRegistroProfesor(newProfesor);

            if (response && response.data && response.status === 201) {
                notification.success({
                    message: 'Profesor creado',
                    description: 'El profesor ha sido creado exitosamente',
                });

                // Refresca la lista de profesores
                fetchProfesores();

                // Cierra el modal
                onClose();
            } else {
                // Si la respuesta no es exitosa, lanza un error
                throw new Error('Error en la creación del profesor');
            }
        } catch (error) {
            console.error('Error al crear profesor:', error);
            notification.error({
                message: 'Error al crear profesor',
                description: 'Ocurrió un error al intentar crear el profesor. Inténtalo de nuevo.',
            });
        } finally {
            setIsLoading(false); // Desbloquea el botón tras la finalización
        }
    };

    return (
        <ModalBase onClose={onClose} title={t('details')} width={800} className="bg-white rounded-lg shadow-xl">
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
                    <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">
                        Contraseña
                    </label>
                    <input
                        id="contraseña"
                        type="password"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-opacity-50"
                        placeholder="Ingresa una contraseña"
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
                        placeholder="Ingresa la fecha de nacimiento del profesor"
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
                        placeholder="Ingresa la ocupación del profesor"
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
                        placeholder="Ingresa los intereses del profesor"
                    />
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

export default InsertProfesor;
