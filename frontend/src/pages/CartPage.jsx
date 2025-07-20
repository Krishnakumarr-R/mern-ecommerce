import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft, Package } from "lucide-react";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import OrderSummary from "../components/OrderSummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <div className="min-h-screen bg-gray-100 py-8 md:py-12 mt-10">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-emerald-600" />
                Shopping Cart
                {cart.length > 0 && (
                  <span className="bg-emerald-100 text-emerald-800 text-lg font-medium px-3 py-1 rounded-full">
                    {cart.length} {cart.length === 1 ? "item" : "items"}
                  </span>
                )}
              </h1>
              <p className="text-gray-600 mt-2">
                {cart.length === 0
                  ? "Your cart is waiting to be filled with amazing products"
                  : "Review your items and proceed to checkout"}
              </p>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </motion.div>

        <div className="gap-8 lg:flex lg:items-start">
          <motion.div
            className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <CartItem item={item} />
                  </motion.div>
                ))}
              </div>
            )}
            {cart.length > 0 && <PeopleAlsoBought />}
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              className="mx-auto mt-8 lg:mt-0 max-w-4xl flex-1 space-y-6 lg:w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <OrderSummary />
              <GiftCouponCard />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

const EmptyCartUI = () => (
  <motion.div
    className="bg-white rounded-xl shadow-sm border border-gray-200 p-12"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex flex-col items-center justify-center space-y-6 text-center">
      <div className="relative">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-16 h-16 text-gray-400" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
          <Package className="w-4 h-4 text-emerald-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">Your cart is empty</h3>
        <p className="text-gray-500 max-w-md">
          Looks like you haven't added anything to your cart yet. Start browsing
          our amazing products and find something you love!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link
          to="/"
          className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Start Shopping
        </Link>
        <Link
          to="/"
          className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-all duration-200"
        >
          View Featured Products
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8 opacity-60">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500">Easy Shopping</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Package className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-xs text-gray-500">Fast Delivery</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            ❤️
          </div>
          <p className="text-xs text-gray-500">Great Quality</p>
        </div>
      </div>
    </div>
  </motion.div>
);
