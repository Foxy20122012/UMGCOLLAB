'use client';

import React, { useEffect, useState } from 'react';
import { Table, notification } from 'antd';
import { FaPlus } from "react-icons/fa";
import { EyeIcon } from '@heroicons/react/24/solid';
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import visibleNewsService from '../../../../services/umgService/collabAdmin/posts/visible/visibleNewsService';
import ViewDetailsModal from './ViewDetailsModal';
import ApprovalModal from './approval';
import DeleteConfirmationModal from "../../../../components/general/DeleteConfirmationModal/DeleteConfirmationModal";

const PendingPostsPage = () => {
    const [pendingPosts, setPendingPosts] = useState([]);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [postIdToApprove, setPostIdToApprove] = useState(null);

    const service = new visibleNewsService();

    const fetchPendingPosts = async () => {
        try {
            const result = await service.getPosts();
            if (result && Array.isArray(result.data)) {
                setPendingPosts(result.data);
            } else {
                console.error('Formato de respuesta inesperado:', result);
            }
        } catch (error) {
            console.error('Error al obtener posts pendientes:', error);
        }
    };

    useEffect(() => {
        fetchPendingPosts();
    }, []);

    const handleViewDetails = (record) => {
        setCurrentPost(record);
        setIsViewModalOpen(true);
    };

    const handleApproveClick = (postId) => {
        setPostIdToApprove(postId);
        setIsApprovalModalOpen(true);
    };

    const handleApproveSuccess = () => {
        fetchPendingPosts(); // Refresca la lista de posts después de aprobar uno
        notification.success({
            message: 'Éxito',
            description: 'La Noticia ha sido aprobado correctamente.',
        });
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Título', dataIndex: 'titulo', key: 'titulo' },
        { title: 'Contenido', dataIndex: 'contenido', key: 'contenido' },
        { title: 'Estado', dataIndex: 'estado', key: 'estado' },
        { title: 'Prioridad', dataIndex: 'prioridad', key: 'prioridad' },
        {
            title: 'Acciones',
            key: 'actions',
            render: (text, record) => (
                <div className='flex justify-center'>
                    <button onClick={() => handleViewDetails(record)}>
                        <EyeIcon className="h-5 w-5 mr-2 text-blue-800 hover:bg-blue-200 hover:text-blue-900" />
                    </button>
                    <button onClick={() => handleApproveClick(record.id)}>
                        <MdEdit className="h-5 w-5 mr-2 text-green-600 hover:bg-green-200 hover:text-green-700" />
                    </button>
                    <button onClick={() => handleDeleteClick(record)}>
                        <MdDeleteOutline className="h-5 w-5 text-red-600 hover:text-red-700" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2 className="text-center font-bold text-xl">Noticias pendientes de aprobación.</h2>
            <Table columns={columns} dataSource={pendingPosts} rowKey="id" pagination={{ showSizeChanger: true, pageSizeOptions: ['5', '10', '20', '50'] }} />

            {isViewModalOpen && currentPost && (
                <ViewDetailsModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} selectedPost={currentPost} />
            )}

            {isApprovalModalOpen && (
                <ApprovalModal
                    visible={isApprovalModalOpen}
                    onClose={() => setIsApprovalModalOpen(false)}
                    postId={postIdToApprove}
                    onApprove={handleApproveSuccess}
                />
            )}
        </div>
    );
};

export default PendingPostsPage;
