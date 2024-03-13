'use client'
import PhoneStepsComponent from "@/components/step/Step"
const HomePage =()=>{

  
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

function handleStepClick(id) {
  console.log("Paso activado:", id);
  // Aquí puedes hacer algo más cuando se hace clic en un paso, por ejemplo, navegar a una URL
}

  return(
    <div>
      Hello 
      <PhoneStepsComponent stepsData={stepsData} onStepClick={handleStepClick} />
    </div>
  )
}

export default HomePage;