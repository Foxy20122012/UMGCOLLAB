import RestfulHandler from '../../../../../module/handler/restfulHandler';
import enviroment from '../../../../../settings/enviroments'

class approvedNewsService {
    constructor(){
        const {umgCollab} = enviroment.api
        this.service = new RestfulHandler(umgCollab.url, umgCollab.timeout);
        this.endpoint = umgCollab.endpoint.general.posts;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }

getPostsApproved = ()=>{
    const endpoint = this.endpoint.approved.approvedNews;
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    })
}

getPostsApprovedId = (id) => {
    const endpoint = this.endpoint.approved.approvedNewsId.replace('{id}', id);
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    });
}

}



export default approvedNewsService
