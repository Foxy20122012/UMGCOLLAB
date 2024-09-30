'use client';

import React, { useState } from 'react';
import { Card, Button, Tooltip, Divider, Avatar, Image, Carousel } from 'antd';
import { FaFilePdf, FaFileWord, FaImage } from 'react-icons/fa';
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
    descripcion: "Evento sobre desarrollo web moderno",
    fecha_evento: "2024-09-25",
    ubicacion_evento: "Online",
    prioridad: 2,
    imagenes: [
      "https://scontent.fgua9-2.fna.fbcdn.net/v/t39.30808-6/461092538_522791224038144_114793400326669330_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=tHtuv2GOBYwQ7kNvgFhzFQT&_nc_ht=scontent.fgua9-2.fna&_nc_gid=A09upAKgj_icztBmwZOOF06&oh=00_AYD_WUcnrlLINfmFfU5E3pVvRHc2kvLiITCdZHFOtR1Nhg&oe=66F6CBD7",
      "https://scontent.fgua9-2.fna.fbcdn.net/v/t39.30808-6/461092538_522791224038144_114793400326669330_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=tHtuv2GOBYwQ7kNvgFhzFQT&_nc_ht=scontent.fgua9-2.fna&_nc_gid=A09upAKgj_icztBmwZOOF06&oh=00_AYD_WUcnrlLINfmFfU5E3pVvRHc2kvLiITCdZHFOtR1Nhg&oe=66F6CBD7",
      "https://scontent.fgua9-2.fna.fbcdn.net/v/t39.30808-6/461092538_522791224038144_114793400326669330_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=tHtuv2GOBYwQ7kNvgFhzFQT&_nc_ht=scontent.fgua9-2.fna&_nc_gid=A09upAKgj_icztBmwZOOF06&oh=00_AYD_WUcnrlLINfmFfU5E3pVvRHc2kvLiITCdZHFOtR1Nhg&oe=66F6CBD7",
      "https://scontent.fgua9-2.fna.fbcdn.net/v/t39.30808-6/461092538_522791224038144_114793400326669330_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=tHtuv2GOBYwQ7kNvgFhzFQT&_nc_ht=scontent.fgua9-2.fna&_nc_gid=A09upAKgj_icztBmwZOOF06&oh=00_AYD_WUcnrlLINfmFfU5E3pVvRHc2kvLiITCdZHFOtR1Nhg&oe=66F6CBD7",
      "https://scontent.fgua9-2.fna.fbcdn.net/v/t39.30808-6/461092538_522791224038144_114793400326669330_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=tHtuv2GOBYwQ7kNvgFhzFQT&_nc_ht=scontent.fgua9-2.fna&_nc_gid=A09upAKgj_icztBmwZOOF06&oh=00_AYD_WUcnrlLINfmFfU5E3pVvRHc2kvLiITCdZHFOtR1Nhg&oe=66F6CBD7",
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
    <Carousel autoplay>
      {imagenes.map((img, idx) => (
        <div key={idx}>
          <Image src={img} alt={`Imagen ${idx + 1}`} className="rounded-lg shadow-lg" />
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
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">Lista de Posts</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            title={<span className="text-xl font-semibold text-gray-800">{post.titulo}</span>}
            className="rounded-lg shadow-lg bg-white overflow-hidden"
            cover={renderImages(post.imagenes)}
            actions={[
              <Tooltip title="Ver">
                <EyeOutlined className="text-xl hover:text-blue-600" />
              </Tooltip>,
              <Tooltip title="Me gusta">
                <HeartOutlined className="text-xl hover:text-red-600" />
              </Tooltip>,
              <Tooltip title="Comentarios">
                <MessageOutlined className="text-xl hover:text-gray-600" />
              </Tooltip>,
            ]}
          >
            <p className="text-gray-600 mb-2">{post.descripcion}</p>
            <p className="text-sm text-gray-500">
              <b>Autor:</b> {post.autor_nombre}
            </p>
            {post.tipo_post === 'evento' && (
              <>
                <p className="text-sm text-gray-500"><b>Fecha del evento:</b> {post.fecha_evento}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <MdLocationOn className="mr-1" /> {post.ubicacion_evento}
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
