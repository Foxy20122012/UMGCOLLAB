import RestfulHandler from '../../../../../module/handler/restfulHandler';
import enviroment from '../../../../../settings/enviroments'

class approvedPostsService {
    constructor(){
        const {umgCollab} = enviroment.api
        this.service = new RestfulHandler(umgCollab.url, umgCollab.timeout);
        this.endpoint = umgCollab.endpoint.general.posts;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }

getPostsApproved = ()=>{
    const endpoint = this.endpoint.approved.approvedPosts;
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    })
}


getPostsApprovedId = (id) => {
    const endpoint = this.endpoint.approved.approvedPostsId.replace('{id}', id);
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    });
}

}



export default approvedPostsService;