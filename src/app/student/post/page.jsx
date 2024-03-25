'use client'

import React, { useState, useEffect } from 'react';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [courseName, setCourseName] = useState(''); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);  // Nuevo estado para manejar si estás en modo edición
    const [editPostId, setEditPostId] = useState(null);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
        <h1>Posts</h1>
        <form onSubmit={editing ? handleUpdate : handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
            />
            <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Course Name"
            />
            <button type="submit">{editing ? 'Update Post' : 'Add Post'}</button>
            {editing && <button onClick={() => setEditing(false)}>Cancel Edit</button>}
        </form>
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    <h2>{post.titulo}</h2>
                    <p>{post.contenido}</p>
                    <p>{post.nombre}</p>
                    <button onClick={() => handleEdit(post)}>Edit</button>
                </li>
            ))}
        </ul>
    </div>
    );
};

export default PostsPage;
