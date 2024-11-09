'use client'
import React from 'react';
import { FaInfoCircle, FaHeart, FaGithub } from 'react-icons/fa';

const AboutPage = () => {
    return (
        <div className="container mx-auto my-10 p-10 bg-gradient-to-r from-blue-50 to-white shadow-xl rounded-xl max-w-5xl">
            <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-8">
                Acerca de <span className="text-blue-500">UMGCollab</span>
            </h1>
            <div className="flex flex-col items-center space-y-8">
                <FaInfoCircle className="text-blue-400 drop-shadow-lg" size={90} />
                <p className="text-xl text-gray-700 leading-relaxed text-center max-w-3xl">
                    Bienvenido a <span className="font-semibold text-blue-600">UMGCollab</span>, tu plataforma de colaboración educativa y profesional. Nuestro objetivo es facilitar la comunicación, el acceso a recursos y la gestión de tareas entre estudiantes, profesores y personal administrativo.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed text-center max-w-3xl">
                    Explora diversas herramientas para potenciar la productividad, gestionar actividades académicas y fomentar el aprendizaje compartido dentro de la comunidad educativa.
                </p>
                <div className="w-3/4 border-t border-gray-300 mt-6"></div>
                <h2 className="text-3xl font-semibold text-center text-gray-800">Nuestra Misión</h2>
                <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl">
                    Brindar un espacio intuitivo y moderno que promueva la interacción y la colaboración efectiva en un entorno educativo, permitiendo el desarrollo personal y profesional a través del acceso a recursos clave.
                </p>
                <div className="w-full flex flex-col items-center mt-8">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Contacto</h2>
                    <p className="text-lg text-gray-600 text-center mb-4">
                        Para preguntas o sugerencias, contáctanos a través de nuestras redes sociales o contribuye con nosotros en <span className="font-semibold">GitHub</span>.
                    </p>
                    <div className="flex justify-center space-x-6">
                        <a href="https://github.com/Foxy20122012" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition duration-300">
                            <FaGithub size={50} />
                        </a>
                        <FaHeart className="text-red-500 animate-pulse" size={50} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
