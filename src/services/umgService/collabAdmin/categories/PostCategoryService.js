import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments'


class PostCategoryService {
    constructor(){
        const {umgCollab} = enviroment.api
        this.service = new RestfulHandler(umgCollab.url, umgCollab.timeout);
        this.endpoint = umgCollab.endpoint.general.categories;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }

    getPostCategory = ()=>{
        const endpoint = this.endpoint.postCategory;
        return this.service.request({
            method: 'GET',
            endpoint,
            headers: this.defaultHeaders
        })
    }

    createPostCategory = (data)=>{
        const endpoint = this.endpoint.postCategory;
        return this.service.request({
            method: 'POST',
            endpoint,
            data: data,
            headers: this.defaultHeaders
        })
    }

    updatePostCategory = (id, data) => {
        const endpoint = `${this.endpoint.postCategory}/${id}`; // Asume que la API acepta el ID en la URL
        return this.service.request({
            method: 'PUT',
            endpoint,
            data: data,
            headers: this.defaultHeaders
        });
    };

    deletePostCategory = (id) => {
        const endpoint = `${this.endpoint.postCategory}/${id}`; // Asume que la API acepta el ID en la URL
        return this.service.request({
            method: 'DELETE',
            endpoint,
            headers: this.defaultHeaders
        });
    };

};

export default PostCategoryService