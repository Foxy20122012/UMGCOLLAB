'use client';
import React, { ReactNode, useState } from 'react';
import { Layout, Menu, Dropdown, Button, Switch } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  DownOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

type SidebarProps = {
  children: ReactNode;
};

const menuItems = [
  {
    key: '/admin/dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/admin/users',
    icon: <UserOutlined />,
    label: 'Usuarios',
    children: [
      {
        key: '/admin/users/list',
        label: 'Lista de Usuarios',
      },
      {
        key: '/admin/users/add',
        label: 'Agregar Usuario',
      },
    ],
  },
  {
    key: '/admin/settings',
    icon: <SettingOutlined />,
    label: 'Configuración',
  },
  {
    key: '/admin/team',
    icon: <TeamOutlined />,
    label: 'Equipo',
    children: [
      {
        key: '/admin/team/list',
        label: 'Miembros del Equipo',
      },
      {
        key: '/admin/team/add',
        label: 'Agregar Miembro',
      },
    ],
  },
];

// Opciones desplegables del menú de usuario
const userMenu = (
  <Menu>
    <Menu.Item key="1">
      <a href="/admin/profile">Perfil</a>
    </Menu.Item>
    <Menu.Item key="2">
      <a href="/admin/settings">Configuraciones</a>
    </Menu.Item>
    <Menu.Item key="3">
      <a href="/logout">Cerrar sesión</a>
    </Menu.Item>
  </Menu>
);

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const router = useRouter();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    document.body.style.backgroundColor = darkTheme ? '#f0f2f5' : '#181818';
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: darkTheme ? '#181818' : '#f0f2f5' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggle}
        style={{ background: darkTheme ? '#202020' : '#fff', boxShadow: '3px 0 15px rgba(0, 0, 0, 0.5)' }}
      >
        <div
          style={{
            padding: '16px',
            background: darkTheme ? '#2a2a2a' : '#fff',
            borderBottom: '1px solid #333',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src="/icon.jpeg" // Cambia esta ruta a tu imagen
            alt="nesxio"
            width={collapsed ? 40 : 100}
            height={40}
            style={{ borderRadius: '8px', backgroundColor: darkTheme ? '#303030' : '#fff' }}
          />
        </div>

        <Menu
          theme={darkTheme ? 'dark' : 'light'}
          mode="inline"
          defaultSelectedKeys={['/admin/dashboard']}
          onClick={handleMenuClick}
          style={{
            background: 'transparent',
            color: darkTheme ? '#d1d1d1' : '#333',
          }}
        >
          {menuItems.map((item) =>
            item.children ? (
              <SubMenu key={item.key} icon={item.icon} title={item.label} style={{ color: darkTheme ? '#d1d1d1' : '#333' }}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key} style={{ color: darkTheme ? '#d1d1d1' : '#333' }}>
                    {child.label}
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon} style={{ color: darkTheme ? '#d1d1d1' : '#333' }}>
                {item.label}
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: darkTheme ? '#181818' : '#fff',
            boxShadow: '0 3px 15px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ paddingLeft: '24px' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
              style: { color: darkTheme ? '#4e88c9' : '#333', fontSize: '18px', cursor: 'pointer' },
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', paddingRight: '24px' }}>
            <Switch
              checkedChildren={<BulbOutlined />}
              unCheckedChildren={<BulbOutlined />}
              checked={darkTheme}
              onChange={toggleTheme}
              style={{ marginRight: '16px' }}
            />
            <Dropdown overlay={userMenu} trigger={['click']}>
              <Button type="text" style={{ color: darkTheme ? '#d1d1d1' : '#333' }}>
                <UserOutlined style={{ fontSize: '24px' }} /> <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: darkTheme ? '#2a2a2a' : '#fff',
            color: darkTheme ? '#d1d1d1' : '#333',
            borderRadius: '10px',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            background: darkTheme ? '#181818' : '#f0f0f0',
            color: darkTheme ? '#d1d1d1' : '#333',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            position: 'fixed',
            bottom: 0,
            left: collapsed ? '80px' : '200px', // Ajuste dinámico del margen izquierdo basado en el estado colapsado
            width: `calc(100% - ${collapsed ? '80px' : '200px'})`, // Ajuste dinámico del ancho basado en el estado colapsado
            zIndex: 10,
          }}
        >
          <div>
            © 2024 Nesxio - UMGCOLLAB
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>v1.0.0</span>
            <Image
              src="/icon.jpeg" // Ruta para la versión pequeña del logo
              alt="nesxio"
              width={30}
              height={30}
            />
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
