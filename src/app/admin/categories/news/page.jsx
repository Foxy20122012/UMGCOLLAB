'use client';

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { FaPlus } from "react-icons/fa";
import { EyeIcon } from '@heroicons/react/24/solid';
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import NewsCategoryService  from '../../../../services/umgService/collabAdmin/categories/newsCategoryService';
import InsertNewsCategoryModal from './insertNewCategory'; 
import EditNewsCategoryModal from './EditNewCategoryModal'; 
import DeleteConfirmationModal from "../../../../components/general/DeleteConfirmationModal/DeleteConfirmationModal";
import ViewDetailsModal from './ViewDetailsModal'; 

const PostCategoryPage = () => {
    const [newsCategory, setNewsCategory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategoryToDelete, setSelectedCategoryToDelete] = useState(null);

    const newsCategoryService = new NewsCategoryService();

    const fetchNewsCategories = async () => {
        try {
            const result = await newsCategoryService.getNewsCategory();
            if (result && Array.isArray(result.data)) {
                setNewsCategory(result.data);
            } else {
                console.error('Formato de respuesta inesperado:', result);
            }
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    useEffect(() => {
        fetchNewsCategories();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id_detalle',
            key: 'id_detalle',
        },
        {
            title: 'Código',
            dataIndex: 'codigo_categoria',
            key: 'codigo_categoria',
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
        },
        {
            title: 'Alias',
            dataIndex: 'alias',
            key: 'alias',
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
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

    const handleViewDetails = (record) => {
        setCurrentCategory(record);
        setIsViewModalOpen(true);
    };

    const handleDeleteClick = (category) => {
        setSelectedCategoryToDelete(category);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedCategoryToDelete) {
            try {
                await newsCategoryService.deleteNewsCategory(selectedCategoryToDelete.id_detalle);
                fetchNewsCategories();
                setSelectedCategoryToDelete(null);
                setShowDeleteModal(false);
            } catch (error) {
                console.error('Error al eliminar la categoría:', error);
            }
        }
    };

    const handleNewClick = () => {
        setIsModalOpen(true);
    };

    const handleEdit = (record) => {
        setCurrentCategory(record);
        setIsEditModalOpen(true);
    };

    return (
        <div>
            <div className="my-2">
                <h2 className="text-center font-bold text-xl">Categorías de Noticias</h2>
            </div>
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleNewClick}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
                >
                    <FaPlus className="text-xl mr-2" />
                    Nueva Categoría
                </button>
            </div>
            <div className='my-8'>
                <Table
                    columns={columns}
                    dataSource={newsCategory}
                    rowKey="id_detalle"
                    pagination={{
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20', '50'],
                    }}
                />
            </div>

            {/* Modal para insertar nueva categoría */}
{/* Modal para insertar nueva categoría */}
{isModalOpen && (
    <InsertNewsCategoryModal
        onClose={() => setIsModalOpen(false)}
        fetchNewsCategory={fetchNewsCategories} // Asegúrate de pasar la función correctamente
    />
)}


            {/* Modal para editar una categoría */}
            {isEditModalOpen && currentCategory && (
    <EditNewsCategoryModal
        onClose={() => setIsEditModalOpen(false)}
        fetchNewsCategory={fetchNewsCategories}
        currentCategory={currentCategory} // Pasa correctamente el objeto a editar
    />
)}


            {/* Modal de vista de detalles */}
            {isViewModalOpen && currentCategory && (
    <ViewDetailsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        selectedNewsCategory={currentCategory} // Asegúrate de que el objeto seleccionado está correcto
    />
)}


            {/* Modal de confirmación para eliminar una categoría */}
            {showDeleteModal && (
                <div className='flex justify-center'>
                    <DeleteConfirmationModal
                        isOpen={showDeleteModal}
                        onCancel={() => setShowDeleteModal(false)}
                        onConfirm={handleConfirmDelete}
                        message="¿Estás seguro de que quieres eliminar esta categoría?"
                    />
                </div>
            )}
        </div>
    );
};

export default PostCategoryPage;
