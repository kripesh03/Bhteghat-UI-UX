import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';
import { clearCart, removeFromCart } from '../../redux/features/cart/cartSlice';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const parsePrice = (price) => {
    if (price && typeof price === 'object' && price.$numberDecimal) {
      return parseFloat(price.$numberDecimal);
    }
    return parseFloat(price) || 0;
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const newPrice = parsePrice(item.price);
    return acc + newPrice;
  }, 0).toFixed(2);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const token = localStorage.getItem('token');

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("You haven't selected any events yet!");
    } else if (!token) {
      alert("Please log in to confirm your attendance.");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="flex justify-center items-start bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Selected Events</h2>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
            >
              Clear All Events
            </button>
          )}
        </div>

        {cartItems.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {cartItems.map((event) => (
              <li key={event?._id} className="flex flex-col sm:flex-row gap-4 py-6">
                <div className="h-32 w-full sm:w-32 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                  <img
                    src={getImgUrl(event?.eventImage)}
                    alt={event?.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900">
                        <Link to={`/products/${event?._id}`}>{event?.title}</Link>
                      </h3>
                      <p className="text-indigo-600 font-medium text-right">Rs. {parsePrice(event?.price).toFixed(2)}</p>
                    </div>
                    <div className="mt-1 text-sm text-gray-600 space-y-1">
                      <p><strong>Category:</strong> {event?.category}</p>
                      <p><strong>Date:</strong> {event?.date}</p>
                      <p><strong>Time:</strong> {event?.time}</p>
                      <p><strong>Location:</strong> {event?.location}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      onClick={() => handleRemoveFromCart(event)}
                      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Cancel Attendance
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 text-sm">You haven't selected any events yet.</p>
        )}

        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex justify-between text-lg font-semibold text-gray-900">
            <p>Total Price</p>
            <p>Rs. {totalPrice}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">Note: Some events may include service fees.</p>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Confirm Attendance
          </button>

          <div className="mt-4 text-center text-sm text-gray-500">
            or{' '}
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Continue Browsing Events →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
