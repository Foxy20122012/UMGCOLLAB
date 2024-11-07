// src/app/admin/views/viewPost/page.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { useRouter } from 'next/navigation';
import approvedPostsService from '../../../../services/umgService/collabAdmin/posts/approved/postsApprovedService';

const ViewPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchApprovedPosts = async () => {
      try {
        const service = new approvedPostsService();
        const response = await service.getPostsApproved();
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching approved posts:', error);
      }
    };

    fetchApprovedPosts();
  }, []);

  const handleCardClick = (id) => {
    router.push(`/admin/views/viewPost/${id}`);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <Card
          key={post.id}
          title={post.titulo}
          bordered={true}
          hoverable
          onClick={() => handleCardClick(post.id)}
        >
          <p><strong>Contenido:</strong> {post.contenido}</p>
          <p><strong>Estado:</strong> {post.estado}</p>
          <p><strong>Fecha de Evento:</strong> {new Date(post.fecha_evento).toLocaleDateString()}</p>
          <p><strong>Ubicación:</strong> {post.ubicacion_evento}</p>
        </Card>
      ))}
    </div>
  );
};

export default ViewPostsPage;
