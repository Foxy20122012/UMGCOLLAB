'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ProfilePage = () => {
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
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">User Profiles</h1>
            {userData.map(user => (
                <div key={user.id} className="mb-8 p-4 border rounded-md">
                    <h2 className="text-xl font-semibold">{user.nombre}</h2>
                    <p className="text-gray-600 mb-2">Email: {user.correo}</p>
                    {user.telefono && <p className="text-gray-600 mb-2">Phone: {user.telefono}</p>}
                    {user.apellido && <p className="text-gray-600 mb-2">Last Name: {user.apellido}</p>}
                    <p className="text-gray-600 mb-2">Role: {user.rol}</p>
                    {/* Mostrar la imagen de perfil utilizando Next.js Image */}
                    {user.imagen_perfil ? (
                        <Image
                            src={`/images/${user.imagen_perfil}`}
                            alt="Profile Picture"
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                    ) : (
                        <Image
                            src="/icon.jpeg"
                            alt="Default Avatar"
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProfilePage;
