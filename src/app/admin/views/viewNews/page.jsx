// src/app/admin/views/viewPost/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Tag, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import approvedNewsService from '../../../../services/umgService/collabAdmin/posts/approved/newsApprovedService';
import { CalendarOutlined, EnvironmentOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const ViewPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchApprovedPosts = async () => {
      try {
        const service = new approvedNewsService();
        const response = await service.getPostsApproved();
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching approved posts:', error);
      }
    };

    fetchApprovedPosts();
  }, []);

  const handleCardClick = (id) => {
    router.push(`/admin/views/viewNews/${id}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Row gutter={[24, 24]}>
        {posts.map((post) => (
          <Col key={post.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              className="hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 rounded-xl overflow-hidden border border-gray-200"
              hoverable
              onClick={() => handleCardClick(post.id)}
              cover={
                <div
                  className={`h-52 rounded-t-xl`}
                  style={{
                    backgroundImage: post.imagenes && post.imagenes.length > 0
                      ? `url(${post.imagenes[0].url})`
                      : 'linear-gradient(to right, #4f46e5, #3b82f6)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              }
            >
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3 truncate">
                  {post.titulo}
                </h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  <strong>Contenido:</strong> {post.contenido.length > 70 ? `${post.contenido.substring(0, 70)}...` : post.contenido}
                </p>
                <div className="flex items-center mb-3">
                  <strong className="mr-1">Estado:</strong>
                  {post.estado === 'aprobado' ? (
                    <Tag color="green" className="rounded-md">
                      <CheckCircleOutlined /> Aprobado
                    </Tag>
                  ) : (
                    <Tag color="orange" className="rounded-md">
                      <ClockCircleOutlined /> Pendiente
                    </Tag>
                  )}
                </div>
                <Tooltip title="Fecha del evento">
                  <p className="text-gray-600 flex items-center mb-2">
                    <CalendarOutlined className="mr-1" />
                    {new Date(post.fecha_actualizacion).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </Tooltip>
                <Tooltip title="Tipo de contenido">
                  <p className="text-gray-600 flex items-center">
                    <EnvironmentOutlined className="mr-1" />
                    {post.tipo_contenido}
                  </p>
                </Tooltip>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ViewPostsPage;
