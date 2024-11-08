import React from 'react';
import ModalBase from '../../../components/templates/ModalBase/index';
import { Usuario } from '../../../models/interface/user/User'; // Ajustar la ruta según tu proyecto
import { useTranslations } from 'next-intl';

interface Props {
  selectedStudent: Usuario | null; // El estudiante seleccionado
  onClose: () => void;
}

const ViewStudentDetailsModal: React.FC<Props> = ({ selectedStudent, onClose }) => {
  const t = useTranslations('general');

  // Función para formatear la fecha
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Si no hay detalles del estudiante seleccionado
  if (!selectedStudent) {
    return (
      <ModalBase onClose={onClose} title={t('details')} width={1200} className="bg-white rounded-lg shadow-xl">
        <div className="p-4">
          <p>No se encontraron detalles para el estudiante seleccionado.</p>
        </div>
      </ModalBase>
    );
  }

  return (
    <ModalBase onClose={onClose} title={t('details')} width={1200} className="bg-white rounded-lg shadow-xl">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Detalles del Estudiante</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Código de Usuario:</p>
            <p>{selectedStudent.codigo_usuario}</p>
          </div>
          <div>
            <p className="font-medium">Nombre Completo:</p>
            <p>{`${selectedStudent.nombre} ${selectedStudent.apellido}`}</p>
          </div>
          <div>
            <p className="font-medium">Correo:</p>
            <p>{selectedStudent.correo}</p>
          </div>
          <div>
            <p className="font-medium">Teléfono:</p>
            <p>{selectedStudent.telefono || 'No disponible'}</p>
          </div>
          <div>
            <p className="font-medium">Rol:</p>
            <p>{selectedStudent.rol}</p>
          </div>
          <div>
            <p className="font-medium">Fecha de Registro:</p>
            <p>{formatDate(selectedStudent.fecha_registro)}</p>
          </div>
          <div>
            <p className="font-medium">Dirección:</p>
            <p>{selectedStudent.direccion || 'No disponible'}</p>
          </div>
          <div>
            <p className="font-medium">Fecha de Nacimiento:</p>
            <p>{formatDate(selectedStudent.fecha_nacimiento)}</p>
          </div>
          <div>
            <p className="font-medium">Estado Civil:</p>
            <p>{selectedStudent.estado_civil || 'No disponible'}</p>
          </div>
          <div>
            <p className="font-medium">Ocupación:</p>
            <p>{selectedStudent.ocupacion || 'No disponible'}</p>
          </div>
          <div>
            <p className="font-medium">Intereses:</p>
            <p>{selectedStudent.intereses || 'No disponible'}</p>
          </div>
          <div>
            <p className="font-medium">Email Verificado:</p>
            <p>{selectedStudent.email_verificado ? 'Sí' : 'No'}</p>
          </div>
          <div>
            <p className="font-medium">Teléfono Verificado:</p>
            <p>{selectedStudent.telefono_verificado ? 'Sí' : 'No'}</p>
          </div>
          <div>
            <p className="font-medium">Activo:</p>
            <p>{selectedStudent.activo ? 'Sí' : 'No'}</p>
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export default ViewStudentDetailsModal;
