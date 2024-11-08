'use client';

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { FaPlus } from "react-icons/fa";
import { EyeIcon } from '@heroicons/react/24/solid';
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import RegistroStudentService from '../../../services/umgService/collabAdmin/registerStudent/registerStudentService'; 
import InsertStudentModal from './InsertStudent'; // Modal para insertar estudiante
import EditStudentModal from './EditStudent'; // Modal para editar estudiante
import DeleteConfirmationModal from "../../../components/general/DeleteConfirmationModal/DeleteConfirmationModal";
import ViewDetailsModal from './ViewDetailsModal'; // Modal de vista de detalles de estudiante

const StudentPage = () => {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStudentToDelete, setSelectedStudentToDelete] = useState(null);

    const registroStudentService = new RegistroStudentService();

    const fetchStudents = async () => {
        try {
            const result = await registroStudentService.getRegistroStudent();
            if (result && Array.isArray(result.data)) {
                setStudents(result.data);
            } else {
                console.error('Formato de respuesta inesperado:', result);
            }
        } catch (error) {
            console.error('Error al obtener estudiantes:', error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleViewDetails = (record) => {
        setCurrentStudent(record); // Selecciona correctamente el estudiante actual
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

    const handleDeleteClick = (student) => {
        setSelectedStudentToDelete(student);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedStudentToDelete) {
            try {
                await registroStudentService.deleteRegistroStudent(selectedStudentToDelete.id);
                fetchStudents();
                setSelectedStudentToDelete(null);
                setShowDeleteModal(false);
            } catch (error) {
                console.error('Error al eliminar el estudiante:', error);
            }
        }
    };

    const handleNewClick = () => {
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        setCurrentStudent(record);
        setIsEditModalOpen(true);
    };

    return (
        <div>
            <div className="my-2">
                <h2 className="text-center font-bold text-xl">Estudiantes</h2>
            </div>
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleNewClick}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                >
                    <FaPlus className="text-xl mr-2" />
                    Nuevo Estudiante
                </button>
            </div>
            <div className='my-8'>
                <Table
                    columns={columns}
                    dataSource={students}
                    rowKey="id"
                    pagination={{
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20', '50'],
                    }}
                />
            </div>

            {/* Modal para insertar nuevo estudiante */}
            {isModalOpen && (
                <InsertStudentModal
                    onClose={() => setIsModalOpen(false)}
                    fetchStudents={fetchStudents}
                />
            )}

            {/* Modal para editar un estudiante */}
            {isEditModalOpen && currentStudent && (
                <EditStudentModal
                    onClose={() => setIsEditModalOpen(false)}
                    fetchStudents={fetchStudents}
                    currentStudent={currentStudent}
                />
            )}

            {/* Modal de vista de detalles */}
            {isViewModalOpen && currentStudent && (
                <ViewDetailsModal
                    isOpen={isViewModalOpen}
                    onClose={() => setIsViewModalOpen(false)}
                    selectedStudent={currentStudent} // Pasar el estudiante seleccionado correctamente
                />
            )}

            {/* Modal de confirmación para eliminar un estudiante */}
            {showDeleteModal && (
                <div className='flex justify-center'>
                    <DeleteConfirmationModal
                        isOpen={showDeleteModal}
                        onCancel={() => setShowDeleteModal(false)}
                        onConfirm={handleConfirmDelete}
                        message="¿Estás seguro de que quieres eliminar este estudiante?"
                    />
                </div>
            )}
        </div>
    );
};

export default StudentPage;
