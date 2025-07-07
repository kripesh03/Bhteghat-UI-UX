import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import InputField from '../addProduct/InputField';
import SelectField from '../addProduct/SelectField';
import LocationPicker from '../LocationPicker';
const AddProduct = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [eventImage, setEventImage] = useState(null);
  const [eventFile, setEventFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);


 const onSubmit = async (data) => {
  const formData = new FormData();
  formData.append('title', data.title ?? '');
  formData.append('organizerName', data.organizerName ?? '');
  formData.append('description', data.description ?? '');
  formData.append('price', data.price ?? '');
  formData.append('venue', data.venue ?? '');
  formData.append('category', data.category ?? '');
  formData.append('date', data.date ?? '');
  formData.append('time', data.time ?? '');

  // Append location only once
  if (selectedLocation) {
    const loc = selectedLocation.name 
      ? selectedLocation.name 
      : `${selectedLocation.lat},${selectedLocation.lng}`;
    formData.append('location', loc);
  } else {
    formData.append('location', '');
  }

  if (eventImage) formData.append('eventImage', eventImage);
  if (eventFile) formData.append('eventFile', eventFile);
  if (profileImage) formData.append('profileImage', profileImage);

  try {
    const response = await axios.post('http://localhost:3000/api/product/create-product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setSuccessMessage('Product added successfully!');
    setErrorMessage('');
  } catch (error) {
    console.error('Error creating product:', error.response?.data);
    setErrorMessage('Failed to add product. Please try again.');
    setSuccessMessage('');
  }
};

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Product</h2>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded-md">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-md">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField label="Title" name="title" type="text" register={register} placeholder="Enter event title" />
        <InputField label="Organizer Name" name="organizerName" type="text" register={register} placeholder="Enter organizer name" />
        <InputField label="Description" name="description" type="textarea" register={register} placeholder="Enter event description" />
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
          ]}
        />
        <InputField label="Price" name="price" type="number" register={register} placeholder="Enter price" />
        <InputField label="Date" name="date" type="date" register={register} />
        <InputField label="Time" name="time" type="time" register={register} />
        <InputField label="Venue" name="venue" type="text" register={register} placeholder="Enter venue" />

<div>
  <label className="block text-sm font-semibold text-gray-700">Select Event Location</label>
  <LocationPicker value={selectedLocation} onChange={setSelectedLocation} />
</div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Event Image</label>
          <input type="file" onChange={(e) => setEventImage(e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Event File</label>
          <input type="file" onChange={(e) => setEventFile(e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Organizer Profile Image</label>
          <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md" />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
