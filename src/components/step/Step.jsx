// components/PhoneStepsComponent.js
'use client'
import { useState, useEffect } from 'react';
import classNames from 'classnames';

const stepsData = [
  { 
    id: 0, 
    title: "Presiona el botón para ver tus mensajes",
    description: "",
    isInitialMessage: true, // Marca especial para el mensaje inicial
  },
  {
    id: 1,
    title: "Generar número de carné",
    description: "First you need to generate your ID number. Complete the responsibility discharge and generate your number at: [link](https://umg.edu.gt/newstudents/)"
  },
  {
    id: 2,
    title: "Generar número de carné",
    description: "First you need to generate your ID number. Complete the responsibility discharge and generate your number at: [link](https://umg.edu.gt/newstudents/)"
  },
  {
    id: 3,
    title: "Generar número de carné",
    description: "First you need to generate your ID number. Complete the responsibility discharge and generate your number at: [link](https://umg.edu.gt/newstudents/)"
  },
  {
    id: 4,
    title: "Generar número de carné",
    description: "First you need to generate your ID number. Complete the responsibility discharge and generate your number at: [link](https://umg.edu.gt/newstudents/)"
  },
  {
    id: 5,
    title: "Generar número de carné",
    description: "First you need to generate your ID number. Complete the responsibility discharge and generate your number at: [link](https://umg.edu.gt/newstudents/)"
  },
  // ... Agrega aquí más pasos
];


export default function PhoneStepsComponent() {
  const [activeStep, setActiveStep] = useState(0);
  const [showSteps, setShowSteps] = useState([stepsData[0]]); // Comienza con el mensaje inicial

  useEffect(() => {
    let interval;
    if (activeStep > 0) { // Cuando activeStep es mayor que 0, comienza la secuencia
      interval = setInterval(() => {
        setShowSteps((prevSteps) => {
          // Encuentra el siguiente paso que no está actualmente mostrado
          const nextStep = stepsData.find(step => !prevSteps.includes(step));
          // Si no hay más pasos, limpia el intervalo
          if (!nextStep) {
            clearInterval(interval);
            return prevSteps;
          }
          // Agrega el siguiente paso a la lista de pasos mostrados
          return [...prevSteps, nextStep];
        });
      }, 1000); // Cada paso se muestra después de un segundo
    }
    // Limpia el intervalo si el componente se desmonta
    return () => clearInterval(interval);
  }, [activeStep]);

  const handleButtonClick = () => {
    // Solo inicia la secuencia si estamos en el mensaje inicial
    if (activeStep === 0) {
      setActiveStep(1);
    }
  };

  return (
    <div className="flex justify-center items-center p-10 bg-gray-100">
      <div className="relative w-full max-w-sm">
        {/* El borde y la pantalla del teléfono */}
        <div className="border-4 border-gray-700 rounded-3xl overflow-hidden shadow-xl h-[700px]">
          {/* La "muesca" del teléfono */}
          <div className="bg-gray-700 text-white text-center p-2 relative">
            <div className="absolute inset-x-0 top-0 m-auto w-24 h-2 bg-gray-800 rounded-b-full"></div>
            12:00
          </div>
          {/* El contenido de la pantalla */}
          <div className="bg-white overflow-y-scroll h-full">
            {/* Asegúrate de que cada elemento de paso tiene suficiente espacio */}
            <div className="space-y-4 p-4">
              {showSteps.map((step) => (
                <div key={step.id} className={classNames(
                    "flex items-center p-4 my-2 rounded-2xl shadow transition-all duration-300",
                    { 'bg-blue-500 text-white': step.id !== 0, 'bg-gray-100 text-gray-700': step.id === 0 }
                  )}>
                  {/* Círculo con el icono y el número del paso */}
                  {step.id !== 0 && (
                    <div className="rounded-full p-2 text-2xl w-12 h-12 flex items-center justify-center mr-4 shadow bg-blue-500 text-white">
                      {step.id}
                    </div>
                  )}
                  {/* Título y descripción del paso */}
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Botón del teléfono (simulado) */}
        <button 
          className="absolute inset-x-0 bottom-4 mx-auto w-12 h-12 bg-gray-800 rounded-full"
          onClick={handleButtonClick}
        >
          {/* Icono o texto para el botón */}
          {activeStep === 0 && <span className="text-white">↓</span>}
        </button>
      </div>
    </div>
  );
}
