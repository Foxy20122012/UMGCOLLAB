'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Progress } from 'antd';
import { FaBook, FaUserGraduate, FaChalkboardTeacher, FaNewspaper, FaThumbsUp, FaThumbsDown, FaCalendarAlt, FaClock, FaClipboardList } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

const DashboardPage = () => {
  const t = useTranslations('dashboard');
  const [data, setData] = useState({
    cursos: 8,
    temas: 12,
    catedraticos: 4,
    estudiantes: 3,
    postVisibles: 7,
    postAprobados: 7,
    postNoAprobados: 4,
    noticias: 1,
    noticiasPendientes: 2,
    eventosVisibles: 1,
    eventosPendientes: 1,
    categoriasActivas: { eventos: 6, noticias: 6, posts: 6 },
    categoriasInactivas: { eventos: 6, noticias: 6, posts: 6 },
  });

  useEffect(() => {
    // Aquí cargarás los datos reales desde tu backend
    const fetchData = async () => {
      // Simulación de una llamada API
      const response = await fetch('/api/dashboard'); 
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">Dashboard de Métricas</h2>

      {/* Métricas en círculos */}
      <Row gutter={[16, 16]} className="mb-8">
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg text-center">
            <Progress
              type="circle"
              percent={data.estudiantes}
              format={() => `${data.estudiantes}`}
              width={100}
              status="active"
              strokeColor="#f5222d"
            />
            <p className="mt-4 text-lg font-semibold">Estudiantes</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg text-center">
            <Progress
              type="circle"
              percent={data.postVisibles}
              format={() => `${data.postVisibles}`}
              width={100}
              status="active"
              strokeColor="#1890ff"
            />
            <p className="mt-4 text-lg font-semibold">Posts Visibles</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg text-center">
            <Progress
              type="circle"
              percent={data.noticias}
              format={() => `${data.noticias}`}
              width={100}
              status="active"
              strokeColor="#faad14"
            />
            <p className="mt-4 text-lg font-semibold">Noticias</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg text-center">
            <Progress
              type="circle"
              percent={data.eventosVisibles}
              format={() => `${data.eventosVisibles}`}
              width={100}
              status="active"
              strokeColor="#52c41a"
            />
            <p className="mt-4 text-lg font-semibold">Eventos Visibles</p>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Cantidad de Cursos"
              value={data.cursos}
              prefix={<FaBook className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Cantidad de Temas"
              value={data.temas}
              prefix={<FaClipboardList className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Catedráticos"
              value={data.catedraticos}
              prefix={<FaChalkboardTeacher className="text-yellow-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Estudiantes"
              value={data.estudiantes}
              prefix={<FaUserGraduate className="text-red-500" />}
            />
          </Card>
        </Col>
      </Row>

      <h3 className="text-xl font-semibold mt-8 mb-4">Posts y Noticias</h3>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Posts Visibles"
              value={data.postVisibles}
              prefix={<FaNewspaper className="text-purple-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Posts Aprobados"
              value={data.postAprobados}
              prefix={<FaThumbsUp className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Posts No Aprobados"
              value={data.postNoAprobados}
              prefix={<FaThumbsDown className="text-red-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Noticias Pendientes"
              value={data.noticiasPendientes}
              prefix={<FaClock className="text-yellow-500" />}
            />
          </Card>
        </Col>
      </Row>

      <h3 className="text-xl font-semibold mt-8 mb-4">Eventos y Categorías</h3>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Eventos Visibles"
              value={data.eventosVisibles}
              prefix={<FaCalendarAlt className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Eventos Pendientes"
              value={data.eventosPendientes}
              prefix={<FaClock className="text-yellow-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Categorías Activas (Eventos)"
              value={data.categoriasActivas.eventos}
              prefix={<FaThumbsUp className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Categorías Inactivas (Eventos)"
              value={data.categoriasInactivas.eventos}
              prefix={<FaThumbsDown className="text-red-500" />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-8">
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Categorías Activas (Noticias)"
              value={data.categoriasActivas.noticias}
              prefix={<FaThumbsUp className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Categorías Inactivas (Noticias)"
              value={data.categoriasInactivas.noticias}
              prefix={<FaThumbsDown className="text-red-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Categorías Activas (Posts)"
              value={data.categoriasActivas.posts}
              prefix={<FaThumbsUp className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable className="bg-white shadow-lg">
            <Statistic
              title="Categorías Inactivas (Posts)"
              value={data.categoriasInactivas.posts}
              prefix={<FaThumbsDown className="text-red-500" />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
