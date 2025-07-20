import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-100">
            <img
              className="w-full h-full object-cover"
              src={item.image}
              alt={item.name}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/128x128?text=No+Image";
              }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {item.name}
          </h3>
          {item.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {item.description}
            </p>
          )}

          {/* Mobile Price */}
          <div className="md:hidden mb-4">
            <span className="text-xl font-bold text-emerald-600">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              (${item.price} each)
            </span>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between md:justify-end md:flex-col md:items-end gap-4">
          <div className="flex items-center bg-gray-50 rounded-lg p-1">
            <button
              className="w-8 h-8 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>

            <span className="w-12 text-center font-semibold text-gray-900">
              {item.quantity}
            </span>

            <button
              className="w-8 h-8 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Desktop Price */}
          <div className="hidden md:block text-right">
            <div className="text-xl font-bold text-emerald-600">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">${item.price} each</div>
          </div>
        </div>

        {/* Remove Button */}
        <div className="flex justify-end md:justify-center">
          <button
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
            onClick={() => removeFromCart(item._id)}
            title="Remove item"
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
