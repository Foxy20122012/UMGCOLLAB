// src/app/admin/views/viewPost/[id]/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import approvedPostsService from '../../../../../services/umgService/collabAdmin/posts/approved/postsApprovedService';
import { Card, Col, Row, Typography, Divider, Tag, Space, Modal, Button } from 'antd';
import { useParams } from 'next/navigation';
import { CheckCircleOutlined, ClockCircleOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const downloadFileWithExtension = async (url, defaultName) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('Content-Type');

    // Mapear los tipos de contenido a extensiones comunes
    const mimeToExtension = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'application/pdf': '.pdf',
      'application/msword': '.doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
      // Agrega más tipos de contenido según sea necesario
    };

    const extension = mimeToExtension[contentType] || '';
    const fileName = `${defaultName}${extension}`;

    // Crear un enlace temporal para forzar la descarga
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error al obtener la extensión del archivo:', error);
    // Descargar con el nombre predeterminado si ocurre un error
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', defaultName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

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
    <div className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl">
      <Title level={2} className="text-center text-blue-700 font-extrabold mb-8">
        {postDetails.titulo}
      </Title>
      <Divider className="border-t-2 border-blue-200" />
      <Row justify="center">
        <Col span={22}>
          <Space direction="vertical" size="large" className="w-full bg-blue-50 p-6 rounded-xl shadow-inner">
            <Paragraph className="text-xl font-semibold text-gray-800">
              <strong>Contenido:</strong> {postDetails.contenido}
            </Paragraph>
            <Paragraph className="text-xl font-semibold text-gray-800">
              <strong>Estado:</strong>{' '}
              <Tag color={postDetails.estado === 'aprobado' ? 'green' : 'orange'} className="rounded-full px-4 py-2 text-lg">
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
            <Paragraph className="text-xl font-semibold text-gray-800">
              <strong>Fecha de Evento:</strong>{' '}
              {new Date(postDetails.fecha_evento).toLocaleString('es-ES', {
                dateStyle: 'full',
                timeStyle: 'short',
              })}
            </Paragraph>
            <Paragraph className="text-xl font-semibold text-gray-800">
              <strong>Ubicación del Evento:</strong> {postDetails.ubicacion_evento}
            </Paragraph>
          </Space>
        </Col>
      </Row>
      <Divider className="my-8 border-t-2 border-blue-300" />
      <Title level={3} className="text-center text-blue-600 font-bold mb-4">Imágenes</Title>
      <Row gutter={[24, 24]} className="mt-6">
        {postDetails.imagenes.map((img, index) => (
          <Col key={index} xs={24} sm={12} md={8} className="flex justify-center">
            <Card
              hoverable
              className="shadow-lg transition-transform transform hover:scale-105 rounded-2xl overflow-hidden border border-gray-200"
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
                className="mt-2 w-full bg-gradient-to-r from-blue-500 to-blue-700 border-none"
                onClick={() => downloadFileWithExtension(img.url, `imagen_${index + 1}`)}
              >
                Descargar
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <Divider className="my-8 border-t-2 border-blue-300" />
      <Title level={3} className="text-center text-blue-600 font-bold mb-4">Documentos</Title>
      <Row gutter={[24, 24]} className="mt-6">
        {postDetails.archivos_adjuntos.map((file, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="shadow-lg transition-transform transform hover:scale-105 rounded-2xl overflow-hidden border border-gray-200"
              title={
                <span className="font-semibold text-lg text-blue-700">
                  Documento {index + 1}
                </span>
              }
              extra={
                <Button
                  type="link"
                  icon={<DownloadOutlined />}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => downloadFileWithExtension(file.url, `documento_${index + 1}`)}
                >
                  Descargar
                </Button>
              }
            >
              <p className="text-sm text-gray-600">Public ID: {file.public_id}</p>
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
        width={900}
        bodyStyle={{ padding: '20px', textAlign: 'center' }}
      >
        {selectedImage && (
          <div>
            <img src={selectedImage.url} alt="Vista detallada" className="w-full h-auto rounded-md mb-4 shadow-lg" />
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => downloadFileWithExtension(selectedImage.url, 'imagen_modal')}
              className="mt-2 bg-gradient-to-r from-blue-500 to-blue-700 border-none"
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
