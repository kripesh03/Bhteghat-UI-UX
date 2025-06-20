import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import ProductCard from '../products/ProductCard';
import { useFetchAllProductsQuery } from '../../redux/features/products/productApi';

const Recommended = () => {
    const { data: products = [] } = useFetchAllProductsQuery();

    // Sort by newest (createdAt descending)
    const sortedProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="py-12 w-full bg-white">
            <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-0">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#1A237E]">Newest Events</h2>
                    <a href="/browse" className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
                        View All <span>→</span>
                    </a>
                </div>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={24}
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
                        1180: {
                            slidesPerView: 3,
                            spaceBetween: 32,
                        },
                    }}
                    modules={[Navigation]}
                    className="mySwiper px-2"
                >
                    {sortedProducts.length > 0 ? (
                        sortedProducts.map((product, index) => (
                            <SwiperSlide key={index}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))
                    ) : (
                        <p className="text-gray-500">No events found</p>
                    )}
                </Swiper>
            </div>
        </div>
    );
};

export default Recommended;
