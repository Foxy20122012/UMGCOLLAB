'use client';
import React, { ReactNode, useState } from 'react';
import { Layout, Menu, Dropdown, Button, Switch } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DownOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

type SidebarProps = {
  children: ReactNode;
  menuItems: Array<{
    key: string;
    icon: ReactNode;
    label: string;
    children?: Array<{ key: string; label: string }>;
  }>;
};

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

const Sidebar: React.FC<SidebarProps> = ({ children, menuItems }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
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
        style={{
          background: darkTheme ? '#202020' : '#fff',
          boxShadow: '3px 0 15px rgba(0, 0, 0, 0.5)',
          height: '100vh',
          overflowY: 'auto', // Permite el scroll en el sidebar
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            padding: '16px',
            background: darkTheme ? '#2a2a2a' : '#fff',
            borderBottom: '1px solid #333',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed', // Esto hace que el logo sea fijo
            width: collapsed ? '80px' : '200px', // Ajusta el ancho dinámicamente según el estado del sidebar
            zIndex: 1001, // Asegura que esté por encima del contenido
            top: 0, // Mantiene el logo en la parte superior
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

        <div style={{ marginTop: collapsed ? '60px' : '120px' }}> {/* Espacio para evitar superposición con el logo */}
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
        </div>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: darkTheme ? '#181818' : '#fff',
            boxShadow: '0 3px 15px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'fixed',
            width: `calc(100% - ${collapsed ? '80px' : '200px'})`,
            zIndex: 1000,
            top: 0,
            left: collapsed ? '80px' : '200px',
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
            marginTop: '100px',
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
            left: collapsed ? '80px' : '200px',
            width: `calc(100% - ${collapsed ? '80px' : '200px'})`,
            zIndex: 1000,
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
