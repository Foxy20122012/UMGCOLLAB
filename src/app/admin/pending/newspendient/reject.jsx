import React from 'react';
import { Modal, Button, notification } from 'antd';
import visibleNewsService from '../../../../services/umgService/collabAdmin/posts/visible/visibleNewsService';

const RejectModal = ({ visible, onClose, postId, onReject }) => {
    const service = new visibleNewsService();

    const handleReject = async () => {
        try {
            await service.rejectPosts({ id: postId });
            notification.success({
                message: 'Noticia Rechazada',
                description: 'La noticia ha sido rechazada correctamente.',
            });
            onReject(); // Notifica a la página principal que la noticia fue rechazada
            onClose();
        } catch (error) {
            console.error('Error al rechazar la noticia:', error);
            notification.error({
                message: 'Error al Rechazar',
                description: 'Hubo un error al intentar rechazar la noticia. Por favor, intenta de nuevo.',
            });
        }
    };

    return (
        <Modal
            title="Rechazar Noticia"
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
            <p>¿Estás seguro de que deseas rechazar esta noticia?</p>
        </Modal>
    );
};

export default RejectModal;
