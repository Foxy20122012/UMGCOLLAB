// import environment from '../settings/environment';
// import NetunimSecurityService from "../service/security/netunimSecurityService";
import jwt from 'jwt-simple';
import Cookie from 'universal-cookie';

class Security {


    static cookieChecker = () => {
        if (this.getToken() === undefined) {
            window.location.reload();
        }
    }


}

export default Security;
