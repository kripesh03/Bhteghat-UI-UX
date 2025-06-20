import React from 'react';
import { useFetchAllProductsQuery, useDeleteProductMutation } from '../../../redux/features/products/productApi';
import { Link, useNavigate } from 'react-router-dom';

const ManageProducts = () => {
    const navigate = useNavigate();
    const { data: products, refetch } = useFetchAllProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();

    const handleDeleteProduct = async (id) => {
        try {
            await deleteProduct(id).unwrap();
            alert("Product deleted successfully!");
            refetch();
        } catch (error) {
            console.error("Failed to delete product:", error);
            alert("Failed to delete product. Please try again.");
        }
    };

    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">All Events</h3>
                            </div>
                        </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                                        Organizer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map((product, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.organizerName || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.category || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            Rs. {product.price?.$numberDecimal ?? '0.00'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                                            <Link
                                                to={`/dashboard/edit-product/${product._id}`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-full text-sm"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteProduct(product._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full text-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {!products?.length && (
                            <p className="text-center py-4 text-sm text-gray-500">No products found.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManageProducts;
