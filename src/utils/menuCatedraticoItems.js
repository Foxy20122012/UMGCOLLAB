import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DashboardOutlined,
    BookOutlined,
    TeamOutlined,
    FileTextOutlined,
    SettingOutlined,
    ReadOutlined,
    TagsOutlined,
    UsergroupAddOutlined,
    UserOutlined,
    BarChartOutlined,
    QuestionCircleOutlined,
  } from '@ant-design/icons';
  
  const menuItems = [
    {
      key: '/admin/pensum',
      icon: <ReadOutlined />, // Icono de libro para representar cursos y temas
      label: 'Pensum',
      children: [
        {
          key: '/admin/cursos',
          label: 'Cursos',
        },
        {
          key: '/admin/pensum/topics',
          label: 'Temas Cursos',
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
          key: '/admin/publicar/noticias',
          label: 'Publicar Noticias',
        },
        {
          key: '/admin/publicar/eventos',
          label: 'Eventos',
        },
        {
          key: '/admin/publicar/eventos',
          label: 'Publicar Eventos',
        },
      ],
    },
    {
      key: '/admin/categorias',
      icon: <TagsOutlined />, // Icono de etiquetas para representar categorías
      label: 'Categorias',
      children: [
        {
          key: '/admin/categories/post',
          label: 'Categorias Post',
        },
        {
          key: '/admin/categories/news',
          label: 'Categoria Noticias',
        },
        {
          key: '/admin/categories/events',
          label: 'Categoria Eventos',
        },
      ],
    },
    {
      key: '/admin/estudiantes',
      icon: <UsergroupAddOutlined />, // Icono de grupo para representar estudiantes
      label: 'Estudiantes',
      children: [
        {
          key: '/admin/estudiantes/lista',
          label: 'Lista de Estudiantes',
        },
        {
          key: '/admin/estudiantes/cursos',
          label: 'Cursos Estudiantes',
        },
      ],
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
  