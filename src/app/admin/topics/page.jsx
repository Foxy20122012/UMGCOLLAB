'use client';

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { FaPlus } from "react-icons/fa";
import { EyeIcon } from '@heroicons/react/24/solid';
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import TemaService from '../../../services/umgService/collabAdmin/topics/topicsService';
import InsertTopicsModal from './InserTopicsModal'; 
import EditTopicsModal from './EditTopicsModal'; 
import DeleteConfirmationModal from "../../../components/general/DeleteConfirmationModal/DeleteConfirmationModal";
import ViewDetailsModal from './ViewDetailsModal'; 

const TopicsPage = () => {
    const [temas, setTemas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false); // Estado para manejar la visibilidad del modal de vista
    const [currentTopic, setCurrentTopic] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTopicToDelete, setSelectedTopicToDelete] = useState(null);
    const temaService = new TemaService();

    const fetchTemas = async () => {
        try {
            const result = await temaService.getTemas();
            if (result && Array.isArray(result.data)) {
                setTemas(result.data);
            } else {
                console.error('Formato de respuesta inesperado:', result);
            }
        } catch (error) {
            console.error('Error al obtener temas:', error);
        }
    };

    useEffect(() => {
        fetchTemas();
    }, []);

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
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
        },
        {
            title: 'Curso',
            dataIndex: ['curso', 'nombre'], // Se accede al nombre del curso
            key: 'curso_nombre',
            render: (cursoNombre) => cursoNombre || 'Sin asignar',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (text, record) => (
                <div className='flex justify-center'>
                    <button
                        className=""
                        onClick={() => handleEdit(record)}
                    >
                        <MdEdit className="h-5 w-5 mr-2 text-yellow-500 hover:bg-yellow-200 hover:text-yellow-600" />
                    </button>
                    <button
                        className=""
                        onClick={() => handleViewDetails(record)}
                    >
                        <EyeIcon className="h-5 w-5 mr-2 text-blue-800 hover:bg-blue-200 hover:text-blue-900" />
                    </button>
                    <button
                        className=""
                        onClick={() => handleDeleteClick(record)}
                    >
                        <MdDeleteOutline className="h-5 w-5 text-red-600 hover:text-red-700" />
                    </button>
                </div>
            ),
        },
    ];

    const handleViewDetails = (record) => {
        setCurrentTopic(record);
        setIsViewModalOpen(true);
    };

    const handleDeleteClick = (topic) => {
        setSelectedTopicToDelete(topic);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedTopicToDelete) {
            try {
                await temaService.deleteTema(selectedTopicToDelete.id);
                fetchTemas();
                setSelectedTopicToDelete(null);
                setShowDeleteModal(false);
            } catch (error) {
                console.error('Error al eliminar el tema:', error);
            }
        }
    };

    const handleNewClick = () => {
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        setCurrentTopic(record);
        setIsEditModalOpen(true);
    };

    return (
        <div>
            <div className="my-2">
                <h2 className="text-center font-bold text-xl">Temas Disponibles</h2>
            </div>
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleNewClick}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                >
                    <FaPlus className="text-xl mr-2" />
                    Nuevo
                </button>
            </div>
            <div className='my-8'>
                <Table
                    columns={columns}
                    dataSource={temas}
                    rowKey="id"
                    pagination={{
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20', '50'],
                    }}
                />
            </div>

            {/* Modal para insertar nuevo tema */}
            {isModalOpen && (
                <InsertTopicsModal
                    onClose={() => setIsModalOpen(false)}
                    fetchTemas={fetchTemas}
                />
            )}

            {/* Modal para editar un tema */}
            {isEditModalOpen && currentTopic && (
                <EditTopicsModal
                    onClose={() => setIsEditModalOpen(false)}
                    fetchTemas={fetchTemas}
                    currentTopic={currentTopic}
                />
            )}

            {/* Modal de vista de detalles */}
            {isViewModalOpen && currentTopic && (
                <ViewDetailsModal
                    isOpen={isViewModalOpen}
                    onClose={() => setIsViewModalOpen(false)}
                    selectedTopic={currentTopic}
                />
            )}

            {/* Modal de confirmación para eliminar un tema */}
            {showDeleteModal && (
                <div className='flex justify-center'>
                    <DeleteConfirmationModal
                        isOpen={showDeleteModal}
                        onCancel={() => setShowDeleteModal(false)}
                        onConfirm={handleConfirmDelete}
                        message="¿Estás seguro de que quieres eliminar este Tema?"
                    />
                </div>
            )}
        </div>
    );
};

export default TopicsPage;