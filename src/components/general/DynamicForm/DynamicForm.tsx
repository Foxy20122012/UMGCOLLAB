import React, { useState, useEffect, useRef } from 'react';
import { CiCircleCheck } from "react-icons/ci";
import { LuPen } from "react-icons/lu";

interface FormFieldOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface FormField {
  label: string;
  name: string;
  type: 'text' | 'number' | 'select';
  options?: FormFieldOption[];
  required?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  isOpen?: boolean;
  minLength?: number;
}

interface DynamicFormProps {
  formProps: FormField[];
  onSubmit: (data: any) => void;
  showCreateButton: boolean;
  showUpdateButton: boolean;
  initialFormData?: any;
  onUpdateClick?: () => void;
  onCancelClick?: () => void;
  columns?: number;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  formProps,
  onSubmit,
  showCreateButton,
  showUpdateButton,
  initialFormData,
  onUpdateClick,
  onCancelClick,
  columns = 1
}) => {
  const [formData, setFormData] = useState<any>(initialFormData || {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const transformedData = { ...formData };
    formProps.forEach((field) => {
      if (field.type === 'select') {
        const selectedOption = field.options?.find(
          (option) => option.value === transformedData[field.name]
        );
        transformedData[field.name] = selectedOption ? selectedOption.label : '';
      }
    });
    onSubmit(transformedData);
  };

  const handleCreateClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  const handleUpdateClick = () => {
    if (onUpdateClick) {
      onUpdateClick();
      if (formRef.current) {
        formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form ref={formRef} className={`grid grid-cols-${columns}`} onSubmit={handleSubmit}>
        {formProps.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-gray-700 text-base font-semibold mb-2">
              {field.label}<span className='text-red-600'>(*)</span>
            </label>
            <div className="mx-2">
              {field.type === 'select' ? (
                <select
                  className="border rounded-md w-full py-2 px-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:shadow-outline"
                  name={field.name}
                  required={field.required}
                  // @ts-ignore
                  onChange={handleChange}
                  value={formData[field.name] || ''}
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.icon && <span className="mr-2 inline">{option.icon}</span>}
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="border rounded-md w-full py-2 px-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:shadow-outline"
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  onChange={handleChange}
                  value={formData[field.name] || ''}
                  readOnly={field.readOnly}
                  maxLength={field.maxLength}
                  minLength={field.minLength}
                  placeholder={field.label}
                />
              )}
            </div>
          </div>
        ))}
      </form>

      <div className="mt-4 flex justify-end">
        {showCreateButton && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mr-2"
            type="button"
            onClick={handleCreateClick}
          >
            Crear <CiCircleCheck className="inline ml-2 text-2xl font-extrabold" />
          </button>
        )}
        {showUpdateButton && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleUpdateClick}
          >
            Actualizar <LuPen className="inline ml-2 text-xl font-bold text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;
