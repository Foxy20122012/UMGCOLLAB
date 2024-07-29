export interface Tema {
  id: number;
  nombre: string;
  descripcion: string;
  curso_id: number;
}

export interface Cursos {
  [key: string]: any;
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  año: number | null;
  creditos: number | null;
  temas: Tema[];
}

