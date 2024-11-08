import axios from 'axios';

class RestfulHandler {
    constructor(urlBase, timeout) {
        this.urlBase = urlBase;
        this.timeout = timeout ?? 0;
    }

    request = (props) => {
        const url = this.urlBase + props.endpoint;
        const config = {
            ...props,
            url: url,
            timeout: this.timeout,
        };

        // Removemos 'endpoint' de los props
        return axios(config).catch(error => {
            console.error('Error en la solicitud:', error);
            throw error;
        });
    };
}

export default RestfulHandler;
