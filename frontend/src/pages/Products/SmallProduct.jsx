import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-[#333] rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-premium group">
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Brand Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full border border-primary/30 backdrop-blur-sm">
              {product.brand}
            </span>
          </div>

          <HeartIcon product={product} />
        </div>

        <div className="p-4">
          <h3 className="text-white font-medium mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xs ${i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-600"
                      }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">
                ({product.numReviews || 0})
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-white">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-primary font-medium">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SmallProduct;
