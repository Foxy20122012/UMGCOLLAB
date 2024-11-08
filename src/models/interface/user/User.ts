export interface Usuario {
    id: number;
    codigo_usuario: string;
    nombre: string;
    correo: string;
    contraseña: string;
    imagen_perfil: string | null; // Puede ser `null`
    telefono: string | null;
    apellido: string | null;
    rol: 'administrador' | 'catedratico' | 'estudiante' | 'visitante';
    puesto: string | null;
    id_posicion: number | null;
    fecha_nacimiento: string | null; // Formato 'YYYY-MM-DD'
    direccion: string | null;
    genero: 'masculino' | 'femenino' | 'otro' | null;
    fecha_registro: string; // Formato timestamp
    ultima_fecha_acceso: string | null; // Formato timestamp
    numero_identificacion: string | null;
    estado_civil: 'soltero' | 'casado' | 'divorciado' | 'viudo' | 'otro' | null;
    ocupacion: string | null;
    intereses: string | null;
    preferencias_notificacion: {
      email: boolean;
      sms: boolean;
    };
    email_verificado: boolean;
    telefono_verificado: boolean;
    firma_digital: string | null;
    biometria: string | null;
    historial_login: any; // Puede ser tipo JSON
    activo: boolean;
  }
  