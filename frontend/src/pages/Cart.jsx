import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress Stepper */}
      <div className="mb-12">
        <div className="flex items-center justify-center max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-glow">
              1
            </div>
            <span className="text-sm mt-2 text-primary font-medium">Cart</span>
          </div>
          <div className="flex-1 h-0.5 bg-[#333] mx-4"></div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center text-gray-400 font-bold">
              2
            </div>
            <span className="text-sm mt-2 text-gray-400">Shipping</span>
          </div>
          <div className="flex-1 h-0.5 bg-[#333] mx-4"></div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center text-gray-400 font-bold">
              3
            </div>
            <span className="text-sm mt-2 text-gray-400">Payment</span>
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-32 h-32 bg-[#2a2a2a] rounded-full flex items-center justify-center mb-6">
            <FaShoppingCart className="text-6xl text-gray-600" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Your cart is empty</h3>
          <p className="text-gray-400 mb-6">Add some products to get started!</p>
          <Link to="/shop" className="btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </h1>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-[#333] rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link to={`/product/${item._id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg border border-[#333] hover:border-primary transition-colors"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item._id}`}
                        className="text-lg font-medium text-white hover:text-primary transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-400 mt-1">{item.brand}</p>
                      <p className="text-2xl font-bold text-white mt-3">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCartHandler(item._id)}
                        className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                        title="Remove item"
                      >
                        <FaTrash size={18} />
                      </button>

                      <div className="flex items-center gap-3 bg-[#0f0f10] border border-[#333] rounded-lg p-2">
                        <button
                          onClick={() => addToCartHandler(item, Math.max(1, item.qty - 1))}
                          disabled={item.qty <= 1}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a1a1a] border border-[#333] hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="text-white font-medium w-8 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => addToCartHandler(item, Math.min(item.countInStock, item.qty + 1))}
                          disabled={item.qty >= item.countInStock}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a1a1a] border border-[#333] hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Stock Warning */}
                  {item.qty >= item.countInStock && (
                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <p className="text-xs text-yellow-400">
                        Maximum quantity reached ({item.countInStock} in stock)
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary - Sticky */}
          <aside className="lg:w-96 flex-shrink-0">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-[#333] rounded-2xl p-6 shadow-premium sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="font-medium text-primary">FREE</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="border-t border-[#333] pt-4 flex justify-between">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <FaArrowRight />
              </button>

              <div className="mt-6 pt-6 border-t border-[#333]">
                <Link
                  to="/shop"
                  className="text-primary hover:text-primary-600 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
