import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="text-2xl font-bold mb-6 text-primary">Create Product</div>

          {imageUrl && (
            <div className="text-center mb-6">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px] rounded-lg shadow-premium"
              />
            </div>
          )}

          <div className="mb-6">
            <label className="border-2 border-dashed border-[#333] hover:border-primary text-white px-4 block w-full text-center rounded-xl cursor-pointer font-bold py-11 bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] transition-all duration-300 hover:shadow-glow">
              {image ? image.name : "📁 Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap gap-6">
              <div className="flex-1 min-w-[300px]">
                <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex-1 min-w-[300px]">
                <label htmlFor="price" className="block text-gray-300 mb-2 font-medium">Price</label>
                <input
                  type="number"
                  id="price"
                  className="w-full"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex-1 min-w-[300px]">
                <label htmlFor="quantity" className="block text-gray-300 mb-2 font-medium">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  className="w-full"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="flex-1 min-w-[300px]">
                <label htmlFor="brand" className="block text-gray-300 mb-2 font-medium">Brand</label>
                <input
                  type="text"
                  id="brand"
                  className="w-full"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="description" className="block text-gray-300 mb-2 font-medium">
                Description
              </label>
              <textarea
                id="description"
                className="w-full min-h-[120px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="flex gap-6 mt-6">
              <div className="flex-1">
                <label htmlFor="stock" className="block text-gray-300 mb-2 font-medium">Count In Stock</label>
                <input
                  type="text"
                  id="stock"
                  className="w-full"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="flex-1">
                <label htmlFor="category" className="block text-gray-300 mb-2 font-medium">Category</label>
                <select
                  id="category"
                  placeholder="Choose Category"
                  className="w-full"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="btn-primary py-4 px-10 mt-8 text-lg"
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
