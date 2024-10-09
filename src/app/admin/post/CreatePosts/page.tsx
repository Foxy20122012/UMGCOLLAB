'use client'
import React, { useState } from 'react';
import ModalBase from '../../../../components/templates/ModalBase/index';
import { useTranslations } from 'next-intl';
import PostsService from '../../../../services/umgService/collabAdmin/posts/postsService'; // Servicio para los posts
import { notification } from 'antd';

interface Props {
  onClose: () => void;
  fetchPosts: () => void;
}

const CreatePostsModal: React.FC<Props> = ({ onClose, fetchPosts }) => {
  const t = useTranslations('general');
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaEvento, setFechaEvento] = useState('');
  const [ubicacionEvento, setUbicacionEvento] = useState('');
  const [prioridad, setPrioridad] = useState(1); 
  const [nombreCurso, setNombreCurso] = useState('');
  const [tipoPost, setTipoPost] = useState('evento');
  const [estado, setEstado] = useState('pendiente');
  const [imagenes, setImagenes] = useState<FileList | null>(null);
  const [archivos, setArchivos] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const postsService = new PostsService(); // Servicio para manejar los posts

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Preparar los datos que se enviarán en la solicitud
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('contenido', contenido);
      formData.append('descripcion', descripcion);
      formData.append('fecha_evento', fechaEvento);
      formData.append('ubicacion_evento', ubicacionEvento);
      formData.append('prioridad', prioridad.toString());
      formData.append('nombre_curso', nombreCurso);
      formData.append('tipo_post', tipoPost);
      formData.append('estado', estado);

      if (imagenes) {
        for (let i = 0; i < imagenes.length; i++) {
          formData.append('imagenes', imagenes[i]);
        }
      }

      if (archivos) {
        for (let i = 0; i < archivos.length; i++) {
          formData.append('archivos', archivos[i]);
        }
      }

      await postsService.createPosts(formData);

      notification.success({
        message: 'Post creado exitosamente',
        description: 'El post ha sido creado y subido con éxito',
      });

      fetchPosts(); // Actualizar la lista de posts
      onClose(); // Cerrar el modal
    } catch (error) {
      notification.error({
        message: 'Error al crear el post',
        description: 'Hubo un error al crear el post. Intenta nuevamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalBase onClose={onClose} title={t('create_post')} width={800} className="bg-white rounded-lg shadow-xl">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Título del post"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contenido" className="block text-sm font-medium text-gray-700">Contenido</label>
          <textarea
            id="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Contenido del post"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
          <input
            id="descripcion"
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Descripción breve del post"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fecha_evento" className="block text-sm font-medium text-gray-700">Fecha del evento</label>
          <input
            id="fecha_evento"
            type="datetime-local"
            value={fechaEvento}
            onChange={(e) => setFechaEvento(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ubicacion_evento" className="block text-sm font-medium text-gray-700">Ubicación del evento</label>
          <input
            id="ubicacion_evento"
            type="text"
            value={ubicacionEvento}
            onChange={(e) => setUbicacionEvento(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Ubicación del evento"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700">Prioridad</label>
          <input
            id="prioridad"
            type="number"
            value={prioridad}
            onChange={(e) => setPrioridad(parseInt(e.target.value))}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="nombre_curso" className="block text-sm font-medium text-gray-700">Nombre del curso</label>
          <input
            id="nombre_curso"
            type="text"
            value={nombreCurso}
            onChange={(e) => setNombreCurso(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Nombre del curso"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700">Imágenes</label>
          <input
            id="imagenes"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImagenes(e.target.files)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="archivos" className="block text-sm font-medium text-gray-700">Archivos adjuntos</label>
          <input
            id="archivos"
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={(e) => setArchivos(e.target.files)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring focus:ring-opacity-50 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Creando...' : 'Crear Post'}
          </button>
        </div>
      </form>
    </ModalBase>
  );
};

export default CreatePostsModal;
