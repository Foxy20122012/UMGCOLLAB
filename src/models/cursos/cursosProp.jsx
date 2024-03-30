/**
 * @brief Modelo que sirve como base para inicializar los datos de un formulario de cursos.
 * @brief No es necesario que direccionen uno a uno a campos de estructuras de persistencia (base de datos).
 * @brief No es necesario que direccionen uno a uno a pantallas, pueden usarse uno o más en una pantalla.
 * @returns Las propiedades que inicializan un modelo de datos para cursos.
 */
const cursosProps = [
    {
      label: "Nombre",
      name: "nombre",
      type: "text",
      maxLength: 255,
    },
    {
      label: "Descripción",
      name: "descripcion",
      type: "text",
      maxLength: 1000, // Ajusta según la longitud máxima que desees para la descripción
    },
  ];
  
  export default cursosProps;
  