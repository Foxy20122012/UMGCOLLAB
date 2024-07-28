import { useCallback, useMemo } from 'react';
import { IconType } from 'react-icons'; // Importa el tipo para los iconos de react-icons

interface IconButtonProps {
  onClick?: () => void;
  icon: IconType; // Asegúrate de que solo acepte iconos
  className?: string;
  disabled?: boolean;
  size?: 'mini' | 'normal';
  hideBorder?: boolean;
  transparent?: boolean;
  iconColor?: string; // Nueva prop para el color del icono
}

const IconedButton = (props: IconButtonProps) => {
  const handleOnClick = useCallback(() => {
    props.onClick && !props.disabled && props.onClick();
  }, [props]);

  const iconSize = useMemo(() => {
    switch (props.size) {
      case 'mini':
        return 12;
      case 'normal':
        return 24;
      default:
        return 24;
    }
  }, [props.size]);

  return (
    <button
      className={`border hover:bg-opaque0 ${
        props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      } 
      
      ${props.transparent ? 'bg-transparent' : 'bg-white'}
      ${
        props.hideBorder
          ? ''
          : props.disabled
          ? 'border-sky-600'
          : 'border-sky-600'
      }
      
      rounded p-[2px]`}
      onClick={handleOnClick}
      disabled={props.disabled}
    >
      <props.icon
        size={iconSize}
        color={props.iconColor || 'sky-600'} // Usar el color pasado o el color por defecto
        className={`w-[${iconSize}px] h-[${iconSize}px] ${
          props.disabled ? 'filter grayscale' : ''
        } ${props.className}`}
      />
    </button>
  );
}

export default IconedButton;
