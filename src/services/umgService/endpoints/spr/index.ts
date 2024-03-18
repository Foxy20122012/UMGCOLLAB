
class APIService {
  //Se encarga de llamar los Spr encargador de dar lectura a los datos
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

    //Se encarga de llamar los Spr encargador de dar insertar datos en las tablas correspondiente que indique el Spr
    callSPInsert = async (spName: string, params: any[]): Promise<any> => {
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


    
  callSPUpdate = async (spName: string, params: any[]): Promise<any> => {
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

  callSPDelete = async (spName: string, params: any[]): Promise<any> => {
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
  