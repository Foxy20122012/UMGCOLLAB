
class APIService {
    callSP = async (spName: string, params: any[]): Promise<any> => {
      try {
        const response = await fetch('https://umgcollab.azurewebsites.net/api/dataJson', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            spName: spName,
            params: params,
          }),
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
  
  export default APIService;
  