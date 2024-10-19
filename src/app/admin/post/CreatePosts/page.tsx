'use client'
import React, { useState } from 'react';
import ModalBase from '../../../../components/templates/ModalBase/index';
import { useTranslations } from 'next-intl';
import PostsService from '../../../../services/umgService/collabAdmin/posts/postsService';
import { notification } from 'antd';
import { EyeOutlined, DeleteOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

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
  const [ubicacionDetallada, setUbicacionDetallada] = useState('');
  const [urlExterna, setUrlExterna] = useState('');
  const [tipoContenido, setTipoContenido] = useState('');
  const [imagenes, setImagenes] = useState<FileList | null>(null);
  const [archivos, setArchivos] = useState<FileList | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [previewDocs, setPreviewDocs] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0); // Carrusel de imágenes
  const [docIndex, setDocIndex] = useState(0); // Carrusel de documentos
  const [isLoading, setIsLoading] = useState(false);

  const postsService = new PostsService();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImagenes(files);
      const previews = Array.from(files).map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
        });
      });

      Promise.all(previews).then(setPreviewImages);
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setArchivos(files);
      const docsPreview = Array.from(files).map((file) => file.name);
      setPreviewDocs(docsPreview);
    }
  };

  const handleRemoveImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveDocument = (index: number) => {
    setPreviewDocs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImagePreview = (src: string) => {
    window.open(src, '_blank');
  };

  // Funciones para el carrusel de imágenes
  const nextImage = () => setImageIndex((prev) => (prev + 6 >= previewImages.length ? prev : prev + 6));
  const prevImage = () => setImageIndex((prev) => (prev - 6 < 0 ? 0 : prev - 6));

  // Funciones para el carrusel de documentos
  const nextDoc = () => setDocIndex((prev) => (prev + 6 >= previewDocs.length ? prev : prev + 6));
  const prevDoc = () => setDocIndex((prev) => (prev - 6 < 0 ? 0 : prev - 6));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('contenido', contenido);
      formData.append('descripcion', descripcion);
      formData.append('fecha_evento', fechaEvento);
      formData.append('ubicacion_evento', ubicacionEvento);
      formData.append('prioridad', prioridad.toString());
      formData.append('nombre_curso', nombreCurso);
      formData.append('tipo_post', tipoPost);
      formData.append('ubicacion_detallada', ubicacionDetallada);
      formData.append('url_externa', urlExterna);
      formData.append('tipo_contenido', tipoContenido);
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

      fetchPosts();
      onClose();
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
        <div className="grid grid-cols-3 gap-4">
          <div className="mb-4 col-span-1">
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

          <div className="mb-4 col-span-1">
            <label htmlFor="tipo_post" className="block text-sm font-medium text-gray-700">Tipo de post</label>
            <input
              id="tipo_post"
              type="text"
              value={tipoPost}
              onChange={(e) => setTipoPost(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Tipo de post"
            />
          </div>

          <div className="mb-4 col-span-1">
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

          <div className="mb-4 col-span-1">
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

          <div className="mb-4 col-span-1">
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

          <div className="mb-4 col-span-1">
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

          <div className="mb-4 col-span-1">
            <label htmlFor="ubicacion_detallada" className="block text-sm font-medium text-gray-700">Ubicación detallada</label>
            <input
              id="ubicacion_detallada"
              type="text"
              value={ubicacionDetallada}
              onChange={(e) => setUbicacionDetallada(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Ubicación detallada"
            />
          </div>

          <div className="mb-4 col-span-1">
            <label htmlFor="tipo_contenido" className="block text-sm font-medium text-gray-700">Tipo de contenido</label>
            <input
              id="tipo_contenido"
              type="text"
              value={tipoContenido}
              onChange={(e) => setTipoContenido(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Tipo de contenido"
            />
          </div>

          <div className="mb-4 col-span-1">
            <label htmlFor="url_externa" className="block text-sm font-medium text-gray-700">URL externa</label>
            <input
              id="url_externa"
              type="text"
              value={urlExterna}
              onChange={(e) => setUrlExterna(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="URL externa"
            />
          </div>
        </div>

        {/* Preview de imágenes y documentos con carrusel */}
        <div className="mt-6">
          <div className="mb-4">
            <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700">Imágenes</label>
            <input
              id="imagenes"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            <div className="mt-2 flex items-center">
              <button type="button" onClick={prevImage} className="mr-2">
                <LeftOutlined />
              </button>
              <div className="flex overflow-hidden">
                {previewImages.slice(imageIndex, imageIndex + 6).map((src, index) => (
                  <div key={index} className="relative inline-block mr-2">
                    <img
                      src={src}
                      alt={`preview-${index}`}
                      className="h-20 w-20 object-cover cursor-pointer"
                      onClick={() => handleImagePreview(src)}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-white text-red-600 rounded-full p-1"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={nextImage} className="ml-2">
                <RightOutlined />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="archivos" className="block text-sm font-medium text-gray-700">Archivos adjuntos</label>
            <input
              id="archivos"
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleDocumentChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            <div className="mt-2 flex items-center">
              <button type="button" onClick={prevDoc} className="mr-2">
                <LeftOutlined />
              </button>
              <div className="flex overflow-hidden">
                {previewDocs.slice(docIndex, docIndex + 6).map((doc, index) => (
                  <div key={index} className="flex items-center">
                    <p className="text-sm text-gray-500 mr-2">{doc}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveDocument(index)}
                      className="text-red-600"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={nextDoc} className="ml-2">
                <RightOutlined />
              </button>
            </div>
          </div>
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
