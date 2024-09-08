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
        key: '/admin/post/pendientes',
        label: 'Post Pendientes',
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
        key: '/admin/noticias/pendientes',
        label: 'Noticias Pendientes',
      },
      {
        key: '/admin/publicar/eventos',
        label: 'Eventos',
      },
      {
        key: '/admin/publicar/eventos',
        label: 'Publicar Eventos',
      },
      {
        key: '/admin/eventos/pendientes',
        label: 'Eventos Pendientes',
      },
    ],
  },
  {
    key: '/admin/categorias',
    icon: <TagsOutlined />, // Icono de etiquetas para representar categorías
    label: 'Categorias',
    children: [
      {
        key: '/admin/categorias/post',
        label: 'Categorias Post',
      },
      {
        key: '/admin/categorias/noticias',
        label: 'Categoria Noticias',
      },
      {
        key: '/admin/categorias/eventos',
        label: 'Categoria Eventos',
      },
    ],
  },
  {
    key: '/admin/team',
    icon: <TeamOutlined />, // Icono para representar el equipo o catedráticos
    label: 'Equipo',
    children: [
      {
        key: '/admin/team/catedraticos',
        label: 'Catedráticos',
      },
      {
        key: '/admin/team/catedraticos-cursos',
        label: 'Catedrático Cursos',
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
    key: '/admin/visitas',
    icon: <BarChartOutlined />, // Icono para estadísticas o visitas de la página
    label: 'Visitas Página',
  },
  {
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
  },
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
