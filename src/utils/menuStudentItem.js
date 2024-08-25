import {
    FileTextOutlined,
    SettingOutlined,
    ReadOutlined,
    QuestionCircleOutlined,
  } from '@ant-design/icons';
  
  const menuItems = [
    {
      key: 'Cursos',
      icon: <ReadOutlined />, // Icono de libro para representar cursos y temas
      label: 'Cursos',
      children: [
        {
            key: '/admin/miscursos',
            label: 'Cursos Asignados',
          },
      ],
    },
    {
      key: '/admin/post',
      icon: <FileTextOutlined />, // Icono para representar publicaciones o posts
      label: 'Post',
      children: [
        {
          key: '/admin/post/mis-posts',
          label: 'Mis Post',
        },
        {
          key: '/admin/post/visibles',
          label: 'Post Visibles',
        },
        {
          key: '/admin/publicar/post',
          label: 'Publicar Post',
        },
        {
          key: '/admin/publicar/noticias',
          label: 'Noticias',
        },
        {
          key: '/admin/publicar/eventos',
          label: 'Eventos',
        },
      ],
    },
    {
        key: '/admin/about',
        icon: <ReadOutlined/>, 
        label: 'Pensum',
      },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />, // Icono de configuración
      label: 'Configuración',
    },
      {
        key: '/admin/about',
        icon: <QuestionCircleOutlined />, 
        label: 'acerca de',
      },
  ];
  
  export default menuItems;
  