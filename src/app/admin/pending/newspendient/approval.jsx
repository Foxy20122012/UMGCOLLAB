import React from 'react';
import { Modal, Button } from 'antd';
import visibleNewsService from '../../../../services/umgService/collabAdmin/posts/visible/visibleNewsService';

const ApprovalModal = ({ visible, onClose, postId, onApprove }) => {
    const service = new visibleNewsService();

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
            <p>¿Estás seguro de que deseas aprobar esta noticia?</p>
        </Modal>
    );
};

export default ApprovalModal;
