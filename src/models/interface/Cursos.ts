export interface Cursos {
    CursoId: number
    Curso: string
    DescripcionCurso: string
    Semestre: number
    Creditos: number
    Temas: Tema[]
  }
  
  export interface Tema {
    id: number
    nombre: string
    descripcion: string
    curso_id: number
  }