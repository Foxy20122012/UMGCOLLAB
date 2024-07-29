import FixedSizedImage from '../components/atoms/FixedSizeImage';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ImgNotFound from '../assets/images/404/404UMGCOLLAB.jpeg'

//const ImgNotFound = require('@/assets/images/404/404UMGCOLLAB.jpeg'|| "@/assets/images/404/404ADMIN.jpeg");
//const ImgNotFound = require('.'|| "@/assets/images/404/404ADMIN.jpeg");

const ErrorPage = () => {
  const t = useTranslations('general');

  return (
    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-full h-screen flex flex-col items-center justify-center text-center">
      <FixedSizedImage src={ImgNotFound} height={600} width={700} className="animate-none to-inherit hover:shadow-sm" />
      <div className="text-white text-3xl font-bold my-4">
        {t('not_found_page')}
      </div>
      <div className='bg-white text-primary font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-gray-100'>
      <Link href={'/'}>
          {t('go_to_home')}
      </Link>

      </div>

    </div>
  );
};

export default ErrorPage;
