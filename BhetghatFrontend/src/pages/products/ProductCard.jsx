import { FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';

const ProductCard = ({ product }) => {
  const price = Number(product.price?.$numberDecimal || 0);
  const time = product.time || 'N/A';
  const venue = product.venue || 'N/A';
  const category = product.category || 'Event';

  const eventDate = new Date(product.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  }); // Example: "June 10"

  return (
    <Link
      to={`/products/${product._id}`}
      className="block max-w-sm mx-auto"
      aria-label={`View details for ${product.title}`}
    >
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border transition hover:shadow-xl cursor-pointer">
        {/* Event Image */}
        <div className="relative h-52">
          <img
            src={getImgUrl(product.eventImage)}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          {/* Category */}
          <span className="absolute top-2 left-2 bg-purple-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
          {/* Date Badge */}
          <span className="absolute top-2 right-2 bg-green-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
            {formattedDate}
          </span>
        </div>

        {/* Event Info */}
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-bold">{product.title}</h3>

          <p className="text-sm text-gray-500">{venue}</p>

          {/* Time & Price Info */}
          <div className="flex items-center text-sm text-gray-600 gap-3 mt-1">
            <FaCalendarAlt className="text-indigo-600" />
            <span>{time}</span>
            <span className="flex items-center gap-1">
              <FaMoneyBillWave className="text-green-600" />
              {price === 0 ? 'Free' : 'Paid'}
            </span>
          </div>

          {/* ✅ Attend Button */}
          <div className="pt-3">
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition"
            >
              Attend
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
