import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useFetchProductByIdQuery } from "../../redux/features/products/productApi";
import { getImgUrl } from "../../utils/getImgUrl";
import { CalendarDays, MapPin } from "lucide-react";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useFetchProductByIdQuery(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmAttend = () => {
    dispatch(addToCart(product));
    setShowConfirmation(false);
    navigate("/your-events");
  };

  if (isLoading) return <div className="text-center p-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center p-10 text-red-600">Something went wrong.</div>
    );
  if (!product)
    return <div className="text-center p-10">No product found.</div>;

  const price = Number(product.price?.$numberDecimal || 0);

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-2xl rounded-2xl overflow-hidden p-6 flex flex-col md:flex-row gap-6">
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center shadow-2xl">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
              Are you sure you want to attend the event?
            </h2>

            <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-xl mb-6 shadow-sm">
              <img
                src={getImgUrl(product.eventImage)}
                alt={product.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="text-left flex-1">
                <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                  {product.category}
                </span>
                <h3 className="font-bold text-base mt-1 text-gray-800">
                  {product.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mt-1 gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-indigo-500" />
                    <span>
                      {product.date}, {product.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    <span>{product.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={handleConfirmAttend}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </div>

            <p
              onClick={() => navigate("/browse")}
              className="text-sm text-indigo-600 hover:underline cursor-pointer"
            >
              ← Browse More Events
            </p>
          </div>
        </div>
      )}

      {/* Left Section */}
      <div className="md:w-2/3">
        <img
          src={getImgUrl(product.eventImage)}
          alt={product.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />

        <div className="mb-2">
          <span className="text-sm px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
            {product.category}
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <CalendarDays className="w-5 h-5 text-indigo-600" />
          <span className="text-sm">
            {product.date || "N/A"} • {product.time || "N/A"}
          </span>
        </div>

        <div className="flex gap-2 mb-4">
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              price === 0
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {price === 0 ? "Free Entry" : `Rs. ${price.toFixed(2)}`}
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
            Outdoor
          </span>
        </div>

        <p className="text-gray-700 mb-4">
          {product.description || "No description provided."}
        </p>
      </div>

      {/* Right Section: RSVP Card */}
      <div className="md:w-1/3 flex flex-col gap-6">
        <div className="bg-gray-50 rounded-xl p-6 shadow-md">
          <p className="text-xl font-semibold mb-2">RSVP for this Event</p>
          <button
            onClick={() => setShowConfirmation(true)}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Attend Now
          </button>
          <p className="text-sm text-gray-500 mt-2">
            You'll receive a confirmation email after RSVP.
          </p>
        </div>

        {/* Organizer & Location Section */}
        <div className="bg-white rounded-xl p-6 mt-48">
          <p className="text-2xl text-black font-bold">Hosted by:</p>
          <div className="flex items-center gap-3 mt-2">
            <img
              src={getImgUrl(product.profileImage)}
              alt="host"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{product.organizerName || "Admin"}</p>
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                Organizer
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 text-gray-700">
            <MapPin className="w-5 h-5 text-indigo-600 mt-0.5" />
            <span>{product.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
