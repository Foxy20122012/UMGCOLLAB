export interface Tema {
  id: number;
  nombre: string;
  descripcion: string;
  curso_id: number;
}

export interface Cursos {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  semestre: number | null;
  creditos: number | null;
  temas: Tema[];
}
