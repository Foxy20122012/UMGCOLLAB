import RestfulHandler from '../../../../../module/handler/restfulHandler';
import enviroment from '../../../../../settings/enviroments'

class visiblePostsService {
    constructor(){
        const {umgCollab} = enviroment.api
        this.service = new RestfulHandler(umgCollab.url, umgCollab.timeout);
        this.endpoint = umgCollab.endpoint.general.posts;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }
getPosts = ()=>{
    const endpoint = this.endpoint.pending.events;
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    })
}

visiblePosts = (data)=>{
    const endpoint = this.endpoint.approoval.approval
    return this.service.request({
        method: 'PUT',
        endpoint,
        data: data,
       
    })
}



}



export default visiblePostsService
