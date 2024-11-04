'use client';

import React, { useEffect, useState } from 'react';
import { Table, notification } from 'antd';
import { FaPlus } from "react-icons/fa";
import { EyeIcon } from '@heroicons/react/24/solid';
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import visibleEventsService from '../../../../services/umgService/collabAdmin/posts/visible/visiblePostService';
import ViewDetailsModal from './ViewDetailsModal';
import DeleteConfirmationModal from "../../../../components/general/DeleteConfirmationModal/DeleteConfirmationModal";

const PendingPostsPage = () => {
    const [pendingPosts, setPendingPosts] = useState([]);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPostToDelete, setSelectedPostToDelete] = useState(null);

    const eventsService = new visibleEventsService();

    const fetchPendingPosts = async () => {
        try {
            const result = await eventsService.getPosts();
            if (result && Array.isArray(result.data)) {
                setPendingPosts(result.data);
            } else {
                console.error('Unexpected response format:', result);
            }
        } catch (error) {
            console.error('Error fetching pending posts:', error);
            notification.error({
                message: 'Error',
                description: 'There was an error fetching the pending posts.',
            });
        }
    };

    useEffect(() => {
        fetchPendingPosts();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Título',
            dataIndex: 'titulo',
            key: 'titulo',
        },
        {
            title: 'Contenido',
            dataIndex: 'contenido',
            key: 'contenido',
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
        },
        {
            title: 'Prioridad',
            dataIndex: 'prioridad',
            key: 'prioridad',
        },
        {
            title: 'Fecha de Evento',
            dataIndex: 'fecha_evento',
            key: 'fecha_evento',
            render: (text) => (text ? new Date(text).toLocaleString() : 'N/A'),
        },
        {
            title: 'Ubicación',
            dataIndex: 'ubicacion_evento',
            key: 'ubicacion_evento',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (text, record) => (
                <div className='flex justify-center'>
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
        setCurrentPost(record);
        setIsViewModalOpen(true);
    };

    const handleDeleteClick = (post) => {
        setSelectedPostToDelete(post);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedPostToDelete) {
            try {
                // Replace this with the delete function if available
                await eventsService.deletePost(selectedPostToDelete.id);
                fetchPendingPosts();
                setSelectedPostToDelete(null);
                setShowDeleteModal(false);
            } catch (error) {
                console.error('Error deleting post:', error);
                notification.error({
                    message: 'Error',
                    description: 'There was an error deleting the post.',
                });
            }
        }
    };

    return (
        <div>
            <div className="my-2">
                <h2 className="text-center font-bold text-xl">Pending Posts</h2>
            </div>
            <div className='my-8'>
                <Table
                    columns={columns}
                    dataSource={pendingPosts}
                    rowKey="id"
                    pagination={{
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '20', '50'],
                    }}
                />
            </div>

            {/* Modal for viewing details */}
            {isViewModalOpen && currentPost && (
                <ViewDetailsModal
                    isOpen={isViewModalOpen}
                    onClose={() => setIsViewModalOpen(false)}
                    selectedPost={currentPost}
                />
            )}

            {/* Delete confirmation modal */}
            {showDeleteModal && (
                <DeleteConfirmationModal
                    isOpen={showDeleteModal}
                    onCancel={() => setShowDeleteModal(false)}
                    onConfirm={handleConfirmDelete}
                    message="Are you sure you want to delete this post?"
                />
            )}
        </div>
    );
};

export default PendingPostsPage;
