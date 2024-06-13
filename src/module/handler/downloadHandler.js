class DownloadHandler {    
    static pdf = (fileName,data) => {
        const a = document.createElement('a');
        a.setAttribute('style','display:none');
        const downloadFile = new Blob([data],{type:"application/pdf"})
        document.body.appendChild(a);
        a.download = fileName+".pdf";
        a.href = URL.createObjectURL(downloadFile);
        a.target = '_blank';
        a.click();
        window.URL.revokeObjectURL(a)
        document.body.removeChild(a);
    };

    static seePdf = (name, data)=>{
        const a = document.createElement('a');
        a.setAttribute('style','display:none');
        const downloadFile = new Blob([data],{type:"application/pdf"})
        document.body.appendChild(a);
        a.download = name+".pdf";
        a.href = URL.createObjectURL(downloadFile);
        a.target = '_blank';
        //a.click();
        window.open(a.href, "_blank")
        //window.open(a.href, a.download);
        window.URL.revokeObjectURL(a)
        document.body.removeChild(a);
    };

    static excel = (fileName,data) => {
        const a = document.createElement('a');
        a.setAttribute('style','display:none');
        const downloadFile = new Blob([data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
        document.body.appendChild(a);
        a.download = fileName+".xlsx";
        a.href = URL.createObjectURL(downloadFile);
        a.target = '_blank';
        a.click();
        window.URL.revokeObjectURL(a)
        document.body.removeChild(a);
    };
}

export default DownloadHandler;
