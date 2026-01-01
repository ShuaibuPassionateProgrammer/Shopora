import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineEye } from "react-icons/ai";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-600" />);
    }
    return stars;
  };

  return (
    <div className="group bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-[#333] rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-premium-lg flex flex-col h-full">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${p._id}`}>
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Hover Overlay with Quick Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            to={`/product/${p._id}`}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:scale-110"
            title="View Details"
          >
            <AiOutlineEye className="text-white text-xl" />
          </Link>
          <button
            onClick={() => addToCartHandler(p, 1)}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-all duration-300 transform hover:scale-110"
            title="Add to Cart"
          >
            <AiOutlineShoppingCart className="text-white text-xl" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full border border-primary/30 backdrop-blur-sm">
            {p?.brand}
          </span>
          {p.countInStock === 0 && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Heart Icon */}
        <HeartIcon product={p} />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Product Name */}
        <Link to={`/product/${p._id}`}>
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem]">
            {p?.name}
          </h3>
        </Link>

        {/* Rating */}
        {p.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {renderStars(p.rating)}
            </div>
            <span className="text-sm text-gray-400">
              ({p.numReviews || 0})
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
          {p?.description?.substring(0, 80)}...
        </p>

        {/* Price and Actions */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#333]">
          <div>
            <span className="text-2xl font-bold text-white">
              ${p?.price?.toFixed(2)}
            </span>
            {p.countInStock > 0 && p.countInStock < 10 && (
              <p className="text-xs text-yellow-400 mt-1">
                Only {p.countInStock} left!
              </p>
            )}
          </div>
          <Link
            to={`/product/${p._id}`}
            className="px-4 py-2 bg-primary/20 hover:bg-primary text-primary hover:text-white border border-primary/30 hover:border-primary rounded-lg font-medium transition-all duration-300 text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
