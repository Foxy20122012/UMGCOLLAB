import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { FaPlus } from "react-icons/fa";
import { EyeIcon } from '@heroicons/react/24/solid';
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import PostCategoryService from '../../../../services/umgService/collabAdmin/categories/postCategoryService';
import { PostCategory } from '@/models/interface/categories/PostCategory';

import InsertPostCategoryModal from './insertPostCategoryModal'; 
import EditPostCategory from './EditPostCategoryModal'; 
import DeleteConfirmationModal from "../../../../components/general/DeleteConfirmationModal/DeleteConfirmationModal";
import ViewDetailsModal from './ViewDetailsModal'; 

const PostCategoryPage = () => {
    const [postCategory, setPostCategory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTopicToDelete, setSelectedTopicToDelete] = useState(null);

    const postCategoryService = new PostCategoryService();
return(
    <div>

    </div>
)
}

export default PostCategoryPage;