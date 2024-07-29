import RestfulHandler from '../../../module/handler/restfulHandler';
import enviroment from '../../../settings/enviroments'

class CursoService {
    constructor(){
        const {umgCollab} = enviroment.api
        this.service = new RestfulHandler(umgCollab.url, umgCollab.timeout);
        this.endpoint = umgCollab.endpoint.admin.cursos;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }
getCursos = ()=>{
    const endpoint = this.endpoint.cursos;
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    })
}
}

export default CursoService
