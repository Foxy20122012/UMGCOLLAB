import RestfulHandler from '../../../../module/handler/restfulHandler';
import enviroment from '../../../../settings/enviroments'

class DashboardService {
    constructor(){
        const {umgCollab} = enviroment.api
        this.service = new RestfulHandler(umgCollab.url, umgCollab.timeout);
        this.endpoint = umgCollab.endpoint.general.dashboard;
        this.defaultHeaders = {  
            'Content-Type': 'application/json'
        };
    }
getDashboard = ()=>{
    const endpoint = this.endpoint.dashboard;
    return this.service.request({
        method: 'GET',
        endpoint,
        headers: this.defaultHeaders
    })
}
}

export default DashboardService 
