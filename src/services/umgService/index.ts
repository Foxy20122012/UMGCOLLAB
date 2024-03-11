import AuthService from "./endpoints/session";
import APIService from "./endpoints/spr"
import CursosService from "./endpoints/cursos";

class UmgService {
    authService: AuthService;
    apiService: APIService
    cursosService: CursosService

    constructor() {
        this.authService = new AuthService();
        this.apiService = new APIService();
        this.cursosService = new CursosService();
    }
}

export default UmgService;
