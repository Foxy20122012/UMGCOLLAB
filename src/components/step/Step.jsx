// components/PhoneStepsComponent.js
'use client'
import { useState, useEffect } from 'react';
import classNames from 'classnames';

const stepsData = [
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
  {
    id: 6,
    title: "Generar número de carné",
    description: "First you need to generate your ID number. Complete the responsibility discharge and generate your number at: [link](https://umg.edu.gt/newstudents/)"
  },
  
  // ... Agrega aquí más pasos
];


export default function PhoneStepsComponent() {
  const [activeStep, setActiveStep] = useState(0);
  const [stepsToShow, setStepsToShow] = useState([]);

  useEffect(() => {
    if (activeStep > 0 && stepsToShow.length < stepsData.length) {
      const timer = setTimeout(() => {
        setStepsToShow(prevStepsToShow => [
          ...prevStepsToShow,
          stepsData[prevStepsToShow.length]
        ]);
      }, 500); // Añade un paso cada medio segundo

      return () => clearTimeout(timer);
    }
  }, [activeStep, stepsToShow.length]);

  const handleStepClick = id => {
    setActiveStep(id); // Activa el paso seleccionado
  };

  const handleButtonClick = () => {
    setActiveStep(1); // Comienza la secuencia
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
            {/* Mensaje inicial que desaparece después de presionar el botón */}
            {activeStep === 0 && (
              <div className="text-center p-4">
                <p className="font-bold mb-2">Presiona el botón para ver tus mensajes</p>
                <span className="text-3xl">↓</span>
              </div>
            )}
            {/* Los pasos que se muestran */}
            <div className="space-y-4 p-4 pb-16 ">
              {stepsToShow.map((step, index) => (
                <div key={step.id} 
                     onClick={() => handleStepClick(step.id)}
                     className={classNames(
                       "flex flex-col items-start p-4 my-2 rounded-2xl shadow cursor-pointer transition-all duration-300",
                       { 'bg-indigo-600 text-white': activeStep === step.id, 'bg-gray-100 text-gray-700': activeStep !== step.id }
                     )}
                >
                  {/* Círculo con el número del paso */}
                  <div className={classNames(
                    "rounded-full p-2 text-2xl w-12 h-12 flex items-center justify-center shadow",
                    { 'bg-indigo-600 text-white': activeStep === step.id, 'bg-blue-500 text-white': activeStep !== step.id }
                  )}>
                    {step.id}
                  </div>
                  {/* Título y descripción del paso */}
                  <div className="mt-2">
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
        {/* Botón del teléfono para iniciar la secuencia de pasos */}
        {activeStep === 0 && (
          <button className="absolute inset-x-0 bottom-4 mx-auto w-12 h-12 bg-gray-800 rounded-full"
                  onClick={handleButtonClick}>
            {/* Ícono o texto en el botón */}
          </button>
        )}
      </div>
    </div>
  );
}