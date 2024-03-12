export interface Tema {
  id: number;
  nombre: string;
  descripcion: string;
  curso_id: number;
}

export interface Cursos {
  CursoId: number;
  codigo: string;
  Curso: string;
  DescripcionCurso: string;
  Semestre: number;
  Creditos: number;
  Temas: Tema[];
}
