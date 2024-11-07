// src/app/admin/views/viewPost/[id]/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import approvedPostsService from '../../../../../services/umgService/collabAdmin/posts/approved/postsApprovedService';
import { Card, Col, Row, Typography, Divider, Tag, Space, Modal, Button } from 'antd';
import { useParams } from 'next/navigation';
import { CheckCircleOutlined, ClockCircleOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ApprovedPostDetails = () => {
  const [postDetails, setPostDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (id) {
        try {
          const service = new approvedPostsService();
          const response = await service.getPostsApprovedId(id);
          setPostDetails(response.data);
        } catch (error) {
          console.error('Error fetching post details:', error);
        }
      }
    };
    fetchPostDetails();
  }, [id]);

  const showModal = (img) => {
    setSelectedImage(img);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  if (!postDetails) {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  return (
    <div className="p-8 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-2xl">
      <Title level={2} className="text-center text-indigo-600 mb-6">
        {postDetails.titulo}
      </Title>
      <Divider />
      <Row justify="space-between" align="middle">
        <Col span={11}>
          <Space direction="vertical" size="middle" className="w-full">
            <Paragraph className="text-lg font-semibold text-gray-700">
              <strong>Contenido:</strong> {postDetails.contenido}
            </Paragraph>
            <Paragraph className="text-lg font-semibold text-gray-700">
              <strong>Estado:</strong>{' '}
              <Tag color={postDetails.estado === 'aprobado' ? 'green' : 'orange'} className="rounded-full px-3 py-1 text-base">
                {postDetails.estado === 'aprobado' ? (
                  <>
                    <CheckCircleOutlined /> Aprobado
                  </>
                ) : (
                  <>
                    <ClockCircleOutlined /> Pendiente
                  </>
                )}
              </Tag>
            </Paragraph>
            <Paragraph className="text-lg font-semibold text-gray-700">
              <strong>Fecha de Evento:</strong>{' '}
              {new Date(postDetails.fecha_evento).toLocaleString('es-ES', {
                dateStyle: 'full',
                timeStyle: 'short',
              })}
            </Paragraph>
            <Paragraph className="text-lg font-semibold text-gray-700">
              <strong>Ubicación del Evento:</strong> {postDetails.ubicacion_evento}
            </Paragraph>
          </Space>
        </Col>
      </Row>
      <Divider className="my-8 border-t-2 border-gray-300" />
      <Title level={3} className="text-center text-indigo-600">Imágenes</Title>
      <Row gutter={[16, 16]} className="mt-6">
        {postDetails.imagenes.map((img, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="shadow-lg transition-transform transform hover:scale-105 rounded-xl overflow-hidden border border-gray-200"
              cover={
                <img
                  alt={`Imagen ${index + 1}`}
                  src={img.url}
                  className="object-cover h-64 w-full cursor-pointer"
                  onClick={() => showModal(img)}
                />
              }
            >
              <Card.Meta title={`Imagen ${index + 1}`} className="text-center" />
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                href={img.url}
                download
                className="mt-2 w-full"
              >
                Descargar
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <Divider className="my-8 border-t-2 border-gray-300" />
      <Title level={3} className="text-center text-indigo-600">Documentos</Title>
      <Row gutter={[16, 16]} className="mt-6">
        {postDetails.archivos_adjuntos.map((file, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="shadow-lg transition-transform transform hover:scale-105 rounded-xl overflow-hidden border border-gray-200"
              title={
                <span className="font-semibold text-lg text-indigo-600">
                  Documento {index + 1}
                </span>
              }
              extra={
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  Ver
                </a>
              }
            >
              <p className="text-sm text-gray-500">Public ID: {file.public_id}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para ver la imagen en detalle */}
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={handleModalClose}
        centered
        width={800}
        bodyStyle={{ padding: '20px', textAlign: 'center' }}
      >
        {selectedImage && (
          <div>
            <img src={selectedImage.url} alt="Vista detallada" className="w-full h-auto rounded-md mb-4" />
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              href={selectedImage.url}
              download
              className="mt-2"
            >
              Descargar
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ApprovedPostDetails;
