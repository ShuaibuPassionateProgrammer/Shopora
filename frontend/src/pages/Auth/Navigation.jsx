import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { FaHeart, FaUser, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-[#0f0f10] border-b border-[#333] sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <AiOutlineShopping className="text-white text-2xl" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Shopora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors duration-300 group"
            >
              <AiOutlineHome className="text-xl group-hover:scale-110 transition-transform" />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              to="/shop"
              className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors duration-300 group"
            >
              <AiOutlineShopping className="text-xl group-hover:scale-110 transition-transform" />
              <span className="font-medium">Shop</span>
            </Link>

            <Link
              to="/favorite"
              className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors duration-300 group relative"
            >
              <FaHeart className="text-lg group-hover:scale-110 transition-transform" />
              <span className="font-medium">Favorites</span>
              <FavoritesCount />
            </Link>

            <Link
              to="/cart"
              className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors duration-300 group relative"
            >
              <div className="relative">
                <AiOutlineShoppingCart className="text-2xl group-hover:scale-110 transition-transform" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                )}
              </div>
              <span className="font-medium">Cart</span>
            </Link>
          </div>

          {/* User Menu / Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {userInfo ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#333] hover:border-primary transition-all duration-300 group"
                >
                  <FaUser className="text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-white font-medium">{userInfo.username}</span>
                  <FaChevronDown
                    className={`text-gray-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-premium overflow-hidden animate-slideIn">
                    {userInfo.isAdmin && (
                      <>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-3 text-gray-300 hover:bg-[#2a2a2a] hover:text-primary transition-all duration-300"
                          onClick={() => setDropdownOpen(false)}
                        >
                          📊 Dashboard
                        </Link>
                        <Link
                          to="/admin/productlist"
                          className="block px-4 py-3 text-gray-300 hover:bg-[#2a2a2a] hover:text-primary transition-all duration-300"
                          onClick={() => setDropdownOpen(false)}
                        >
                          📦 Products
                        </Link>
                        <Link
                          to="/admin/categorylist"
                          className="block px-4 py-3 text-gray-300 hover:bg-[#2a2a2a] hover:text-primary transition-all duration-300"
                          onClick={() => setDropdownOpen(false)}
                        >
                          🏷️ Categories
                        </Link>
                        <Link
                          to="/admin/orderlist"
                          className="block px-4 py-3 text-gray-300 hover:bg-[#2a2a2a] hover:text-primary transition-all duration-300"
                          onClick={() => setDropdownOpen(false)}
                        >
                          🛍️ Orders
                        </Link>
                        <Link
                          to="/admin/userlist"
                          className="block px-4 py-3 text-gray-300 hover:bg-[#2a2a2a] hover:text-primary transition-all duration-300"
                          onClick={() => setDropdownOpen(false)}
                        >
                          👥 Users
                        </Link>
                        <div className="border-t border-[#333]"></div>
                      </>
                    )}
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-gray-300 hover:bg-[#2a2a2a] hover:text-primary transition-all duration-300"
                      onClick={() => setDropdownOpen(false)}
                    >
                      👤 Profile
                    </Link>
                    <button
                      onClick={() => {
                        logoutHandler();
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-[#2a2a2a] hover:text-red-400 transition-all duration-300"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-primary font-medium transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary px-6 py-2"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-300 hover:text-primary transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <AiOutlineClose className="text-2xl" />
            ) : (
              <AiOutlineMenu className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#333] animate-slideIn">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-primary rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <AiOutlineHome className="text-xl" />
                <span className="font-medium">Home</span>
              </Link>

              <Link
                to="/shop"
                className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-primary rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <AiOutlineShopping className="text-xl" />
                <span className="font-medium">Shop</span>
              </Link>

              <Link
                to="/favorite"
                className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-primary rounded-lg transition-all duration-300 relative"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaHeart className="text-lg" />
                <span className="font-medium">Favorites</span>
                <FavoritesCount />
              </Link>

              <Link
                to="/cart"
                className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-primary rounded-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="relative">
                  <AiOutlineShoppingCart className="text-xl" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </span>
                  )}
                </div>
                <span className="font-medium">Cart</span>
              </Link>

              {userInfo ? (
                <>
                  <div className="border-t border-[#333] my-2"></div>
                  {userInfo.isAdmin && (
                    <>
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-primary rounded-lg transition-all duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>📊 Dashboard</span>
                      </Link>
                      <Link
                        to="/admin/productlist"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-primary rounded-lg transition-all duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>📦 Products</span>
                      </Link>
                      <Link
                        to="/admin/categorylist"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-primary rounded-lg transition-all duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>🏷️ Categories</span>
                      </Link>
                      <Link
                        to="/admin/orderlist"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-primary rounded-lg transition-all duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>🛍️ Orders</span>
                      </Link>
                      <Link
                        to="/admin/userlist"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-primary rounded-lg transition-all duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>👥 Users</span>
                      </Link>
                    </>
                  )}
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-primary rounded-lg transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUser className="text-lg" />
                    <span className="font-medium">Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      logoutHandler();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 text-left text-gray-300 hover:bg-[#1a1a1a] hover:text-red-400 rounded-lg transition-all duration-300 w-full"
                  >
                    <span>🚪 Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-[#333] my-2"></div>
                  <Link
                    to="/login"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-[#1a1a1a] hover:text-primary rounded-lg transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <AiOutlineLogin className="text-xl" />
                    <span className="font-medium">Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-primary to-primary-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-glow"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <AiOutlineUserAdd className="text-xl" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

