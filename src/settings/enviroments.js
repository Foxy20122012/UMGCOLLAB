const environment = process.env.NEXT_PUBLIC_API_URL;


module.exports = {
    api:{
        umgCollab:{
            url: environment,
            timeout: 900000,
            endpoint:{
                admin:{
                    cursos:{
                        cursos: '/api/Cursos'
                    }
                }
            }
        }
    }
}