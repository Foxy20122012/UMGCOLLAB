import React from 'react';
import { Modal, Button } from 'antd';
import visibleEventsService from '../../../../services/umgService/collabAdmin/posts/visible/visiblePostService';

const ApprovalModal = ({ visible, onClose, postId, onApprove }) => {
    const service = new visibleEventsService();

    const handleApprove = async () => {
        try {
            await service.visiblePosts({ id: postId });
            onApprove(); // Notifica a la página principal que el post fue aprobado
            onClose();
        } catch (error) {
            console.error('Error al aprobar el post:', error);
        }
    };

    return (
        <Modal
            title="Aprobar Post"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancelar
                </Button>,
                <Button key="approve" type="primary" onClick={handleApprove}>
                    Aprobar
                </Button>,
            ]}
        >
            <p>¿Estás seguro de que deseas aprobar este evento?</p>
        </Modal>
    );
};

export default ApprovalModal;
