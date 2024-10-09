import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments'

class PostsService {
    constructor(){
        const {umgCollab} = enviroment.api
        this.service = new RestfulHandler(umgCollab.url, umgCollab.timeout);
        this.endpoint = umgCollab.endpoint.general.posts;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }
getPosts = ()=>{
    const endpoint = this.endpoint.posts;
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    })
}

createPosts = (data)=>{
    const endpoint = this.endpoint.posts;
    return this.service.request({
        method: 'POST',
        endpoint,
        data: data,
        headers: this.defaultHeaders
    })
}

updatePosts = (id, data) => {
    const endpoint = `${this.endpoint.posts}/${id}`; // Asume que la API acepta el ID en la URL
    return this.service.request({
        method: 'PUT',
        endpoint,
        data: data,
        headers: this.defaultHeaders
    });
};

deletePosts = (id) => {
    const endpoint = `${this.endpoint.posts}/${id}`; // Asume que la API acepta el ID en la URL
    return this.service.request({
        method: 'DELETE',
        endpoint,
        headers: this.defaultHeaders
    });
};
}



export default PostsService
