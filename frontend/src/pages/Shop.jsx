import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { FaFilter, FaTimes, FaRedo } from "react-icons/fa";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const removeFilter = (id) => {
    const updatedChecked = checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const getCategoryName = (id) => {
    return categories?.find((c) => c._id === id)?.name || "";
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  const resetFilters = () => {
    dispatch(setChecked([]));
    setPriceFilter("");
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar - Sticky */}
        <aside className="w-full md:w-72 flex-shrink-0">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#1f1f1f] border border-[#333] rounded-2xl shadow-premium sticky top-24">
            {/* Filter Header */}
            <div className="p-6 border-b border-[#333]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaFilter className="text-primary" />
                  Filters
                </h2>
                {(checked.length > 0 || priceFilter) && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <FaRedo className="text-xs" />
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters */}
            {checked.length > 0 && (
              <div className="p-6 border-b border-[#333]">
                <p className="text-xs text-gray-400 mb-3">Active Filters:</p>
                <div className="flex flex-wrap gap-2">
                  {checked.map((filterId) => (
                    <span
                      key={filterId}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30"
                    >
                      {getCategoryName(filterId)}
                      <FaTimes
                        className="ml-2 cursor-pointer hover:text-white transition-colors"
                        onClick={() => removeFilter(filterId)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Category Filters */}
            <div className="p-6 border-b border-[#333]">
              <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
                Categories
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
                {categories?.map((c) => (
                  <label
                    key={c._id}
                    className="flex items-center cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      id={`category-${c._id}`}
                      checked={checked.includes(c._id)}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary focus:ring-2 cursor-pointer"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-300 group-hover:text-primary transition-colors">
                      {c.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filters */}
            <div className="p-6 border-b border-[#333]">
              <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
                Brands
              </h3>
              <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-hide">
                {uniqueBrands?.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center cursor-pointer group"
                  >
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-primary bg-gray-700 border-gray-600 focus:ring-primary focus:ring-2 cursor-pointer"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-300 group-hover:text-primary transition-colors">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
                Price
              </h3>
              <input
                type="text"
                placeholder="Enter max price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-4 py-3 bg-[#0f0f10] border border-[#333] rounded-lg text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {/* Products Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">
                {products?.length}{" "}
                <span className="text-gray-400 font-normal">
                  {products?.length === 1 ? "Product" : "Products"}
                </span>
              </h1>
              {/* Future: Add sorting dropdown here */}
            </div>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-32 h-32 bg-[#2a2a2a] rounded-full flex items-center justify-center mb-6">
                <FaFilter className="text-6xl text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No products found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your filters
              </p>
              <button onClick={resetFilters} className="btn-primary">
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products?.map((p) => (
                <ProductCard key={p._id} p={p} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
