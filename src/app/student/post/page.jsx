'use client'

import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [courseName, setCourseName] = useState(''); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);  // Nuevo estado para manejar si estás en modo edición
    const [editPostId, setEditPostId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/postStudent', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setPosts(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/postStudent', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ titulo: title, contenido: content, nombre: courseName })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setTitle('');
            setContent('');
            fetchPosts(); // Recargar los posts después de agregar uno nuevo
        } catch (error) {
            setError(error.message);
        }
    };


    
    const handleEdit = (post) => {
        // Configura el formulario para la edición
        setEditing(true);
        setEditPostId(post.id);
        setTitle(post.titulo);
        setContent(post.contenido);
        setCourseName(post.nombre);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/postStudent/${editPostId}`, {
                method: 'PUT', // O PATCH si solo actualizas parcialmente
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ titulo: title, contenido: content, nombre: courseName })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Resetear el estado de edición y actualizar la lista de posts
            setEditing(false);
            setEditPostId(null);
            setTitle('');
            setContent('');
            fetchPosts(); // Recargar los posts después de la actualización
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDelete = async (postId) => {
        const confirmDelete = confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:3000/api/postStudent/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                // Filtrar el post eliminado fuera del estado posts.
                setPosts(posts.filter((post) => post.id !== postId));
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

     // Filtrar posts basándose en el término de búsqueda
     const filteredPosts = posts.filter((post) =>
     post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
     post.contenido.toLowerCase().includes(searchTerm.toLowerCase()) ||
     post.nombre.toLowerCase().includes(searchTerm.toLowerCase())
 );
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>

<div className="fixed top-0 left-0 w-full bg-white shadow-md z-10 p-4 flex items-center justify-between">
    <div className="flex items-center">
        {/* Contenido de la barra de navegación aquí */}
        <div className="relative">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Busca tus post favoritos"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
    </div>
    {/* Otros elementos de la barra de navegación si los hay */}
</div>
          
        
<div className="max-w-xl mx-auto py-16">
    <h1 className="text-3xl font-bold mb-6">Posts</h1>
    <form onSubmit={editing ? handleUpdate : handleSubmit} className="mb-6">
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="block w-full p-2 border border-gray-300 rounded mb-4"
        />
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            className="block w-full p-2 border border-gray-300 rounded mb-4 h-32"
        />
        <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Course Name"
            className="block w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
            {editing ? 'Update Post' : 'Add Post'}
        </button>
        {editing && (
            <button onClick={() => setEditing(false)} className="bg-gray-500 text-white py-2 px-4 rounded">
                Cancel Edit
            </button>
        )}
    </form>

</div>
    <ul className="space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredPosts.map((post) => (
                    <div key={post.id} className="p-4 border border-gray-200 rounded">
                        <h2 className="text-xl font-semibold">{post.titulo}</h2>
                        <p className="mt-2">{post.contenido}</p>
                        <p className="mt-2 font-medium">{post.nombre}</p>
                        <div className="mt-4">
                            <button onClick={() => handleEdit(post)} className="bg-yellow-500 text-white py-1 px-3 rounded mr-2">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white py-1 px-3 rounded">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                </div>
    </ul>
    </div>

    );
};

export default PostsPage;
