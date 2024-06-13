'use client'
import React, { useState, useEffect } from 'react';

const EditProfilePage = () => {
    const [image, setImage] = useState(null);
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

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', image);
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/profileImage', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            // Actualiza la información del usuario después de subir la imagen
            fetchProfileData();
        } catch (error) {
            setError(error.message);
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
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <div className="mb-8 p-4 border rounded-md">
                <h2 className="text-xl font-semibold">Profile Image</h2>
                <img
                    src={`http://localhost:3000/${userData.imagen_perfil}`}
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="rounded-full"
                />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button onClick={handleSubmit}>Upload Image</button>
            </div>
            <h2 className="text-xl font-semibold">User Profiles</h2>
            {userData.map(user => (
                <div key={user.id} className="mb-8 p-4 border rounded-md">
                    <h3 className="text-lg font-semibold">{user.nombre}</h3>
                    <p className="text-gray-600 mb-2">Email: {user.correo}</p>
                    {user.telefono && <p className="text-gray-600 mb-2">Phone: {user.telefono}</p>}
                    {user.apellido && <p className="text-gray-600 mb-2">Last Name: {user.apellido}</p>}
                    <p className="text-gray-600 mb-2">Role: {user.rol}</p>
                    <img
                        src={`http://localhost:3000/${user.imagen_perfil}`}
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className="rounded-full"
                    />
                </div>
            ))}
        </div>
    );
};

export default EditProfilePage;
