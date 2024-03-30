'use client'

import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit, FiTrash2 } from 'react-icons/fi';



const PostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [courseName, setCourseName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
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
            fetchPosts();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = (post) => {
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
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ titulo: title, contenido: content, nombre: courseName })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setEditing(false);
            setEditPostId(null);
            setTitle('');
            setContent('');
            fetchPosts();
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

                setPosts(posts.filter((post) => post.id !== postId));
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

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
                    <div className="relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search for your favorite posts"
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full"
                        />
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>
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


            <div>
    <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredPosts.map(post => (
            <li key={post.id} className="border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <h2 className="text-lg font-bold mb-2">{post.titulo}</h2>
                    <p className="text-gray-100 mb-2">{post.contenido}</p>
                    <p className="text-gray-200">{post.nombre}</p>
                </div>
                <div className="flex justify-end items-center p-2 bg-gray-50">
                    <button onClick={() => handleEdit(post)} className="flex items-center text-gray-500 hover:text-gray-700">
                        <FiEdit size={20} className="mr-1" />
                    </button>
                    <button onClick={() => handleDelete(post.id)} className="text-gray-500 ml-2 hover:text-red-500"><FiTrash2 size={20} /></button>
                </div>
            </li>
        ))}
    </ul>
</div>

        </div>
    );
};

export default PostsPage;
