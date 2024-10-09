'use client';

import React, { useState } from 'react';
import { Card, Button, Tooltip, Divider, Avatar, Image, Carousel } from 'antd';
import { FaFilePdf, FaFileWord } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';
import { EyeOutlined, HeartOutlined, MessageOutlined } from '@ant-design/icons';

// Mock data with 5 images
const mockPosts = [
  {
    id: 1,
    titulo: "Evento: Desarrollo Web",
    contenido: "Aprende sobre las últimas tecnologías de desarrollo web...",
    estado: "Publicado",
    visible: true,
    fecha_creacion: "2024-09-20",
    autor_nombre: "Enrique Merlos",
    tipo_post: "evento",
    descripcion: "Una inmersión profunda en tecnologías web modernas.",
    fecha_evento: "2024-09-25",
    ubicacion_evento: "Online",
    prioridad: 2,
    imagenes: [
      "https://media.licdn.com/dms/image/v2/D4D22AQH-58pumGLyyA/feedshare-shrink_1280/feedshare-shrink_1280/0/1726615065019?e=1729728000&v=beta&t=2dWaEKcAax7sxr9Gav5ujC-0L95g5nEBUB1CZYlZGUI",
      "https://media.licdn.com/dms/image/v2/D4D22AQH-58pumGLyyA/feedshare-shrink_1280/feedshare-shrink_1280/0/1726615065019?e=1729728000&v=beta&t=2dWaEKcAax7sxr9Gav5ujC-0L95g5nEBUB1CZYlZGUI",
      "https://media.licdn.com/dms/image/v2/D4D22AQH-58pumGLyyA/feedshare-shrink_1280/feedshare-shrink_1280/0/1726615065019?e=1729728000&v=beta&t=2dWaEKcAax7sxr9Gav5ujC-0L95g5nEBUB1CZYlZGUI",
      "https://media.licdn.com/dms/image/v2/D4D22AQH-58pumGLyyA/feedshare-shrink_1280/feedshare-shrink_1280/0/1726615065019?e=1729728000&v=beta&t=2dWaEKcAax7sxr9Gav5ujC-0L95g5nEBUB1CZYlZGUI",
      "https://media.licdn.com/dms/image/v2/D4D22AQH-58pumGLyyA/feedshare-shrink_1280/feedshare-shrink_1280/0/1726615065019?e=1729728000&v=beta&t=2dWaEKcAax7sxr9Gav5ujC-0L95g5nEBUB1CZYlZGUI",
    ],
    archivos_adjuntos: [
      {
        tipo: "pdf",
        url: "https://example.com/files/file1.pdf",
      },
      {
        tipo: "word",
        url: "https://example.com/files/file2.docx",
      },
    ],
    publicado: true,
  },
];

const PostsPage = () => {
  const [posts] = useState(mockPosts);

  const renderImages = (imagenes) => (
    <Carousel autoplay dotPosition="bottom">
      {imagenes.map((img, idx) => (
        <div key={idx} className="relative">
          <Image
            src={img}
            alt={`Imagen ${idx + 1}`}
            className="rounded-lg shadow-lg object-cover"
            preview={false} // Si no deseas habilitar el preview de Ant Design
            style={{ width: '100%', height: '300px', objectFit: 'cover' }} // Ajusta el tamaño y aspecto de las imágenes
          />
        </div>
      ))}
    </Carousel>
  );

  const renderAttachments = (archivos_adjuntos) => (
    <div className="flex gap-4 mt-2">
      {archivos_adjuntos.map((archivo, idx) => (
        <Button
          key={idx}
          icon={archivo.tipo === 'pdf' ? <FaFilePdf /> : <FaFileWord />}
          href={archivo.url}
          target="_blank"
          className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg p-2 shadow"
        >
          <FiDownload className="mr-2" /> Descargar {archivo.tipo.toUpperCase()}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-center text-4xl font-bold mb-10 text-gray-800">Eventos y Publicaciones</h2>
      <div className="max-w-4xl w-full">
        {posts.map((post) => (
          <Card
            key={post.id}
            title={<span className="text-2xl font-semibold text-gray-800">{post.titulo}</span>}
            className="rounded-lg shadow-lg bg-white overflow-hidden transition-transform transform hover:scale-105"
            cover={renderImages(post.imagenes)}
            actions={[
              <Tooltip title="Ver">
                <EyeOutlined className="text-2xl hover:text-blue-600" />
              </Tooltip>,
              <Tooltip title="Me gusta">
                <HeartOutlined className="text-2xl hover:text-red-600" />
              </Tooltip>,
              <Tooltip title="Comentarios">
                <MessageOutlined className="text-2xl hover:text-gray-600" />
              </Tooltip>,
            ]}
          >
            <p className="text-gray-600 mb-2">{post.descripcion}</p>
            <p className="text-sm text-gray-500">
              <b>Autor:</b> {post.autor_nombre}
            </p>
            {post.tipo_post === 'evento' && (
              <>
                <p className="text-sm text-gray-500">
                  <MdLocationOn className="mr-1" /> {post.ubicacion_evento} • {post.fecha_evento}
                </p>
              </>
            )}

            {renderAttachments(post.archivos_adjuntos)}

            <Divider />

            <div className="flex justify-between text-sm text-gray-500">
              <div>
                <b>Prioridad:</b> {post.prioridad}
              </div>
              <div>
                <b>Publicado:</b> {post.publicado ? 'Sí' : 'No'}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
