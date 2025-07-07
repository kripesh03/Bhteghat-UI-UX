// UpdateProduct.jsx
import React, { useEffect, useState } from 'react';
import InputField from '../addProduct/InputField';
import SelectField from '../addProduct/SelectField';
import LocationPicker from '../LocationPicker';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productApi';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const { data: productData, refetch } = useFetchProductByIdQuery(id);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
const navigate = useNavigate();

  const [eventImage, setEventImage] = useState(null);
  const [eventFile, setEventFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type });
    }, 3000);
  };

  useEffect(() => {
    if (productData) {
      setValue('title', productData.title ?? '');
      setValue('organizerName', productData.organizerName ?? '');
      setValue('description', productData.description ?? '');
      setValue('category', productData.category ?? '');
      setValue('price', productData.price?.$numberDecimal ?? '');
      setValue('date', productData.date ?? '');
      setValue('time', productData.time ?? '');
      setValue('venue', productData.venue ?? '');
      setValue('location', productData.location ?? '');
      setSelectedLocation({ name: productData.location });
      setIsPaid(productData.price && parseFloat(productData.price?.$numberDecimal) > 0);
    }
  }, [productData, setValue]);

  const onSubmit = async (data) => {
  const formData = new FormData();
  formData.append('title', data.title ?? '');
  formData.append('organizerName', data.organizerName ?? '');
  formData.append('description', data.description ?? '');
  formData.append('category', data.category ?? '');
  formData.append('price', isPaid ? data.price ?? '' : '0');
  formData.append('date', data.date ?? '');
  formData.append('time', data.time ?? '');
  formData.append('venue', data.venue ?? '');

  const loc = selectedLocation?.name ?? `${selectedLocation?.lat},${selectedLocation?.lng}` ?? '';
  formData.append('location', loc);

  if (eventImage) formData.append('eventImage', eventImage);
  if (eventFile) formData.append('eventFile', eventFile);
  if (profileImage) formData.append('profileImage', profileImage);

  const token = localStorage.getItem('token');
  if (!token) {
    showToast('Unauthorized. Please log in again.', 'error');
    return;
  }

  try {
    await axios.put(`${getBaseUrl()}/api/product/edit/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    });
    showToast('Product updated successfully!', 'success');
setTimeout(() => {
  navigate('/dashboard/manage-product');
  window.location.reload(); // forces a refresh of the page
}, 1500);

    await refetch();
  } catch (error) {
    console.error('Error updating product:', error.response?.data || error.message);
    showToast(error.response?.data?.message || 'Failed to update product. Please try again.', 'error');
  }
};

  return (
    <div className="bg-white p-8 rounded-lg shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Event</h2>

      {toast.show && (
        <div className={`fixed top-5 right-5 px-6 py-3 rounded shadow-lg text-white z-50
          ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Event Title" name="title" type="text" register={register} placeholder="Eg: Kathmandu Tech Meetup" />
          <InputField label="Date" name="date" type="date" register={register} />

          <InputField label="Location" name="venue" type="text" register={register} placeholder="Eg: Nepal Academy, Kamaladi" />
          <InputField label="Time" name="time" type="time" register={register} />
          <InputField label="Organizer Name" name="organizerName" type="text" register={register} placeholder="Eg: Bhetghat Organizer" />
        </div>

        <InputField label="Description" name="description" type="textarea" register={register} placeholder="Short details about the event" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label="Category"
            name="category"
            register={register}
            options={[
              { value: '', label: 'Select Category' },
              { value: 'Music', label: 'Music' },
              { value: 'Art', label: 'Art' },
              { value: 'Social', label: 'Social' },
              { value: 'Community', label: 'Community' },
              { value: 'Technology', label: 'Technology' },
              { value: 'Networking', label: 'Networking' },
            ]}
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Event Type</label>
            <select
              onChange={(e) => setIsPaid(e.target.value === 'paid')}
              value={isPaid ? 'paid' : 'free'}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>

        {isPaid && (
          <InputField label="Price" name="price" type="number" register={register} placeholder="Enter price" />
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Event Location</label>
          <LocationPicker value={selectedLocation} onChange={setSelectedLocation} />
        </div>

        <UploadField label="Cover Image" onChange={setEventImage} />
        <UploadField label="Event File" onChange={setEventFile} />
        <UploadField label="Organizer Profile Image" onChange={setProfileImage} />

        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold">
          Update Event
        </button>
      </form>
    </div>
  );
};

const UploadField = ({ label, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="file"
      onChange={(e) => onChange(e.target.files[0])}
      className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md"
    />
  </div>
);

export default UpdateProduct;
