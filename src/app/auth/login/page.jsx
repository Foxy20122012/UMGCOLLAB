'use client'
import { useState } from 'react';
import presets from '../../../utils/globalPresets';
import Image from 'next/image';
import { EyeIcon, EyeSlashIcon, KeyIcon, UserIcon } from '@heroicons/react/20/solid';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginAdminService from '../../../services/umgService/collabAdmin/login/admin/loginAdminService'; // Importa el nuevo servicio

const RegisterForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const authService = new loginAdminService(); // Instancia del nuevo servicio

  const onSubmit = async (data) => {
    try {
      const response = await authService.postLoginAdmin(data);

      // Asegúrate de que la respuesta tenga el token correctamente
      if (response && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('¡Bienvenido, administrador!', {
          style: { backgroundColor: 'green', color: 'white' },
        });
        window.location.href = '/admin/profile';
      } else {
        throw new Error('Token no recibido');
      }
    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión:', error);
      toast.error('Credenciales incorrectas');
    }
  };

  return (
    <div className={'flex flex-wrap w-screen h-screen overflow-x-hidden bg-gray-200'}>
      <div className={'flex flex-shrink w-full h-full md:w-1/2 lg:w-1/3 bg-white'}>
        <div className={'rounded-lg w-full border-[#E9ECEF] border'}>
          <div className={'flex w-full p-4 justify-center overflow-hidden'}>
            <div className={'h-64 w-64 flex justify-center items-center shrink-0'}>
              <Image
                src={presets.images.logo}
                alt="logo"
                className={'w-52 h-52 border rounded-xl bg-slate-400 bg-center bg-auto bg-no-repeat object-contain'}
                width={75}
                height={75}
              />
            </div>
          </div>
          <div className="align-center flex w-full px-8 py-4">
            <div className={'flex w-full flex-col space-y-4'}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 select-none">
                    Usuario
                    <div className='inline-flex text-sm font-medium text-red-400'> (*)</div>
                  </label>
                  <div className='relative flex h-9 justify-between'>
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      {...register('correo', { required: true })}
                      className="w-full p-2 border-y border-l focus:border-gray-400 outline-none rounded-l-lg focus:border-r-none"
                      placeholder="example@email.com"
                    />
                    <div className='bg-cyan-500 hover:bg-cyan-600 text-white flex justify-center items-center p-2 rounded-r-lg cursor-pointer'>
                      <UserIcon className='h-5 w-5' />
                    </div>
                  </div>
                  {errors.correo && <p className="text-red-500 text-xs mt-1">El campo Usuario es requerido.</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600 select-none">
                    Clave
                    <div className='inline-flex text-sm font-medium text-red-400'> (*)</div>
                  </label>
                  <div className='relative flex h-9 justify-between'>
                    <input
                      type={passwordShown ? 'text' : 'password'}
                      id="contraseña"
                      name="contraseña"
                      {...register('contraseña', { required: true })}
                      className="w-full p-2 border-y border-l focus:border-gray-400 outline-none rounded-l-lg focus:border-r-none"
                    />
                    <div
                      className='bg-cyan-500 hover:bg-cyan-600 text-white flex justify-center items-center p-2 rounded-r-lg cursor-pointer'
                      onClick={() => { setPasswordShown(!passwordShown) }}
                    >
                      {!passwordShown ? <EyeSlashIcon className='h-5 w-5' /> : <EyeIcon className='h-5 w-5' />}
                    </div>
                  </div>
                  {errors.contraseña && <p className="text-red-500 text-xs mt-1">El campo Clave es requerido.</p>}
                </div>
                <div className="mb-4">
                  <button
                    type="submit"
                    className={`inline-flex w-full justify-center items-center h-9 px-2 m-1 text-white ease-linear transition-colors duration-150 rounded-md border ${isValid ? 'bg-red-500 hover:bg-red-600' : 'bg-red-300 cursor-not-allowed'}`}
                    disabled={!isValid}
                  >
                    <KeyIcon className="h-5 w-5 pr-2" />
                    Iniciar Sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className={'hidden flex-shrink h-full md:w-1/2 lg:w-2/3 md:flex bg-center bg-contain'}
        style={{ backgroundImage: `url(${presets.images.loginFondo})`, minHeight: '75vh', backgroundSize: 'cover' }}
      />
    </div>
  );
};

export default RegisterForm;
