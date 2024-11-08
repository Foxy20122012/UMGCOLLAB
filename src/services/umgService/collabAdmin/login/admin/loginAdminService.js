import RestfulHandler from '../../../../../module/handler/restfulHandler';
import enviroment from '../../../../../settings/enviroments';

class LoginAdminService {
    constructor() {
        const { umgCollab } = enviroment.api;
        this.service = new RestfulHandler(umgCollab.url, umgCollab.timeout);
        this.endpoint = umgCollab.endpoint.general.session;
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        };
    }

    postLoginAdmin = (data) => {
        const endpoint = this.endpoint.login.loginAdmin;
        return this.service.request({
          method: 'POST',
          endpoint,
          data: JSON.stringify(data), 
          headers: this.defaultHeaders,
        });
      };
      
}

export default LoginAdminService;
