'use client'
import React, { useEffect, useState } from 'react';
import ModalBase from '../../../../components/templates/ModalBase/index';
import { useTranslations } from 'next-intl';
import CursosService from '../../../../services/umgService';
import NewsCategoryService from '../../../../services/umgService/collabAdmin/categories/newsCategoryService';
import PostsService from '../../../../services/umgService/collabAdmin/posts/postsService';
import { notification } from 'antd';
import { EyeOutlined, DeleteOutlined, LeftOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons';
import { FaHandsHelping, FaLightbulb } from 'react-icons/fa';
import { Categoria } from '../../../../models/categorias/Events';
import {  Cursos, Tema } from '../../../../models/interface/Cursos'

const eventsCategoryService = new NewsCategoryService();

interface Props {
  onClose: () => void;
  fetchPosts: () => void;
}

const CreatePostModal: React.FC<Props> = ({ onClose, fetchPosts }) => {
  const t = useTranslations('general');
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const cursosService = new CursosService(); // Servicio de cursos
  const [cursos, setCursos] = useState<Cursos[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]); // Categorías de eventos
  const [imagenes, setImagenes] = useState<FileList | null>(null);
  const [archivos, setArchivos] = useState<FileList | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [previewDocs, setPreviewDocs] = useState<string[]>([]);
  const [imageIndex, setImageIndex] = useState(0); // Carrusel de imágenes
  const [docIndex, setDocIndex] = useState(0); // Carrusel de documentos
  const [isLoading, setIsLoading] = useState(false);
  const [errorHora, setErrorHora] = useState(false);
  const [temaSeleccionado, setTemaSeleccionado] = useState('');
  const [temas, setTemas] = useState<Tema[]>([]);
  const [temasCurso, setTemasCurso] = useState<string>('');


  const postsService = new PostsService();


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await eventsCategoryService.getNewsCategory();
        const categoriasActivas = response.data.filter(
          (categoria: Categoria) => categoria.estado.toLowerCase() === 'activo'
        ); // Filtrar solo las categorías activas
        setCategorias(categoriasActivas);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const result = await cursosService.cursosService.getCursos();
        if (result && Array.isArray(result)) {
          setCursos(result); // Guardar los cursos en el estado
        } else {
          console.error('Formato de respuesta inesperado:', result);
        }
      } catch (error) {
        console.error('Error al obtener cursos:', error);
      }
    };
    fetchCursos();
  }, []);

  const handleCursoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cursoSeleccionado = cursos.find(curso => curso.nombre === e.target.value);
    setNombreCurso(e.target.value);
  
    if (cursoSeleccionado) {
      setTemas(cursoSeleccionado.temas); // Carga los temas del curso seleccionado
    } else {
      setTemas([]); // Limpia los temas si no hay curso seleccionado
    }
  };
  

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

  const handleFechaEventoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const hour = selectedDate.getHours();
  
    // Validar que la hora esté entre 6 AM y 11 PM
    if (hour < 6 || hour >= 23) {
      setErrorHora(true);
      setFechaEvento(''); // Limpiar la selección si no es válida
    } else {
      setErrorHora(false);
      setFechaEvento(e.target.value); // Solo actualizar si es válido
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
      formData.append('tema', temaSeleccionado || ''); // Cambia aquí de 'contenido' a 'tema'
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

      // Espera la respuesta del servicio.
      const response = await postsService.createPosts(formData);
setIsModalOpen(false);
      // Verifica si la respuesta fue exitosa.
      if (response.status === 201) {
        notification.success({
          message: 'Post creado exitosamente',
          description: 'El post ha sido creado y subido con éxito',
        });

        fetchPosts(); // Actualiza la lista de posts.
         // Cierra el modal.
      } else {
        throw new Error('Error al crear el post'); // Forzamos error si no es 201.
      }
    } catch (error) {
     //notification.error({
     //   message: 'Error al crear el post',
       // description: error || 'Hubo un error al crear el post. Intenta nuevamente.',
 //     });
    } finally {
      setIsLoading(false);
    }
};


  return (
    <>
    <div className='flex justify-end'>
      <button
        onClick={handleOpenModal}
        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transform transition-transform hover:scale-105"
      >
        <PlusOutlined /> Crear Eventos
      </button>
    </div>
      {isModalOpen && (
    <ModalBase onClose={handleCloseModal} title={t('create_events')} width={800} className="bg-gradient-to-b from-white to-gray-100 rounded-lg shadow-xl p-6">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-5 gap-4">
          <div className="mb-4 col-span-1">
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="mt-1 block w-full  border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500 transition-transform transform hover:scale-105"
              placeholder="Título del post"
            />
          </div>

          <div className="mb-4 col-span-1">
            <label htmlFor="tipo_post" className="block text-sm font-medium text-gray-700">Tipo de evento</label>
            <select
              id="tipo_post"
              value={tipoPost}
              onChange={(e) => setTipoPost(e.target.value)}
              className="mt-1 block w-full  border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500 transition-transform transform hover:scale-105"
            >
              <option value="conferencias">Conferencias</option>
              <option value="talleres">Talleres</option>
              <option value="concursos">Concursos</option>
              <option value="feria">Feria</option>
              <option value="exposiciones">Exposiciones</option>
              <option value="jornada">Jornada</option>
              <option value="actividades">Actividades</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div className="mb-4 col-span-1">
            <label htmlFor="nombre_curso" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="nombre_curso"
              type="text"
              value={nombreCurso}
              onChange={(e) => setNombreCurso(e.target.value)}
              required
              className="mt-1 block w-full border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500 transition-transform transform hover:scale-105"
              placeholder="Escribe el nombre"
            />
          </div>


          <div className="mb-4 col-span-1">
            <label htmlFor="contenido" className="block text-sm font-medium text-gray-700">
              Contenido (Tema)
            </label>
            <input
              id="contenido"
              type="text"
              value={temaSeleccionado}
              onChange={(e) => setTemaSeleccionado(e.target.value)}
              required
              className="mt-1 block w-full border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500 transition-transform transform hover:scale-105"
              placeholder="Escribe el contenido o tema"
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
              className="mt-1 block w-full  border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500 transition-transform transform hover:scale-105"
              placeholder="Descripción breve del post"
            />
          </div>

          <div className="mb-4 col-span-1">
            <label htmlFor="fecha_evento" className="block text-sm font-medium text-gray-700">
              Fecha del evento
            </label>
            <input
              id="fecha_evento"
              type="datetime-local"
              value={fechaEvento}
              onChange={handleFechaEventoChange}
              min={new Date().toISOString().slice(0, 16)} // Fecha mínima: ahora mismo
              required
              className={`mt-1 block w-full  border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500 transition-transform transform hover:scale-105 ${
                errorHora ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errorHora && (
              <p className="text-red-500 text-sm mt-1">
                Por favor selecciona una hora entre 6:00 AM y 11:00 PM.
              </p>
            )}
          </div>



          <div className="mb-4 col-span-1">
            <label htmlFor="ubicacion_evento" className="block text-sm font-medium text-gray-700">Ubicación del evento</label>
            <input
              id="ubicacion_evento"
              type="text"
              value={ubicacionEvento}
              onChange={(e) => setUbicacionEvento(e.target.value)}
              required
              className="mt-1 block w-full  border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500 transition-transform transform hover:scale-105"
              placeholder="Ubicación del evento"
            />
          </div>
          <div className="mb-4 col-span-1">
  <label htmlFor="prioridad" className="block text-sm font-medium text-gray-700">Prioridad</label>
  <input
    id="prioridad"
    type="number" // Cambia el tipo a number
    value={prioridad}
    onChange={(e) => setPrioridad(parseInt(e.target.value) )} // Cambia a `setPrioridad`
    required
    className="mt-1 block w-full  border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500 transition-transform transform hover:scale-105"
    placeholder="Prioridad del evento"
  />
</div>

          <div className="mb-4 col-span-1">
            <label htmlFor="ubicacion_detallada" className="block text-sm font-medium text-gray-700">Ubicación detallada</label>
            <input
              id="ubicacion_detallada"
              type="text"
              value={ubicacionDetallada}
              onChange={(e) => setUbicacionDetallada(e.target.value)}
              className="mt-1 block w-full  border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500 transition-transform transform hover:scale-105"
              placeholder="Ubicación detallada"
            />
          </div>

          <div className="mb-4 col-span-1">
            <label htmlFor="tipo_contenido" className="block text-sm font-medium text-gray-700">
              Tipo de contenido
            </label>
            <select
              id="tipo_contenido"
              value={tipoContenido}
              onChange={(e) => setTipoContenido(e.target.value)}
              className="mt-1 block w-full  border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500 transition-transform transform hover:scale-105"
            >
              <option value="">Selecciona un tipo de contenido</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.alias}>
                  {categoria.alias}
                </option>
              ))}
            </select>
          </div>


          <div className="mb-4 col-span-1">
            <label htmlFor="url_externa" className="block text-sm font-medium text-gray-700">URL externa</label>
            <input
              id="url_externa"
              type="text"
              value={urlExterna}
              onChange={(e) => setUrlExterna(e.target.value)}
              className="mt-1 block w-full  border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500 transition-transform transform hover:scale-105"
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
              className="mt-1 block w-full  border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500 transition-transform transform hover:scale-105"
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
              className="mt-1 block w-full  border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 focus:ring-green-500 transition-transform transform hover:scale-105"
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
            type='button'
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:ring focus:ring-opacity-50 focus:ring-red-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleCloseModal}
          >
            Cancelar
          </button>
          <div className='ml-4'>
          <button
            type="submit"
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:ring focus:ring-opacity-50 focus:ring-green-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Creando...' : 'Crear Post'}
          </button>
          </div> 
        </div>
        
      </form>
    </ModalBase>
    )}
<div className="flex flex-col items-center justify-center mt-8 p-4">
  <h2 className="text-2xl font-semibold text-gray-800 flex items-center transition-transform transform hover:scale-105">
    ¿Qué publicaremos hoy?
  </h2>
  <p className="text-gray-600  text-center mt-2 flex items-center transition-transform transform hover:scale-105">
    Comparte tus ideas, eventos o noticias con toda la comunidad.
  </p>
  <img 
    src="/posts.jpeg" 
    alt="Crea tu post" 
    className="max-w-md w-full h-auto rounded-lg shadow-lg transform transition duration-500 hover:scale-105 mt-4"
  />
</div>

<div className="mt-10 p-6 rounded-lg shadow-lg bg-gradient-to-r from-gray-100 to-gray-200">
  <h3 className="text-lg font-semibold text-gray-800 mb-4">
    ¿Tienes algo en mente?
  </h3>
  <ul className="list-none space-y-4 text-gray-700">
    <li className="flex items-center transition-transform transform hover:scale-105">
      <FaLightbulb className="text-yellow-500 mr-2" />
      Comparte tus ideas con todos.
    </li>
    <li className="flex items-center transition-transform transform hover:scale-105">
      <FaHandsHelping className="text-green-500 mr-2" />
      Aporta contenido que inspire a otros.
    </li>
    <li className="flex items-center transition-transform transform hover:scale-105">
      <FaHandsHelping className="text-green-500 mr-2" />
      Pon tu granito de arena aportando conocimiento.
    </li>
  </ul>
</div>

<div className="mt-10 text-center">
  <p className="text-gray-500 italic transition-colors  transform hover:scale-105">
    "Cada aporte cuenta. Crecemos todos juntos con tus ideas."
  </p>
  <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-colors  transform hover:scale-105"
  onClick={handleOpenModal}
  >
    Crea un nuevo post
  </button>
</div>
<div className='mt-10'>

</div>
    </>
  );
};

export default CreatePostModal;

