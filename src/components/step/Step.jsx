// components/PhoneStepsComponent.js
'use client'
import { useState } from 'react';
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
  // ... Agrega aquí más pasos
];


export default function PhoneStepsComponent() {
  const [activeStep, setActiveStep] = useState(null);
  const [stepsToShow, setStepsToShow] = useState(1);

  const handleButtonClick = () => {
    setActiveStep(null); // Reset active step
    setStepsToShow((current) => (current < stepsData.length ? current + 1 : current));
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
            {/* Asegúrate de que cada elemento de paso tiene suficiente espacio para no estar apretado */}
            <div className="space-y-4 p-4">
              {stepsData.slice(0, stepsToShow).map((step) => (
                <div key={step.id} className={classNames(
                    "flex items-center p-4 my-2 rounded-2xl shadow transition-all duration-300",
                    { 'bg-blue-500 text-white': activeStep === step.id, 'bg-gray-100 text-gray-700': activeStep !== step.id }
                  )}
                  onClick={() => setActiveStep(step.id)}>
                  {/* El círculo con el icono y el número del paso */}
                  <div className={classNames(
                    "rounded-full p-2 text-2xl w-12 h-12 flex items-center justify-center mr-4 shadow",
                    { 'bg-white text-blue-500': activeStep === step.id, 'bg-blue-500 text-white': activeStep !== step.id }
                  )}>
                    {step.id}
                  </div>
                  {/* El título y la descripción del paso */}
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    {activeStep === step.id && <p className="text-sm">{step.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Botón del teléfono (simulado) */}
        <button className="absolute inset-x-0 bottom-4 mx-auto w-12 h-12 bg-gray-800 rounded-full"
                onClick={handleButtonClick}>
          {/* Puedes agregar un ícono o texto al botón si es necesario */}
        </button>
      </div>
    </div>
  );
}