// DashboardLayout.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import InputField from '../addProduct/InputField';
import SelectField from '../addProduct/SelectField';
import LocationPicker from '../LocationPicker';

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [eventImage, setEventImage] = useState(null);
  const [eventFile, setEventFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type });
    }, 3000);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title ?? '');
    formData.append('organizerName', data.organizerName ?? '');
    formData.append('description', data.description ?? '');
    formData.append('price', isPaid ? data.price ?? '' : '0');
    formData.append('venue', data.venue ?? '');
    formData.append('category', data.category ?? '');
    formData.append('date', data.date ?? '');
    formData.append('time', data.time ?? '');

    if (selectedLocation) {
      const loc = selectedLocation.name ? selectedLocation.name : `${selectedLocation.lat},${selectedLocation.lng}`;
      formData.append('location', loc);
    } else {
      formData.append('location', '');
    }

    if (eventImage) formData.append('eventImage', eventImage);
    if (eventFile) formData.append('eventFile', eventFile);
    if (profileImage) formData.append('profileImage', profileImage);

    try {
      const res = await axios.post('http://localhost:3000/api/product/create-product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      showToast('Product added successfully!', 'success');
    } catch (err) {
      console.error('Error creating product:', err.response?.data);
      showToast('Failed to add product. Please try again.', 'error');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Event</h2>

      {/* Toast Notification */}
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
          Add Event
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

export default AddProduct;
