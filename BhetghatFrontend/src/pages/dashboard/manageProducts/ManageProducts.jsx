import React, { useState } from 'react';
import { useFetchAllProductsQuery, useDeleteProductMutation } from '../../../redux/features/products/productApi';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { getImgUrl } from '../../../utils/getImgUrl';
import { CalendarDays, MapPin } from 'lucide-react';

const ManageProducts = () => {
  const { data: products, refetch } = useFetchAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: '', type }), 3000);
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(selectedProduct._id).unwrap();
      showToast('Event deleted successfully!', 'success');
      refetch();
      setSelectedProduct(null);
    } catch (error) {
      console.error('Failed to delete product:', error);
      showToast('Failed to delete the event. Please try again.', 'error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto relative py-5">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-5 right-5 px-6 py-3 rounded shadow-lg text-white z-50
          ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {toast.message}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-center">Are you sure you want to delete the event?</h2>

            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg mb-6">
              <img
                src={getImgUrl(selectedProduct.eventImage)}
                alt={selectedProduct.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-semibold">
                  {selectedProduct.category}
                </span>
                <h3 className="font-bold text-gray-800 mt-1">{selectedProduct.title}</h3>
                <div className="text-sm text-gray-600 mt-1 flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4 text-indigo-500" />
                    <span>{selectedProduct.date}, {selectedProduct.time}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={handleDeleteProduct} className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700">
                Yes
              </button>
              <button onClick={() => setSelectedProduct(null)} className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Events</h1>
          <p className="text-gray-500 text-sm">Add, update, or delete your Bhetghat events.</p>
        </div>
        <Link
          to="/dashboard/add-new-product"
          className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold"
        >
          + Add Event
        </Link>
      </div>

      {/* Event Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b text-xl font-bold text-black">Your Events</div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase mx-6">
            <tr>
              <th className="px-6 py-3">Banner</th>
              <th className="px-6 py-3">Event Name</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Venue</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {product?.eventImage ? (
                      <img
                        src={getImgUrl(product.eventImage)}
                        alt={product.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '';
                        }}
                        className="w-16 h-14 object-cover rounded-md border bg-gray-100"
                      />
                    ) : (
                      <div className="w-16 h-14 flex items-center justify-center text-xs text-gray-500 border rounded-md bg-gray-50">
                        IMG
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">{product.title}</td>
                  <td className="px-6 py-4 text-gray-600">{product.date || '-'}</td>
                  <td className="px-6 py-4 text-gray-600">{product.time || '-'}</td>
                  <td className="px-6 py-4 text-gray-600">{product.venue || '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Link to={`/dashboard/edit-product/${product._id}`} className="text-blue-500 hover:text-blue-600">
                        <FiEdit2 className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-400 py-6">No events found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
