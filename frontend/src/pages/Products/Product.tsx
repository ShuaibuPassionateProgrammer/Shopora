import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="card-premium group w-full">
      <div className="image-container mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg"
        />
        <HeartIcon product={product} />
      </div>

      <div className="space-y-3">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-start gap-3 group/title">
            <span className="text-lg font-semibold text-white group-hover/title:text-primary transition-colors line-clamp-2">
              {product.name}
            </span>
            <span className="badge-price shrink-0">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
