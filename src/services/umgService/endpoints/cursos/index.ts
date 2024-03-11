class CursosService {
    getCursos = async (): Promise<any> => {
      try {
        const response = await fetch('https://umgcollab.azurewebsites.net/api/cursos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          const res = await response.json();
          return Promise.reject(res.message);
        }
  
        return await response.json();
      } catch (err: any) {
        return Promise.reject('ERROR: ' + JSON.stringify(err));
      }
    };
  }
  
  export default CursosService;
  