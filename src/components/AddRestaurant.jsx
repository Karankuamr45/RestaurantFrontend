import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurant = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rating: '',
    image: null,
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    rating: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Add validation logic here
    if (name === 'rating' && (isNaN(value) || value < 1 || value > 5)) {
      setErrors({
        ...errors,
        [name]: 'Rating must be a number between 1 and 5',
      });
    } else {
      setErrors({
        ...errors,
        [name]: '',
      });
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, rating, image } = formData;

    // Validate form data here
    let formIsValid = true;
    const newErrors = {};

    if (!name) {
      newErrors.name = 'Required field';
      formIsValid = false;
    }

    if (!description) {
      newErrors.description = 'Required field';
      formIsValid = false;
    }

    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
      newErrors.rating = 'Rating must be a number between 1 and 5';
      formIsValid = false;
    }

    if (!image) {
      newErrors.image = 'Required field';
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    const formDataObject = new FormData();
    formDataObject.append('name', name);
    formDataObject.append('description', description);
    formDataObject.append('rating', rating);
    formDataObject.append('image', image);

    try {
      // Send the form data to your backend API using Axios
      const response = await axios.post('https://restaurantbackend-7nng.onrender.com/api/addRestaurant', formDataObject);

      if (response.status === 201) {
        // Handle a successful response, e.g., show a success message
        console.log('Restaurant added successfully:', response.data.message);
        // Reset the form
        setFormData({
          name: '',
          description: '',
          rating: '',
          image: null,
        });
        setErrors({});
      } else {
        // Handle error responses
        console.error('Error:', response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle fetch error
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto my-8 shadow-md p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-md"
    >
      <h1 className="text-center text-4xl font-extrabold text-white py-2 m-4 ">Add Restaurant</h1>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-bold mb-2">
          Restaurant Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className={`text-black p-2 w-full rounded-md outline-none ${
            errors.name ? 'border-red-500' : 'border-gray-400'
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`text-black p-2 w-full outline-none rounded-md ${
            errors.description ? 'border-red-500' : 'border-gray-400'
          }`}
        ></textarea>
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="rating" className="block text-sm font-bold mb-2">
          Rating
        </label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className={`text-black p-2 w-full outline-none rounded-md ${
            errors.rating ? 'border-red-500' : 'border-gray-400'
          }`}
        />
        {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-bold mb-2">
          Restaurant Image
        </label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className={`mb-2 ${
            errors.image ? 'border-red-500' : 'border-gray-400'
          }`}
        />
        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        {formData.image && (
          <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-32 h-32 object-cover mt-2" />
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Add Restaurant
      </button>
    </form>
  );
};

export default AddRestaurant;
