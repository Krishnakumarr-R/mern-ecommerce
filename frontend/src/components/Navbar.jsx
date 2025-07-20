import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Menu,
  X,
  Search,
  Bell,
  User,
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ to, children, className = "", onClick }) => (
    <a
      href={to}
      onClick={onClick}
      className={`relative group px-3 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-emerald-50 ${className}`}
    >
      {children}
      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
    </a>
  );

  const Button = ({
    variant = "primary",
    size = "md",
    children,
    onClick,
    className = "",
  }) => {
    const baseClasses =
      "font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 rounded-lg";

    const variants = {
      primary:
        "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-500/25",
      secondary:
        "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300",
      ghost: "hover:bg-gray-100 text-gray-600 hover:text-gray-900",
      admin: "bg-emerald-700 hover:bg-emerald-600 text-white shadow-md",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200"
            : "bg-slate-50/90 backdrop-blur-md shadow-md border-b border-gray-100"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <a href="/" className="group flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                E-Commerce
              </span>
            </a>

            {/* Desktop Navigation */}
            {/* <nav className="hidden lg:flex items-center space-x-2">
              <NavLink to="/" className="text-gray-700 hover:text-emerald-600">
                Home
              </NavLink>

              {user && (
                <>
                  <NavLink
                    to="/products"
                    className="text-gray-700 hover:text-emerald-600"
                  >
                    Products
                  </NavLink>
                  <NavLink
                    to="/categories"
                    className="text-gray-700 hover:text-emerald-600"
                  >
                    Categories
                  </NavLink>
                </>
              )}
            </nav> */}

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              {/* <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-300">
                <Search size={18} />
              </button> */}

              {user && (
                <>
                  {/* Notifications */}
                  {/* <button className="relative w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-300 flex items-center justify-center">
                    <Bell size={18} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  </button> */}

                  {/* Cart */}
                  <a href="/cart" className="relative group">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-all duration-300 flex items-center justify-center group-hover:scale-105">
                      <ShoppingCart size={20} />
                    </div>
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg animate-bounce">
                        {cart.length}
                      </span>
                    )}
                  </a>
                </>
              )}

              {/* Admin Dashboard */}
              {isAdmin && (
                <a href="/secret-dashboard">
                  <Button variant="admin" size="sm" className="hidden md:flex">
                    <Lock size={16} />
                    <span className="hidden xl:inline">Dashboard</span>
                  </Button>
                </a>
              )}

              {/* User Actions */}
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* User Avatar */}
                  {/* <div className="hidden md:flex items-center space-x-3 bg-gray-100 rounded-lg px-3 py-2 hover:bg-gray-200 transition-colors">
                    <img
                      src={user.avatar || "/api/placeholder/32/32"}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-emerald-400"
                    />
                    <span className="text-sm font-medium text-gray-700 hidden lg:inline">
                      {user.name}
                    </span>
                  </div> */}

                  <Button variant="ghost" onClick={logout} size="sm">
                    <LogOut size={16} />
                    <span className="hidden xl:inline">Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <a href="/login">
                    <Button variant="secondary" size="sm">
                      <LogIn size={16} />
                      <span className="hidden md:inline">Login</span>
                    </Button>
                  </a>
                  <a href="/signup">
                    <Button variant="primary" size="sm">
                      <UserPlus size={16} />
                      <span className="hidden md:inline">Sign Up</span>
                    </Button>
                  </a>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all duration-300 flex items-center justify-center"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl transform transition-transform duration-300">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-2">
                <a
                  href="/"
                  className="block py-3 px-4 rounded-lg bg-emerald-50 text-emerald-700 font-medium"
                >
                  Home
                </a>
                {user && (
                  <>
                    {/* <a
                      href="/products"
                      className="block py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Products
                    </a>
                    <a
                      href="/categories"
                      className="block py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Categories
                    </a> */}
                    <a
                      href="/cart"
                      className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <span className="flex items-center gap-3">
                        <ShoppingCart size={20} />
                        Cart
                      </span>
                      {cart.length > 0 && (
                        <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          {cart.length}
                        </span>
                      )}
                    </a>
                  </>
                )}
              </nav>

              <div className="pt-6 border-t border-gray-200 space-y-4">
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50">
                      <img
                        src={user.avatar || "/api/placeholder/40/40"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-emerald-400"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500 capitalize">
                          {user.role}
                        </p>
                      </div>
                    </div>

                    {isAdmin && (
                      <a href="/secret-dashboard">
                        <Button
                          variant="admin"
                          className="w-full justify-center"
                        >
                          <Lock size={16} />
                          Dashboard
                        </Button>
                      </a>
                    )}

                    <Button
                      variant="ghost"
                      onClick={logout}
                      className="w-full justify-center"
                    >
                      <LogOut size={16} />
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="space-y-3 ">
                    <a href="/login">
                      <Button
                        variant="secondary"
                        className="w-full justify-center"
                      >
                        <LogIn size={16} />
                        Login
                      </Button>
                    </a>
                    <a href="/signup">
                      <Button
                        variant="primary"
                        className="w-full justify-center mt-3"
                      >
                        <UserPlus size={16} />
                        Sign Up
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
