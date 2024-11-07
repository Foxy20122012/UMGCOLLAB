// src/app/admin/views/viewPost/[id].jsx
'use client';

import React, { useEffect, useState } from 'react';
import approvedPostsService from '../../../../../services/umgService/collabAdmin/posts/approved/postsApprovedService';
import { Card, Col, Row, Typography } from 'antd';
import { useParams } from 'next/navigation';

const { Title, Paragraph } = Typography;

const ApprovedPostDetails = () => {
  const [postDetails, setPostDetails] = useState(null);
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

  if (!postDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <Title level={2}>{postDetails.titulo}</Title>
      <Paragraph><strong>Contenido:</strong> {postDetails.contenido}</Paragraph>
      <Paragraph><strong>Estado:</strong> {postDetails.estado}</Paragraph>
      <Paragraph><strong>Fecha de Evento:</strong> {new Date(postDetails.fecha_evento).toLocaleString()}</Paragraph>
      <Paragraph><strong>Ubicación del Evento:</strong> {postDetails.ubicacion_evento}</Paragraph>

      <Title level={4} className="mt-6">Imágenes</Title>
      <Row gutter={[16, 16]}>
        {postDetails.imagenes.map((img, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={<img alt={`Imagen ${index + 1}`} src={img.url} />}
            >
              <Card.Meta title={`Imagen ${index + 1}`} />
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={4} className="mt-6">Documentos</Title>
      <Row gutter={[16, 16]}>
        {postDetails.archivos_adjuntos.map((file, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card
              hoverable
              title={`Documento ${index + 1}`}
              extra={<a href={file.url} target="_blank" rel="noopener noreferrer">Ver</a>}
            >
              <p>Public ID: {file.public_id}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ApprovedPostDetails;
