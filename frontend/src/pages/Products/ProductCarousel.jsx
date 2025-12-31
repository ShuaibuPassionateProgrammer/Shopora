import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <div className="image-container mb-6">
                  <img
                    src={image}
                    alt={name}
                    className="w-full rounded-xl object-cover h-[30rem]"
                  />
                </div>

                <div className="space-y-6">
                  {/* Product Title and Price */}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">{name}</h2>
                    <p className="text-3xl font-bold text-gradient">$ {price}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed max-w-2xl">
                    {description.substring(0, 170)} ...
                  </p>

                  {/* Product Info Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-gray-300">
                        <FaStore className="text-primary text-lg" />
                        <span className="text-sm">
                          <span className="text-gray-500">Brand:</span> <span className="font-medium">{brand}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <FaClock className="text-primary text-lg" />
                        <span className="text-sm">
                          <span className="text-gray-500">Added:</span> <span className="font-medium">{moment(createdAt).fromNow()}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <FaStar className="text-primary text-lg" />
                        <span className="text-sm">
                          <span className="text-gray-500">Reviews:</span> <span className="font-medium">{numReviews}</span>
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-gray-300">
                        <FaStar className="text-primary text-lg" />
                        <span className="text-sm">
                          <span className="text-gray-500">Rating:</span> <span className="font-medium">{Math.round(rating)}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <FaShoppingCart className="text-primary text-lg" />
                        <span className="text-sm">
                          <span className="text-gray-500">Quantity:</span> <span className="font-medium">{quantity}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <FaBox className="text-primary text-lg" />
                        <span className="text-sm">
                          <span className="text-gray-500">In Stock:</span> <span className="font-medium">{countInStock}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
