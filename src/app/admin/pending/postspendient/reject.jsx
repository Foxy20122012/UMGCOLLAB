import React from 'react';
import { Modal, Button, notification } from 'antd';
import visiblePostsService from '../../../../services/umgService/collabAdmin/posts/visible/visiblePostService';

const RejectModal = ({ visible, onClose, postId, onReject }) => {
    const service = new visiblePostsService();

    const handleReject = async () => {
        try {
            await service.rejectPosts({ id: postId });
            notification.success({
                message: 'Post Rechazado',
                description: 'El post ha sido rechazado correctamente.',
            });
            onReject(); // Notifica a la página principal que el post fue rechazado
            onClose();
        } catch (error) {
            console.error('Error al rechazar el post:', error);
            notification.error({
                message: 'Error al Rechazar',
                description: 'Hubo un error al intentar rechazar el post. Por favor, intenta de nuevo.',
            });
        }
    };

    return (
        <Modal
            title="Rechazar Post"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancelar
                </Button>,
                <Button key="reject" type="primary" danger onClick={handleReject}>
                    Rechazar
                </Button>,
            ]}
        >
            <p>¿Estás seguro de que deseas rechazar este post?</p>
        </Modal>
    );
};

export default RejectModal;
