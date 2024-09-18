import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments'

class RegistroStudentService {
    constructor(){
        const {umgCollab} = enviroment.api
        this.service = new RestfulHandler(umgCollab.url, umgCollab.timeout);
        this.endpoint = umgCollab.endpoint.admin.registerStudents;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }
getRegistroProfesor = ()=>{
    const endpoint = this.endpoint.registroEstudiante;
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    })
}

createRegistroProfesor = (data)=>{
    const endpoint = this.endpoint.registroEstudiante;
    return this.service.request({
        method: 'POST',
        endpoint,
        data: data,
        headers: this.defaultHeaders
    })
}

updateRegistroProfesor = (id, data) => {
    const endpoint = `${this.endpoint.registroEstudiante}/${id}`; // Asume que la API acepta el ID en la URL
    return this.service.request({
        method: 'PUT',
        endpoint,
        data: data,
        headers: this.defaultHeaders
    });
};

deleteRegistroProfesor = (id) => {
    const endpoint = `${this.endpoint.registroEstudiante}/${id}`; // Asume que la API acepta el ID en la URL
    return this.service.request({
        method: 'DELETE',
        endpoint,
        headers: this.defaultHeaders
    });
};
}



export default RegistroStudentService


