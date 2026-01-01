import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct.tsx";
import ProductCarousel from "../pages/Products/ProductCarousel.tsx";
import { Product } from "../types/api";

const Header: React.FC = () => {
    const { data, isLoading, error } = useGetTopProductsQuery();

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <h1>ERROR</h1>;
    }

    return (
        <>
            <div className="container mx-auto px-4 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row justify-around items-start gap-8">
                    {/* Small Products Grid - Hidden on smaller screens */}
                    <div className="hidden xl:block w-full lg:w-auto">
                        <div className="grid grid-cols-2 gap-6">
                            {data?.map((product: Product) => (
                                <div key={product._id}>
                                    <SmallProduct product={product} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Carousel */}
                    <div className="w-full lg:w-auto">
                        <ProductCarousel />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
