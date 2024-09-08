import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments'


class NewsCategoryService {
    constructor(){
        const {umgCollab} = enviroment.api
        this.service = new RestfulHandler(umgCollab.url, umgCollab.timeout);
        this.endpoint = umgCollab.endpoint.general.categories;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }

    getNewsCategory = ()=>{
        const endpoint = this.endpoint.newsCategory;
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: this.defaultHeaders
        })
    }

    createNewsCategory = (data)=>{
        const endpoint = this.endpoint.newsCategory;
        return this.service.request({
            method: 'POST',
            endpoint,
            data: data,
            headers: this.defaultHeaders
        })
    }

    updateNewsCategory = (id, data) => {
        const endpoint = `${this.endpoint.newsCategory}/${id_detalle}`; // Asume que la API acepta el ID en la URL
        return this.service.request({
            method: 'PUT',
            endpoint,
            data: data,
            headers: this.defaultHeaders
        });
    };

    deleteNewsCategory = (id) => {
        const endpoint = `${this.endpoint.newsCategory}/${id_detalle}`; // Asume que la API acepta el ID en la URL
        return this.service.request({
            method: 'DELETE',
            endpoint,
            headers: this.defaultHeaders
        });
    };

};

export default NewsCategoryService