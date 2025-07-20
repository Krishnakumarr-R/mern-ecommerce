import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      // add to cart
      addToCart(product);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50">
        <div className="aspect-square relative">
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={product.image}
            alt={product.name}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center">
          <span className="text-3xl font-bold text-emerald-600">
            ${product.price}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-300"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={20} className="mr-2" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
