import React from "react";
import { useNavigate } from "react-router-dom";
import bannerImg from "../../assets/homeimg.png";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-red-100 via-blue-100 to-green-100 py-20 px-6 md:px-24 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Side Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6 leading-snug">
            Discover, Connect & RSVP to <br className="hidden md:block" />
            <span className="text-blue-800">Nepali Events</span>
          </h1>
          <p className="text-gray-700 mb-8 text-base md:text-lg">
            Welcome to bhetghat – Your go-to platform to explore local Nepali
            events and meetups. Find gatherings, workshops, concerts and more.
            RSVP and never miss a moment!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate("/browse")}
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
            >
              Browse Events
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-100 transition"
            >
              Organize Event
            </button>
          </div>
        </div>

        {/* Right Side Image Box */}
        <div className="md:w-1/2 flex justify-center">
          <div className="rounded-3xl h-full w-1/2 border-2 border-white shadow-xl overflow-hidden p-2 bg-white bg-opacity-30 backdrop-blur">
            <img
              src={bannerImg}
              alt="Banner"
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
