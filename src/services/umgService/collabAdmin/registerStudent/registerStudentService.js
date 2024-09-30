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
getRegistroStudent = ()=>{
    const endpoint = this.endpoint.registroEstudiante;
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    })
}

createRegistroStudent  = (data)=>{
    const endpoint = this.endpoint.registroEstudiante;
    return this.service.request({
        method: 'POST',
        endpoint,
        data: data,
        headers: this.defaultHeaders
    })
}

updateRegistroStudent  = (id, data) => {
    const endpoint = `${this.endpoint.registroEstudiante}/${id}`; 
    return this.service.request({
        method: 'PUT',
        endpoint,
        data: data,
        headers: this.defaultHeaders
    });
};

deleteRegistroStudent  = (id) => {
    const endpoint = `${this.endpoint.registroEstudiante}/${id}`; 
    return this.service.request({
        method: 'DELETE',
        endpoint,
        headers: this.defaultHeaders
    });
};
}



export default RegistroStudentService


