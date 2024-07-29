'use client'
import React, { useEffect, useState } from 'react';
import CursoService from "../../services/umgService/collabAdmin/cursoService";


const HomeAdmin =()=>{


       
       const [cursos, setCursos] = useState([]);
       const [error, setError] = useState(null);
   
       
       const cursoService =  new CursoService();
   
       
       useEffect(() => {
        const cursoService = new CursoService();  // Instanciamos el servicio
        console.log(cursoService)
        cursoService.getCursos()
            .then(response => {
                // Suponiendo que la respuesta tiene la forma esperada
                setCursos(response.data);  // Actualizamos el estado con los datos recibidos
            })
            .catch(err => {
                setError(err.message);  // Manejo de errores en caso de falla de la petición
            });
    }, []);  // El efecto se ejecuta solo una vez al montar el componente 
   
    return(
        <div>
            Hello Admin
        </div>
    )
}

export default HomeAdmin;