import React, { useState } from "react";
import ProductCard from "../products/ProductCard";
import { useFetchAllProductsQuery } from "../../redux/features/products/productApi";
import { FiFilter } from "react-icons/fi";

const categories = [
  "Music",
  "Art",
  "Food",
  "Workshop",
  "Festival",
  "Networking",
];

const BrowsePage = () => {
  const { data: products = [] } = useFetchAllProductsQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [location, setLocation] = useState("");
  const [priceType, setPriceType] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const filteredProducts = products.filter((product) => {
    const matchSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.organizerName &&
        product.organizerName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchDate = selectedDate ? product.date === selectedDate : true;
    const matchLocation = location
      ? product.location?.toLowerCase().includes(location.toLowerCase())
      : true;
    const price = Number(product.price?.$numberDecimal || 0);
    const matchPrice =
      priceType === "free"
        ? price === 0
        : priceType === "paid"
        ? price > 0
        : true;

    return matchSearch && matchCategory && matchDate && matchLocation && matchPrice;
  });

  const sortedProducts = [...filteredProducts];
  if (sortOption === "newest") {
    sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortOption === "oldest") {
    sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedDate("");
    setLocation("");
    setPriceType("");
    setSortOption("newest");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* FILTERS */}
          <aside className="lg:w-1/4 h-1/2 w-full bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-lg">
              <FiFilter />
              Filters
            </div>


            {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input
                  type="text"
                  placeholder="Search by title or organizer"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setSelectedCategory(cat === selectedCategory ? "" : cat)
                    }
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city or venue"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setPriceType(priceType === "paid" ? "" : "paid")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                    priceType === "paid"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  Paid
                </button>
                <button
                  onClick={() => setPriceType(priceType === "free" ? "" : "free")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                    priceType === "free"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  Free
                </button>
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-2">
              <button
                onClick={clearFilters}
                className="w-full bg-red-900 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* PRODUCTS */}
          <section className="lg:w-3/4 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
  <div>
    <h2 className="text-3xl font-extrabold text-gray-900">Upcoming Events</h2>
    <p className="text-lg text-gray-500 pt-2">Browse events happening around you in Nepal.</p>
  </div>
  <div className="mt-4 md:mt-0">
    <label className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="border border-gray-300 bg-gray-50 pl-2 pr-8 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
    </select>
  </div>
</div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center">
                  No events found.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
