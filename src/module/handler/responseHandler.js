// import Security from "../security";
import Messages from "../../template/component/messages";

class ResponseHandler {
    static error = (error) => {
        if (JSON.stringify(error) === '{}') {
            Messages.notify('Error inesperado. Favor comunicarse con el departamento de informática', 'error');
            return;
        }
        
        if (error.response === undefined && error.message.includes('timeout')) {
            alert('Tiempo de respuesta de solicitud excedido. Favor comunicarse con el departamento de informática');
            return;
        }

        if (error.response === undefined && error.message.includes('Network Error')) {
            alert('Error de comunicación con el servicio. Favor comunicarse con el departamento de informática');
            return;
        }
        
        if (error.response.status === 413) {
            alert('El tamaño de los archivos adjuntos excede el máximo permitido de 7MB, quite o reduzca el tamaño de los adjuntos.');
            return;
        }
        // if (error.response.status === 401) {
        //     window.location = Security.loginUrl();
        //     return;
        // }
        if(error.response.status === 404){
            Messages.notify('Error. Servicio no disponible', 'error');
            return;
        }
        Messages.notify(error.response.data, 'error');
    };
}

export default ResponseHandler;
