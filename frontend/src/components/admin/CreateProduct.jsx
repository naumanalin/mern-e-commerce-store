import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import {
  User,
  PlusCircle,
  DollarSign,
  Tags,
  Upload,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import { createProduct } from '../../redux/adminDashbaordSlice';

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const CreateProduct = ({ setActiveTab }) => {
  const dispatch = useDispatch();

  const [newProductData, setNewProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '', // just for preview
  });

  const [file, setFile] = useState(null); // actual file for FormData
  const [isLoading, setIsLoading] = useState(false); // loading state

  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProductData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChange = (e) => {
    setNewProductData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    
    if (!newProductData.name || !newProductData.price || !file) {
      alert('Please fill all required fields');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', newProductData.name);
    formData.append('description', newProductData.description);
    formData.append('price', newProductData.price);
    formData.append('category', newProductData.category);
    formData.append('image', file); 
  
    setIsLoading(true);
  
    try {
      const res = await dispatch(createProduct(formData));
      
      if (res.meta.requestStatus === 'fulfilled') {
        setActiveTab('products');
        setNewProductData({
          name: '',
          description: '',
          price: '',
          category: '',
          image: '',
        });
        setFile(null);
      }
    } catch (error) {
      console.error('Product creation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleForm}
      className="rounded-2xl p-6 w-full sm:max-w-4xl mx-auto bg-gray-800 min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="logo mb-5 text-white text-2xl font-bold">Create New Product</h1>

      {/* Name */}
      <FormGroup
        label="Product Name"
        icon={<User className="h-5 w-5 text-gray-300" />}
        inputProps={{
          type: "text",
          name: "name",
          value: newProductData.name,
          onChange: handleChange,
          placeholder: "Enter product name",
          required: true,
        }}
      />

      {/* Description */}
      <div className="mb-7">
        <label htmlFor="description" className="font-semibold text-xl mb-2 block text-white">
          Description
        </label>
        <div className="bg-gray-600 flex gap-2 p-4 rounded-md items-start">
          <PlusCircle className="h-5 w-5 text-gray-300 mt-1" />
          <textarea
            name="description"
            id="description"
            value={newProductData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full bg-transparent text-white outline-none border-none"
            rows={3}
            required
          />
        </div>
      </div>

      {/* Price */}
      <FormGroup
        label="Price"
        icon={<DollarSign className="h-5 w-5 text-gray-300" />}
        inputProps={{
          type: "number",
          name: "price",
          value: newProductData.price,
          onChange: handleChange,
          placeholder: "Enter price",
          required: true,
        }}
      />

      {/* Category */}
      <div className="mb-7">
        <label htmlFor="category" className="font-semibold text-xl mb-2 block text-white">
          Category
        </label>
        <div className="bg-gray-600 flex gap-2 p-4 rounded-md items-center">
          <Tags className="h-5 w-5 text-gray-300" />
          <select
            name="category"
            id="category"
            value={newProductData.category}
            onChange={handleChange}
            className="w-full bg-gray-600 text-white outline-none border-none"
            required
          >
            <option value="">Select a category</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Upload Image */}
      <div className="mb-7">
        <label htmlFor="image" className="font-semibold text-xl mb-2 block text-white">
          Upload Image
        </label>
        <div className="bg-gray-600 flex gap-2 p-4 rounded-md items-center">
          <Upload className="h-5 w-5 text-gray-300" />
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImage}
            className="w-full text-white"
            required
          />
        </div>
        {newProductData.image && (
          <div className="mt-4 w-32 h-32 border-2 border-white rounded-md overflow-hidden">
            <img src={newProductData.image} alt="preview" className="object-cover w-full h-full" />
          </div>
        )}
      </div>

      {/* Submit Button with Spinner */}
      <button
        className="w-full flex items-center justify-center gap-3 p-2 rounded-md text-gray-300 bg-green-400 border-2 border-white font-semibold disabled:opacity-50"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Uploading...
          </>
        ) : (
          <>
            <Upload className="h-5 w-5" /> Create Product
          </>
        )}
      </button>
    </motion.form>
  );
};

export default CreateProduct;

// 👇 Helper Input Group
const FormGroup = ({ label, icon, inputProps }) => (
  <div className="mb-7">
    <label htmlFor={inputProps.name} className="font-semibold text-xl mb-2 block text-white">
      {label}
    </label>
    <div className="bg-gray-600 flex gap-2 p-4 rounded-md items-center">
      {icon}
      <input
        {...inputProps}
        className="w-full bg-transparent text-white outline-none border-none"
      />
    </div>
  </div>
);
