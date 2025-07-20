import { motion } from "framer-motion";
import { Trash, Star, Package } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  console.log("products", products);

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
            <Package className="w-8 h-8 text-slate-600" />
            Products Management
          </h1>
          <p className="text-slate-600">
            Manage your product inventory with ease
          </p>
        </div>

        {/* Products Grid for Mobile, Table for Desktop */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {products?.map((product, index) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-slate-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 w-16 h-16">
                            <img
                              className="w-16 h-16 rounded-lg object-cover shadow-sm"
                              src={product.image}
                              alt={product.name}
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/64x64?text=No+Image";
                              }}
                            />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-slate-500 truncate max-w-xs">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-lg font-bold text-green-600">
                          ${product.price.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-800 capitalize">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleFeaturedProduct(product._id)}
                          className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${
                            product.isFeatured
                              ? "bg-yellow-100 text-yellow-600 shadow-md"
                              : "bg-slate-100 text-slate-400 hover:bg-yellow-50 hover:text-yellow-500"
                          }`}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              product.isFeatured ? "fill-current" : ""
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all duration-200 transform hover:scale-110"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            <div className="p-4 space-y-4">
              {products?.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-slate-50 rounded-lg p-4 shadow-sm border border-slate-200"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      className="w-16 h-16 rounded-lg object-cover shadow-sm flex-shrink-0"
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/64x64?text=No+Image";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 truncate">
                            {product.name}
                          </h3>
                          <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => toggleFeaturedProduct(product._id)}
                            className={`p-2 rounded-full transition-all duration-200 ${
                              product.isFeatured
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-slate-200 text-slate-400 hover:bg-yellow-50 hover:text-yellow-500"
                            }`}
                          >
                            <Star
                              className={`w-4 h-4 ${
                                product.isFeatured ? "fill-current" : ""
                              }`}
                            />
                          </button>
                          <button
                            onClick={() => deleteProduct(product._id)}
                            className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xl font-bold text-green-600">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-700 capitalize">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {(!products || products.length === 0) && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">
                No products found
              </h3>
              <p className="text-slate-500">
                Start by adding your first product to the inventory.
              </p>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {products && products.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>
                Total Products:{" "}
                <strong className="text-slate-800">{products.length}</strong>
              </span>
              <span>
                Featured:{" "}
                <strong className="text-yellow-600">
                  {products.filter((p) => p.isFeatured).length}
                </strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
