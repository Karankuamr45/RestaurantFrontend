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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8 shadow-md p-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-md
    ">
<h1 className="text-center text-4xl font-extrabold text-white py-2 m-4 ">
  Add Restaurant
</h1>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-bold mb-2">
          Restaurant Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder='name'
          className=" text-black p-2 w-full rounded-md outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block  text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="text-black p-2 w-full outline-none rounded-md"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="rating" className="block  text-sm font-bold mb-2">
          Rating
        </label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="text-black p-2 w-full outline-none rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block  text-sm font-bold mb-2">
          Restaurant Image
        </label>
        <input type="file" name="image" onChange={handleImageChange} className="mb-2" />
        {formData.image && (
          <img src={URL.createObjectURL(formData.image)} alt="Preview" className="w-32 h-32 object-cover mb-2" />
        )}
      </div>
      <button type="submit" className="bg-blue-500 text-white
 p-2 rounded w-full">
        Add Restaurant
      </button>
    </form>
  );
};

export default AddRestaurant;
