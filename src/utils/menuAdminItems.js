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
  IdcardOutlined,
  QuestionCircleOutlined 
} from '@ant-design/icons';

const menuItems = [
  {
    key: '/admin/dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: 'Pemsun',
    icon: <ReadOutlined />, // Icono de libro para representar cursos y temas
    label: 'Pensum',
    children: [
      {
        key: '/admin/cursos',
        label: 'Cursos',
      },
      {
        key: '/admin/topics',
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
        key: '/admin/pending/postspendient',
        label: 'Post Pendientes',
      },
      {
        key: '/admin/post',
        label: 'Publicar Post',
      },
      {
        key: '/admin/post/news',
        label: 'Noticias',
      },
      {
        key: '/admin/post/news',
        label: 'Publicar Noticias',
      },
      {
        key: '/admin/noticias/pendientes',
        label: 'Noticias Pendientes',
      },
      {
        key: '/admin/publicar/eventos',
        label: 'Eventos',
      },
      {
        key: '/admin/post/events',
        label: 'Publicar Eventos',
      },
      {
        key: '/admin/eventos/pendientes',
        label: 'Eventos Pendientes',
      },
    ],
  },
  {
    key: '/admin/categories',
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
    key: '/admin/profesor',
    icon: <TeamOutlined />, // Icono para representar el equipo o catedráticos
    label: 'Equipo',
    children: [
      {
        key: '/admin/profesor',
        label: 'Catedráticos',
      }
    ],
  },
  {
    key: '/admin/students',
    icon: <UsergroupAddOutlined />, // Icono de grupo para representar estudiantes
    label: 'Estudiantes',
    children: [
      {
        key: '/admin/students',
        label: 'Lista de Estudiantes',
      },
    ],
  },

  {
    key: '/admin/visitas',
    icon: <BarChartOutlined />, // Icono para estadísticas o visitas de la página
    label: 'Visitas Página',
  },
 /* {
    key: '/admin/permisos',
    icon: <IdcardOutlined />, // Icono de grupo para representar estudiantes
    label: 'Roles Y Permisos',
    children: [
      {
        key: '/admin/user',
        label: 'Usuarios',
      },
      {
        key: '/admin/rol',
        label: 'Roles',
      },
      {
        key: '/admin/permisos',
        label: 'Permisos',
      },
    ],
  },*/
    {
    key: '/admin/settings',
    icon: <SettingOutlined />,
    label: 'Configuración',
  },
  {
    key: '/admin/about',
    icon: <QuestionCircleOutlined />, 
    label: 'acerca de',
  },
];

export default menuItems;
