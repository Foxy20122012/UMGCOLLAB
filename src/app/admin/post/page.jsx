'use client'
import React from "react";
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const PagePost =()=>{
    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };

    // Asumiendo que tienes un string HTML que quieres cargar en el editor
    const htmlContent = '<p>This is some <strong>sample text</strong> to display in read-only mode.</p>';

    return(
        <div className="text-center">
            Pagina de Post del administrador
            <Editor
        apiKey='95tmm378f0gu7o3uprvnwmydcxvf8bgyoms56luo6ilm69r1'
        onInit={(_evt, editor) => {
          editorRef.current = editor;
          editorRef.current.setContent(htmlContent);
        }}
        initialValue={htmlContent}
        init={{
          height: 500,
          menubar: false,  // No mostrar la barra de menú
          readonly: 1,     // Establece el editor en modo solo lectura
          toolbar: false,  // No mostrar ninguna herramienta en la barra de herramientas
          plugins: 'wordcount', // Solo cargar plugin de conteo de palabras si es necesario
          branding: false, // Eliminar la marca de TinyMCE (opcional)
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
        </div>
    )
}

export default PagePost;
