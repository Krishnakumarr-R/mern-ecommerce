import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PlusCircle,
  Upload,
  Loader,
  X,
  DollarSign,
  Package,
  FileText,
  Tag,
  ImageIcon,
  CheckCircle,
} from "lucide-react";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];
import { useProductStore } from "../stores/useProductStore";

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const { createProduct, loading } = useProductStore();

  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!newProduct.name.trim()) newErrors.name = "Product name is required";
    if (!newProduct.description.trim())
      newErrors.description = "Description is required";
    if (!newProduct.price || parseFloat(newProduct.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!newProduct.category) newErrors.category = "Category is required";
    if (!newProduct.image) newErrors.image = "Product image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Simulate API call

      setImagePreview(null);
      setErrors({});

      // Show success message (you can add toast notification here)
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.log("Error creating product:", error);
    }
  };

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
        setImagePreview(reader.result);
        setErrors({ ...errors, image: "" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleImageChange(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setNewProduct({ ...newProduct, image: "" });
    setImagePreview(null);
  };

  const handleInputChange = (field, value) => {
    setNewProduct({ ...newProduct, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 mb-8 max-w-2xl mx-auto border border-gray-200/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-4">
          <Package className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Create New Product
        </h2>
        <p className="text-gray-600">Add a new product to your inventory</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            <FileText className="inline h-4 w-4 mr-2" />
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`block w-full bg-white border-2 rounded-xl shadow-sm py-3 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
              errors.name
                ? "border-red-300"
                : "border-gray-200 hover:border-gray-300"
            }`}
            placeholder="Enter product name"
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            <FileText className="inline h-4 w-4 mr-2" />
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows="4"
            className={`block w-full bg-white border-2 rounded-xl shadow-sm py-3 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 resize-none ${
              errors.description
                ? "border-red-300"
                : "border-gray-200 hover:border-gray-300"
            }`}
            placeholder="Describe your product..."
            required
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Price and Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              <DollarSign className="inline h-4 w-4 mr-2" />
              Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                step="0.01"
                min="0"
                className={`block w-full bg-white border-2 rounded-xl shadow-sm py-3 pl-8 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                  errors.price
                    ? "border-red-300"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="0.00"
                required
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              <Tag className="inline h-4 w-4 mr-2" />
              Category
            </label>
            <select
              id="category"
              name="category"
              value={newProduct.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className={`block w-full bg-white border-2 rounded-xl shadow-sm py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${
                errors.category
                  ? "border-red-300"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <ImageIcon className="inline h-4 w-4 mr-2" />
            Product Image
          </label>

          {!imagePreview ? (
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive
                  ? "border-emerald-500 bg-emerald-50"
                  : errors.image
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 hover:border-gray-400 bg-gray-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="image"
                className="sr-only"
                accept="image/*"
                onChange={handleFileInput}
              />
              <div className="space-y-4">
                <div className="mx-auto flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                  >
                    Choose Image
                  </label>
                  <p className="mt-2 text-sm text-gray-600">
                    or drag and drop an image here
                  </p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="relative bg-gray-100 rounded-xl p-4">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 flex items-center text-sm text-emerald-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                Image uploaded successfully
              </div>
            </div>
          )}
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          {loading ? (
            <>
              <Loader
                className="mr-3 h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              Creating Product...
            </>
          ) : (
            <>
              <PlusCircle className="mr-3 h-5 w-5" />
              Create Product
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
