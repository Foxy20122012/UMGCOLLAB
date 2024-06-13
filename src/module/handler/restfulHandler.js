// RestfulHandler class
import axios from 'axios';

class RestfulHandler {
    constructor(urlBase, timeout) {
        this.urlBase = urlBase;
        this.timeout = timeout ?? 0;
    }

    request = (props) => {
        // Aquí aseguramos que construimos correctamente la URL final
        const url = this.urlBase + props.endpoint;
        const config = {
            ...props,  // propagamos todos los props existentes
            url: url,  // sobrescribimos la URL para incluir la base
            timeout: this.timeout,  // utilizamos el timeout del constructor
        };

        // Removemos 'endpoint' de los props ya que axios no lo necesita y puede generar errores si se envía.
        return axios(config);
    };
}

export default RestfulHandler;
