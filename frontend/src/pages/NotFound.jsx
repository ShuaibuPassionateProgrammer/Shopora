import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f0f10] to-[#1a1a1a]">
            <div className="max-w-2xl w-full text-center">
                {/* 404 Illustration */}
                <div className="mb-8">
                    <h1 className="text-[150px] md:text-[200px] font-bold bg-gradient-to-r from-primary via-primary-600 to-primary bg-clip-text text-transparent leading-none animate-pulse">
                        404
                    </h1>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-400 text-lg mb-2">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <p className="text-gray-500">
                        Don't worry, it happens to the best of us!
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/"
                        className="btn-primary px-8 py-4 flex items-center gap-3 text-lg"
                    >
                        <FaHome />
                        <span>Back to Home</span>
                    </Link>

                    <Link
                        to="/shop"
                        className="px-8 py-4 bg-[#2a2a2a] hover:bg-[#333] border border-[#444] text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-3 text-lg"
                    >
                        <FaSearch />
                        <span>Browse Shop</span>
                    </Link>
                </div>

                {/* Helpful Links */}
                <div className="mt-12 pt-8 border-t border-[#333]">
                    <p className="text-gray-400 mb-4">You might be looking for:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/shop"
                            className="text-primary hover:text-primary-600 transition-colors"
                        >
                            Shop
                        </Link>
                        <span className="text-gray-600">•</span>
                        <Link
                            to="/favorite"
                            className="text-primary hover:text-primary-600 transition-colors"
                        >
                            Favorites
                        </Link>
                        <span className="text-gray-600">•</span>
                        <Link
                            to="/cart"
                            className="text-primary hover:text-primary-600 transition-colors"
                        >
                            Cart
                        </Link>
                        <span className="text-gray-600">•</span>
                        <Link
                            to="/profile"
                            className="text-primary hover:text-primary-600 transition-colors"
                        >
                            Profile
                        </Link>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            </div>
        </div>
    );
};

export default NotFound;
