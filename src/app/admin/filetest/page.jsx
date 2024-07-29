'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/files');
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Image Gallery</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {images.map((image, index) => (
                    <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg bg-white hover:bg-gray-100 transition duration-300">
                        <img 
                            src={`http://localhost:3000/api/files/${image.name}`} 
                            alt={image.name} 
                            className="w-full h-60 object-cover transform transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-sm text-gray-200">{image.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
