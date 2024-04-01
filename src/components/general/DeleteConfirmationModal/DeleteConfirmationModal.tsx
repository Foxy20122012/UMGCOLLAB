import React, { useState, useEffect } from 'react';
import ModalBase from '@/components/templates/ModalBase';
import { MdOutlineAccessTime } from "react-icons/md";
import { useTranslations } from 'next-intl';

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message: string; // Nueva prop para el mensaje de confirmación
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  message, // Utilizar la prop message en lugar del mensaje estático
}) => {
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5); // Inicialmente 5 segundos
  const t = useTranslations('general');

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds === 1) {
          setIsConfirmEnabled(true);
          clearInterval(timer); // Detener el temporizador cuando se alcanza 0
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Limpiar el temporizador al desmontar el componente
  }, []);

  const handleConfirmClick = () => {
    onConfirm();
    setIsConfirmEnabled(false); // Deshabilitar el botón después de confirmar
  };

  return (
    <ModalBase onClose={onCancel} title={t('details')} width={600} className="bg-white rounded-lg shadow-xl">
      <div className="p-6">
        <p className="text-lg text-gray-800">{message}</p>
       
        <div className="mt-6 flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmClick}
            className={`flex items-center px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${!isConfirmEnabled && 'cursor-not-allowed opacity-50'}`}
            disabled={!isConfirmEnabled}
          >
            {isConfirmEnabled ? 'Eliminar' : `${secondsLeft} segundos `}
            {!isConfirmEnabled && <span className="ml-1"><MdOutlineAccessTime /></span>}
          </button>
        </div>
      </div>
    </ModalBase>
  );
};

export default DeleteConfirmationModal;
