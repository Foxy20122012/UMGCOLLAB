import {
  Cursos
} from '@/models/interface/Cursos'

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

       // Método para actualizar un curso
       updateCurso = async (id: number, cursoData: Partial<Cursos>): Promise<void> => {
        try {
          const response = await fetch(`https://umgcollab.azurewebsites.net/api/cursos/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cursoData),
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
      
      
      

    // Método para eliminar un curso
    deleteCurso = async (id: number): Promise<void> => {
      try {
        const response = await fetch(`https://umgcollab.azurewebsites.net/api/cursos/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          const res = await response.json();
          return Promise.reject(res.message);
        }
      } catch (err: any) {
        return Promise.reject('ERROR: ' + JSON.stringify(err));
      }
    };
    
  }
  
  export default CursosService;
