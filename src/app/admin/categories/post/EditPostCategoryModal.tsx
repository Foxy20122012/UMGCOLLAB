import React, { useState, useEffect } from 'react';
import ModalBase from '../../../../components/templates/ModalBase/index';
import { useTranslations } from 'next-intl';
import { CiCircleCheck } from "react-icons/ci";
import { PostCategory } from '@/models/interface/categories/PostCategory';
import PostCategoryService from '../../../../services/umgService/collabAdmin/categories/postCategoryService';

interface Props {
    onClose: () => void;
    fetchPostCategory: () => void;
    currentPostCategory: any; // El tema actual que se va a editar
  }

  const EditPostCategory: React.FC<Props> = ({ onClose, fetchPostCategory, currentPostCategory}) => {
    const t = useTranslations('general');
    const [postCategory, setPostCategory] = useState<PostCategory[]>([]);
    const postCategoryService = new PostCategoryService();

    return(
        <ModalBase onClose={onClose} title={t('edit_details')} width={800} className="bg-white rounded-lg shadow-xl">
             <form onSubmit="" className="p-4">
                <div>

                </div>
             </form>

        </ModalBase>
    )
  }

  export default EditPostCategory;

















