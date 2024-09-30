


const environment = "http://localhost:3000";
//const environment = process.env.NEXT_PUBLIC_API_URL;

module.exports = {
    api: {
        umgCollab: {
            url: environment, // Asegúrate de que esta URL sea la correcta
            timeout: 900000,
            endpoint: {
                admin: {
                    cursos: {
                        cursos: '/api/Cursos',
                        temas: '/api/topics'
                    },
                    registerProfessors:{
                        registroProcesor: '/api/usuarios/catedraticos'
                    },
                    registerStudents:{
                        registroEstudiante: '/api/usuarios/estudiantes'
                    },
                },
                general:{
                    categories:{
                        postCategory: '/api/categoria/post',
                        eventsCategory: '/api/categoria/Eventos',
                        newsCategory: '/api/categoria/news'
                    }

                }
            }
        }
    }
};
