// src/app/admin/views/viewPost/[id]/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import approvedPostsService from '../../../../../services/umgService/collabAdmin/posts/approved/postsApprovedService';
import { Card, Col, Row, Typography, Divider, Tag, Space, Modal, Button, Tooltip } from 'antd';
import { useParams } from 'next/navigation';
import { CheckCircleOutlined, ClockCircleOutlined, DownloadOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const downloadFileWithExtension = async (url, defaultName) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('Content-Type');

    const mimeToExtension = {
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'application/pdf': '.pdf',
      'application/msword': '.doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    };

    const extension = mimeToExtension[contentType] || '';
    const fileName = `${defaultName}${extension}`;

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error al obtener la extensión del archivo:', error);
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
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

  const showModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedImageIndex(0);
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? postDetails.imagenes.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === postDetails.imagenes.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!postDetails) {
    return <p className="text-center mt-10 text-lg font-semibold">Cargando...</p>;
  }

  return (
    <div className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl">
      <Title level={2} className="text-center text-blue-700 font-extrabold mb-6">
        {postDetails.titulo}
      </Title>
      <Divider className="border-t-2 border-blue-300 mb-6" />
      <Row justify="center">
        <Col span={22}>
          <Space direction="vertical" size="large" className="w-full bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <Paragraph className="text-lg font-medium text-gray-700">
              <strong>Contenido:</strong> {postDetails.contenido}
            </Paragraph>
            <Paragraph className="text-lg font-medium text-gray-700">
              <strong>Estado:</strong>{' '}
              <Tag color={postDetails.estado === 'aprobado' ? 'green' : 'orange'} className="rounded-full px-4 py-1 text-lg">
                {postDetails.estado === 'aprobado' ? (
                  <Tooltip title="Este post está aprobado">
                    <CheckCircleOutlined /> Aprobado
                  </Tooltip>
                ) : (
                  <Tooltip title="Este post está pendiente">
                    <ClockCircleOutlined /> Pendiente
                  </Tooltip>
                )}
              </Tag>
            </Paragraph>
            <Paragraph className="text-lg font-medium text-gray-700">
              <strong>Fecha de Evento:</strong>{' '}
              {new Date(postDetails.fecha_evento).toLocaleString('es-ES', {
                dateStyle: 'full',
                timeStyle: 'short',
              })}
            </Paragraph>
            <Paragraph className="text-lg font-medium text-gray-700">
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
                  className="object-cover h-64 w-full cursor-pointer transition-transform duration-200 hover:opacity-90"
                  onClick={() => showModal(index)}
                />
              }
            >
              <Card.Meta title={`Imagen ${index + 1}`} className="text-center text-gray-800 font-semibold" />
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                className="mt-2 w-full bg-gradient-to-r from-green-400 to-green-600 text-white border-none hover:from-green-500 hover:to-green-700"
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
              className="shadow-lg transition-transform transform hover:scale-105 rounded-2xl overflow-hidden border border-gray-200 bg-gradient-to-r from-white to-blue-50"
              title={
                <span className="font-semibold text-lg text-blue-800">
                  Documento {index + 1}
                </span>
              }
              extra={
                <Tooltip title="Descargar archivo">
                  <Button
                    type="link"
                    icon={<DownloadOutlined />}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    onClick={() => downloadFileWithExtension(file.url, `documento_${index + 1}`)}
                  >
                    Descargar
                  </Button>
                </Tooltip>
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
        {postDetails.imagenes[selectedImageIndex] && (
          <div className="relative">
            <img
              src={postDetails.imagenes[selectedImageIndex].url}
              alt={`Imagen ${selectedImageIndex + 1}`}
              className="w-full h-auto rounded-md mb-4 shadow-lg"
            />
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => downloadFileWithExtension(postDetails.imagenes[selectedImageIndex].url, `imagen_${selectedImageIndex + 1}`)}
              className="mt-2 bg-gradient-to-r from-blue-500 to-blue-700 border-none text-white"
            >
              Descargar
            </Button>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={handlePreviousImage}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white hover:bg-gray-700"
            />
            <Button
              type="link"
              icon={<RightOutlined />}
              onClick={handleNextImage}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white hover:bg-gray-700"
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ApprovedPostDetails;
