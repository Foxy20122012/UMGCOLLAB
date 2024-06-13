'use client'
import React, { useEffect, useState, useMemo } from 'react';
import CursoService from "../../../services/umgService/collabAdmin/cursoService";


const PruebaRequest = () => {
    // const [response, setResponse] = useState('');
    // const cursoService = useMemo(() => new CursoService(), []);

    // useEffect(() => {
    //     const fetchCursos = async () => {
    //         try {
    //             const res = await cursoService.getCursos();
    //             setResponse(JSON.stringify(res.data, null, 2));  // Formatea y muestra la respuesta JSON
    //         } catch (err) {
    //             setResponse('Error al cargar los cursos: ' + err.message);  // Manejo del error en la respuesta
    //         }
    //     };

    //     fetchCursos();
    // }, [cursoService]);

    return (
        <div>
            {/* <div>
                {response}
            </div> */}
            <div>
                Hello Request
            </div>
        </div>
    )
}

export default PruebaRequest;
