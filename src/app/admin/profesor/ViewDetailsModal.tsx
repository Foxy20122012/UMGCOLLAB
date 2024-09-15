import React from 'react';
import ModalBase from '../../../components/templates/ModalBase/index';
import { Usuario } from '../../../models/interface/user/User'; // Ajustar la ruta según tu proyecto
import { useTranslations } from 'next-intl';

interface Props {
  selectedProfesor: Usuario | null; // El profesor seleccionado
  onClose: () => void;
}

const ViewDetailsModal: React.FC<Props> = ({ selectedProfesor, onClose }) => {
  const t = useTranslations('general');

  // Si no hay detalles del profesor seleccionado
  if (!selectedProfesor) {
    return (
      <ModalBase onClose={onClose} title={t('details')} width={1200} className="bg-white rounded-lg shadow-xl">
        <div className="p-4">
          <p>No se encontraron detalles para el profesor seleccionado.</p>
        </div>
      </ModalBase>
    );
  }

  return (
    <ModalBase onClose={onClose} title={t('details')} width={1200} className="bg-white rounded-lg shadow-xl">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Detalles del Profesor</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Código de Usuario:</p>
            <p>{selectedProfesor.codigo_usuario}</p>
          </div>
          <div>
            <p className="font-medium">Nombre Completo:</p>
            <p>{`${selectedProfesor.nombre} ${selectedProfesor.apellido}`}</p>
          </div>
          <div>
            <p className="font-medium">Correo:</p>
            <p>{selectedProfesor.correo}</p>
          </div>
          <div>
            <p className="font-medium">Teléfono:</p>
            <p>{selectedProfesor.telefono || 'No disponible'}</p>
          </div>
          <div>
            <p className="font-medium">Rol:</p>
            <p>{selectedProfesor.rol}</p>
          </div>
          <div>
            <p className="font-medium">Fecha de Registro:</p>
            <p>{new Date(selectedProfesor.fecha_registro).toLocaleString()}</p>
          </div>
          <div>
            <p className="font-medium">Dirección:</p>
            <p>{selectedProfesor.direccion || 'No disponible'}</p>
          </div>
          <div>
            <p className="font-medium">Fecha de Nacimiento:</p>
            <p>{selectedProfesor.fecha_nacimiento || 'No disponible'}</p>
          </div>
          <div>
            <p className="font-medium">Estado Civil:</p>
            <p>{selectedProfesor.estado_civil || 'No disponible'}</p>
          </div>
          <div>
            <p className="font-medium">Ocupación:</p>
            <p>{selectedProfesor.ocupacion || 'No disponible'}</p>
          </div>
          <div>
            <p className="font-medium">Intereses:</p>
            <p>{selectedProfesor.intereses || 'No disponible'}</p>
          </div>
          <div>
            <p className="font-medium">Email Verificado:</p>
            <p>{selectedProfesor.email_verificado ? 'Sí' : 'No'}</p>
          </div>
          <div>
            <p className="font-medium">Teléfono Verificado:</p>
            <p>{selectedProfesor.telefono_verificado ? 'Sí' : 'No'}</p>
          </div>
          <div>
            <p className="font-medium">Activo:</p>
            <p>{selectedProfesor.activo ? 'Sí' : 'No'}</p>
          </div>
        </div>
      </div>
    </ModalBase>
  );
};

export default ViewDetailsModal;
