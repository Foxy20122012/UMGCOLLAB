import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments'


class EventsCategoryService {
    constructor(){
        const {umgCollab} = enviroment.api
        this.service = new RestfulHandler(umgCollab.url, umgCollab.timeout);
        this.endpoint = umgCollab.endpoint.general.categories;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }

    getEventsCategory = ()=>{
        const endpoint = this.endpoint.eventsCategory;
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: this.defaultHeaders
        })
    }

    createEventsCategory = (data)=>{
        const endpoint = this.endpoint.eventsCategory;
        return this.service.request({
            method: 'POST',
            endpoint,
            data: data,
            headers: this.defaultHeaders
        })
    }

    updateEventsCategory = (id, data) => {
        const endpoint = `${this.endpoint.eventsCategory}/${id}`; // Asume que la API acepta el ID en la URL
        return this.service.request({
            method: 'PUT',
            endpoint,
            data: data,
            headers: this.defaultHeaders
        });
    };

    deleteEventsCategory = (id) => {
        const endpoint = `${this.endpoint.eventsCategory}/${id}`; // Asume que la API acepta el ID en la URL
        return this.service.request({
            method: 'DELETE',
            endpoint,
            headers: this.defaultHeaders
        });
    };

};

export default EventsCategoryService