import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments'

class TemaService {
    constructor(){
        const {umgCollab} = enviroment.api
        this.service = new RestfulHandler(umgCollab.url, umgCollab.timeout);
        this.endpoint = umgCollab.endpoint.admin.cursos;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }
getTemas = ()=>{
    const endpoint = this.endpoint.temas;
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    })
}
}

export default CursoService
