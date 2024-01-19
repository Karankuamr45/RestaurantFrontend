import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurant = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rating: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

    // Validate form data here if needed

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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Restaurant Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border-2 border-gray-400 p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border-2 border-gray-400 p-2 w-full"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">
          Rating
        </label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="border-2 border-gray-400 p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
          Restaurant Image
        </label>
        <input type="file" name="image" onChange={handleImageChange} className="mb-2" />
        {formData.image && (
          <img src={URL.createObjectURL(formData.image)} alt="Preview" className="max-w-full h-auto mb-2" />
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Restaurant
      </button>
    </form>
  );
};

export default AddRestaurant;
