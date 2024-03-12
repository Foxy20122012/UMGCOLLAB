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
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="flex justify-center items-center p-10 bg-gray-100">
      <div className="relative w-full max-w-sm">
        {/* Phone border and screen */}
        <div className="border-4 border-gray-700 rounded-3xl overflow-hidden shadow-xl">
          {/* Phone notch */}
          <div className="bg-gray-700 text-white text-center p-2 relative">
            <div className="absolute inset-x-0 top-0 m-auto w-24 h-2 bg-gray-800 rounded-b-full"></div>
            12:00
          </div>
          {/* Content of the screen */}
          <div className="bg-white overflow-y-scroll" style={{ height: "700px" }}>
            {/* Ensure each step item has enough space and isn't cramped */}
            <div className="space-y-4 p-4">
              {stepsData.map((step, index) => (
                <div key={step.id}
                     className={classNames("flex items-center p-4 my-2 rounded-2xl shadow cursor-pointer transition-all duration-300",
                     { 'bg-blue-500 text-white': activeStep === step.id, 'bg-gray-100 text-gray-700': activeStep !== step.id })}
                     onClick={() => setActiveStep(step.id)}>
                  {/* Circle with the icon and step number */}
                  <div className={classNames("rounded-full p-2 text-2xl w-12 h-12 flex items-center justify-center mr-4 shadow",
                    { 'bg-white text-blue-500': activeStep === step.id, 'bg-blue-500 text-white': activeStep !== step.id })}>
                    {step.id}
                  </div>
                  {/* Title and description of the step */}
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    {activeStep === step.id && <p className="text-sm">{step.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Phone button (simulated) */}
        <div className="absolute inset-x-0 bottom-4 mx-auto w-12 h-12 bg-gray-800 rounded-full"></div>
      </div>
    </div>
  );
}
