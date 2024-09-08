import React, { useState, useEffect } from 'react';
import ModalBase from '../../../../components/templates/ModalBase/index';
import { useTranslations } from 'next-intl';
import { PostCategory } from '@/models/interface/categories/PostCategory';
import PostCategoryService from '../../../../services/umgService/collabAdmin/categories/postCategoryService';


interface Props {
    selectedPostCategory: any;
    onClose: () => void;
  }

  const ViewDetailsModal: React.FC<Props> = ({ selectedPostCategory, onClose }) => {
    const t = useTranslations('general');
return(
    <ModalBase onClose={onClose} title={t('details')} width={1200} className="bg-white rounded-lg shadow-xl">

    </ModalBase>
)
  }

    export default ViewDetailsModal;