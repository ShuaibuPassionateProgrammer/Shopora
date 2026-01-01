import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product.tsx";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError?.error || "An error occurred"}
        </Message>
      ) : (
        <>
          {/* Hero Section */}
          <div className="container mx-auto px-4 lg:px-8 mt-16 lg:mt-24">
            <div className="hero-section">
              <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-6">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold heading-premium mb-4">
                    <span className="text-gradient">Special</span> Products
                  </h1>
                  <p className="text-gray-400 text-lg max-w-2xl">
                    Discover our curated collection of premium products, handpicked just for you
                  </p>
                </div>

                <Link
                  to="/shop"
                  className="btn-primary rounded-full py-3 px-12 text-lg font-semibold shadow-glow hover:shadow-glow-lg whitespace-nowrap"
                >
                  Explore Shop →
                </Link>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {data.products.map((product, index) => (
                <div key={product._id} className="stagger-item w-full max-w-md">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
