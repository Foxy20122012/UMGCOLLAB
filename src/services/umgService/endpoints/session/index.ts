
class AuthService {
    loginAdmin = async (email: string, password: string): Promise<any> => {
      try {
        const response = await fetch('https://apiumgcollab.onrender.com/api/login/admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            correo: email,
            contraseña: password
          })
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
  
    loginUser = async (email: string, password: string): Promise<any> => {
      try {
        const response = await fetch('https://apiumgcollab.onrender.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            correo: email,
            contraseña: password
          })
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
  
  export default AuthService;
  