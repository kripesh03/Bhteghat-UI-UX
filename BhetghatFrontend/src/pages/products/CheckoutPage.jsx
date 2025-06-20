import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../../redux/orders/ordersApi';

function CheckoutPage() {
  const cartItems = useSelector(state => state.cart.cartItems);
  const [createOrder] = useCreateOrderMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item.new_price && item.new_price.$numberDecimal
      ? parseFloat(item.new_price.$numberDecimal)
      : 0;
    return acc + price;
  }, 0).toFixed(2);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const newOrder = {
      name: data.name,
      email: data.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productIds: cartItems.map((item) => item._id),
      totalPrice: totalPrice
    };

    try {
      await createOrder(newOrder).unwrap();
      alert("Attendance confirmed successfully!");
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert("Error confirming attendance. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl px-10 pt-10 pb-8">
        <h2 className="text-2xl font-bold text-center mb-1">Confirm Your Attendance</h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          Please fill out the form below with accurate information. Once you confirm, a confirmation email will be sent to you.
        </p>

        <div className="bg-blue-50 text-blue-900 border border-blue-200 rounded-lg p-4 text-sm mb-6">
          <ul className="list-disc list-inside space-y-1">
            <li>Ensure your email is correct—you’ll receive a confirmation message shortly after submission.</li>
            <li>We may use your phone number to contact you about updates or event reminders.</li>
            <li>Details like city, country, and ZIP code help us verify regional information.</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">Full Name is required</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              {...register("phone", { required: true })}
              type="text"
              id="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">Phone Number is required</p>}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              {...register("city", { required: true })}
              type="text"
              id="city"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">City is required</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                {...register("state", { required: true })}
                type="text"
                id="state"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.state && <p className="text-red-500 text-xs mt-1">State is required</p>}
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                {...register("country", { required: true })}
                type="text"
                id="country"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.country && <p className="text-red-500 text-xs mt-1">Country is required</p>}
            </div>
          </div>

          <div>
            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
            <input
              {...register("zipcode", { required: true })}
              type="text"
              id="zipcode"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.zipcode && <p className="text-red-500 text-xs mt-1">Zip Code is required</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Confirming...' : 'Confirm Attendance'}
          </button>

          <p className="text-xs text-gray-500 mt-2 text-center">
            By confirming your attendance, you agree to our terms and privacy policy.
          </p>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;
