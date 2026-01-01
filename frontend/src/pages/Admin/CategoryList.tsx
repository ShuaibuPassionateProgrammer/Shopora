import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";
import { FaEdit, FaTrash } from "react-icons/fa";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category deletion failed. Try again.");
    }
  };

  return (
    <>
      <AdminMenu />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Category Management
          </h1>
          <p className="text-gray-400 mt-2">Create and manage product categories</p>
        </div>

        {/* Create Category Form */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-[#333] rounded-2xl p-8 shadow-premium mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Create New Category</h2>
          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
          />
        </div>

        {/* Categories Grid */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-[#333] rounded-2xl p-8 shadow-premium">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">All Categories</h2>
            <span className="text-sm text-gray-400">
              Total: <span className="text-primary font-semibold">{categories?.length || 0}</span>
            </span>
          </div>

          {categories?.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-[#2a2a2a] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-5xl">🏷️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Categories Yet</h3>
              <p className="text-gray-400">Create your first category to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories?.map((category) => (
                <div
                  key={category._id}
                  className="bg-[#0f0f10] border border-[#333] rounded-xl p-4 hover:border-primary transition-all duration-300 group cursor-pointer"
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-medium group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">Click to edit</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEdit className="text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit/Delete Modal */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </>
  );
};

export default CategoryList;
