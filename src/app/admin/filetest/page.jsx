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
        <div>
            <h1>Image Gallery</h1>
            <div className="image-grid">
                {images.map((image, index) => (
                    <div key={index} className="image-item">
                        <img 
                            src={`http://localhost:3000/api/files/${image.name}`} 
                            alt={image.name} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
