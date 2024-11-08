'use client';

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { FaPlus } from "react-icons/fa";
import { EyeIcon } from '@heroicons/react/24/solid';
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import RegistroProfesorService from '../../../services/umgService/collabAdmin/registerProfessors/registerProfessorsService';
import InsertProfesorModal from './InsertProfesor'; 
import EditProfesorModal from './EditProfesor'; 
import DeleteConfirmationModal from "../../../components/general/DeleteConfirmationModal/DeleteConfirmationModal";
import ViewDetailsModal from './ViewDetailsModal'; 

const ProfesorPage = () => {
    const [profesores, setProfesores] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentProfesor, setCurrentProfesor] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProfesorToDelete, setSelectedProfesorToDelete] = useState(null);

    const registroProfesorService = new RegistroProfesorService();

    const fetchProfesores = async () => {
        try {
            const result = await registroProfesorService.getRegistroProfesor();
            if (result && Array.isArray(result.data)) {
                setProfesores(result.data);
            } else {
                console.error('Formato de respuesta inesperado:', result);
            }
        } catch (error) {
            console.error('Error al obtener profesores:', error);
        }
    };

    useEffect(() => {
        fetchProfesores();
    }, []);

    const handleViewDetails = (record) => {
        setCurrentProfesor(record); // Asegúrate de que el profesor actual se selecciona correctamente
        setIsViewModalOpen(true);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Correo',
            dataIndex: 'correo',
            key: 'correo',
        },
        {
            title: 'Teléfono',
            dataIndex: 'telefono',
            key: 'telefono',
        },
        {
            title: 'Activo',
            dataIndex: 'activo',
            key: 'activo',
            render: (text) => (text ? 'Sí' : 'No'),
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (text, record) => (
                <div className='flex justify-center'>
                    <button onClick={() => handleEdit(record)}>
                        <MdEdit className="h-5 w-5 mr-2 text-yellow-500 hover:bg-yellow-200 hover:text-yellow-600" />
                    </button>
                    <button onClick={() => handleViewDetails(record)}>
                        <EyeIcon className="h-5 w-5 mr-2 text-blue-800 hover:bg-blue-200 hover:text-blue-900" />
                    </button>
                    <button onClick={() => handleDeleteClick(record)}>
                        <MdDeleteOutline className="h-5 w-5 text-red-600 hover:text-red-700" />
                    </button>
                </div>
            ),
        },
    ];

 
    

    const handleDeleteClick = (profesor) => {
        setSelectedProfesorToDelete(profesor);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedProfesorToDelete) {
            try {
                await registroProfesorService.deleteRegistroProfesor(selectedProfesorToDelete.id);
                fetchProfesores();
                setSelectedProfesorToDelete(null);
                setShowDeleteModal(false);
            } catch (error) {
                console.error('Error al eliminar el profesor:', error);
            }
        }
    };

    const handleNewClick = () => {
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        setCurrentProfesor(record);
        setIsEditModalOpen(true);
    };

    return (
        <div>
            <div className="my-2">
                <h2 className="text-center font-bold text-xl">Profesores</h2>
            </div>
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleNewClick}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                >
                    <FaPlus className="text-xl mr-2" />
                    Nuevo Profesor
                </button>
            </div>
            <div className='my-8'>
                <Table
                    columns={columns}
                    dataSource={profesores}
                    rowKey="id"
                    pagination={{
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20', '50'],
                    }}
                />
            </div>

            {/* Modal para insertar nuevo profesor */}
            {isModalOpen && (
                <InsertProfesorModal
                    onClose={() => setIsModalOpen(false)}
                    fetchProfesores={fetchProfesores}
                />
            )}

            {/* Modal para editar un profesor */}
            {isEditModalOpen && currentProfesor && (
                <EditProfesorModal
                    onClose={() => setIsEditModalOpen(false)}
                    fetchProfesores={fetchProfesores}
                    currentProfesor={currentProfesor}
                />
            )}

            {/* Modal de vista de detalles */}
            {isViewModalOpen && currentProfesor && (
                <ViewDetailsModal
                    isOpen={isViewModalOpen}
                    onClose={() => setIsViewModalOpen(false)}
                    selectedProfesor={currentProfesor} // Aquí se pasa el profesor seleccionado correctamente
                />
            )}
            {/* Modal de confirmación para eliminar un profesor */}
            {showDeleteModal && (
                <div className='flex justify-center'>
                    <DeleteConfirmationModal
                        isOpen={showDeleteModal}
                        onCancel={() => setShowDeleteModal(false)}
                        onConfirm={handleConfirmDelete}
                        message="¿Estás seguro de que quieres eliminar este profesor?"
                    />
                </div>
            )}
        </div>
    );
};

export default ProfesorPage;
