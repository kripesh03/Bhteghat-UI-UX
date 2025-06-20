import React from "react";
import { FaCalendarCheck, FaCheckDouble, FaBullhorn } from "react-icons/fa";

const MidSection = () => {
  return (
    <section className="w-full bg-white">
      {/* Host Your Event Section */}
      <div className="w-full mx-auto px-4 py-24 bg-gradient-to-r from-yellow-50 via-blue-100 to-red-100 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1A237E] mb-4">
          Host your event with <span className="text-blue-600">Bhetghat</span>
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          Are you an organizer? Easily list your event, manage RSVPs, and connect with an enthusiastic Nepali audience. Let us handle the tech, you focus on the fun!
        </p>
        <button className="bg-blue-600 text-white px-5 py-3 rounded-md text-sm font-semibold hover:bg-blue-700 transition">
          List Your Event
        </button>
      </div>

      {/* Featured Organizers */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl text-blue-600 font-bold text-[#1A237E] mb-6">Featured Organizers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md border p-4 flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src={`https://randomuser.me/api/portraits/${idx % 2 === 0 ? "women" : "men"}/${idx + 10}.jpg`}
                    alt="Organizer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="bg-gray rounded mb-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. A .?</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl text-blue-600 font-bold text-[#1A237E] mb-10">How Bhetghat Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white shadow-md border p-6 rounded-lg">
              <FaCalendarCheck className="text-blue-600 text-2xl mb-3" />
              <h4 className="text-md font-semibold mb-2">Discover Events</h4>
              <p className="text-gray-600 text-sm">
                Browse a wide range of Nepali events—festivals, workshops, concerts, and more!
              </p>
            </div>
            <div className="bg-white shadow-md border p-6 rounded-lg">
              <FaCheckDouble className="text-blue-600 text-2xl mb-3" />
              <h4 className="text-md font-semibold mb-2">RSVP Easily</h4>
              <p className="text-gray-600 text-sm">
                Reserve your spot in seconds and stay updated with event reminders.
              </p>
            </div>
            <div className="bg-white shadow-md border p-6 rounded-lg">
              <FaBullhorn className="text-blue-600 text-2xl mb-3" />
              <h4 className="text-md font-semibold mb-2">Organize Your Event</h4>
              <p className="text-gray-600 text-sm">
                List your event, manage RSVPs, and connect with the Nepali community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MidSection;
