'use client'
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const EditProfilePage = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setUserData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg font-medium text-gray-600">Cargando...</p>
        </div>;
    }

    if (error) {
        return <div className="flex items-center justify-center min-h-screen">
            <p className="text-red-600 font-medium">Error: {error}</p>
        </div>;
    }

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Perfil del Usuario</h1>
            {userData.map(user => (
                <div key={user.id} className="flex flex-col items-center mb-8 p-6 border rounded-md shadow-sm bg-gray-50">
                    <FaUserCircle className="text-gray-400" size={100} />
                    <h2 className="text-2xl font-semibold mt-4">{user.nombre} {user.apellido && user.apellido}</h2>
                    <p className="text-gray-600 mb-2">Correo: {user.correo}</p>
                    {user.telefono && <p className="text-gray-600 mb-2">Teléfono: {user.telefono}</p>}
                    <p className="text-gray-600 mb-2">Rol: {user.rol}</p>
                </div>
            ))}
        </div>
    );
};

export default EditProfilePage;
