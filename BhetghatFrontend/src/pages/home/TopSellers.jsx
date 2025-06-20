import React, { useState } from "react";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../products/ProductCard";
import { useFetchAllProductsQuery } from "../../redux/features/products/productApi";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const categories = [
  "Choose a Category",
  "Music",
  "Art",
  "Social",
  "Community",
  "Technology",
];

export const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a Category");

  const { data: products = [] } = useFetchAllProductsQuery();

  const filteredProducts =
    selectedCategory === "Choose a Category"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section className="bg-white py-12 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
    s    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A237E]">
            Recommended For You
          </h2>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            name="category"
            id="category"
            className="w-full md:w-auto border border-blue-300 bg-blue-100 text-sm text-blue-800 font-medium px-4 py-2 rounded-md focus:outline-none"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Swiper */}
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 28,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="h-full px-1">
                  <ProductCard product={product} />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-gray-500">No matching products found</p>
          )}
        </Swiper>
      </div>
    </section>
  );
};
