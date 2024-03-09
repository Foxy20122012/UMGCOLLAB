import AuthService from "./endpoints/session";

class UmgService {
    authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }
}

export default UmgService;
