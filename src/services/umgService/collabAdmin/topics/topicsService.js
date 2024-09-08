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

createTema = (data)=>{
    const endpoint = this.endpoint.temas;
    return this.service.request({
        method: 'POST',
        endpoint,
        data: data,
        headers: this.defaultHeaders
    })
}

updateTema = (id, data) => {
    const endpoint = `${this.endpoint.temas}/${id}`; // Asume que la API acepta el ID en la URL
    return this.service.request({
        method: 'PUT',
        endpoint,
        data: data,
        headers: this.defaultHeaders
    });
};

deleteTema = (id) => {
    const endpoint = `${this.endpoint.temas}/${id}`; // Asume que la API acepta el ID en la URL
    return this.service.request({
        method: 'DELETE',
        endpoint,
        headers: this.defaultHeaders
    });
};

}



export default TemaService
